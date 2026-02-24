# Agent Data Infrastructure — Implementation Plan

**Created**: February 2026
**Status**: Planning → in progress

---

## The Vision

Make FlowHabits and FlowZone Web two-way infrastructure for the FourFlow Agent. Apps write behavioral data to Supabase. The `/align` agent reads that data, updates the Flow Profile, and eventually writes recommendations back. The agent goes from knowing what you *say* to knowing what you *do*.

---

## Architecture

```
FlowHabits (iOS)        FlowZone Web (React)
      |                        |
  SwiftData               IndexedDB
      |                        |
  Supabase Swift SDK    Supabase JS SDK
      |                        |
      └────────┬───────────────┘
               ↓
         Supabase (existing instance)
         ├── habit_completions
         ├── focus_sessions
         └── agent_recommendations (Phase 2)
               ↓
         /align reads via REST API
               ↓
         Flow Profile updated with behavioral observations
               ↓ (Phase 2)
         agent_recommendations written back
         ↑ Apps read and surface them
```

**Existing Supabase instance**: already live for Flow Profile system (`assessments`, `prompt_templates`, `profile_generations` tables). New tables slot into the same instance.

---

## Supabase Schema

```sql
-- User auth handled by Supabase Auth (existing)

-- Habit completions (FlowHabits)
create table habit_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  habit_name text not null,
  pillar text not null check (pillar in ('SELF', 'SPACE', 'STORY', 'SPIRIT')),
  completed_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Focus sessions (FlowZone Web)
create table focus_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  duration_minutes integer not null,
  focus_reps integer default 0,
  completed boolean default false,
  started_at timestamptz not null,
  ended_at timestamptz,
  created_at timestamptz default now()
);

-- Agent recommendations (Phase 2)
create table agent_recommendations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  recommendation_text text not null,
  flow_key text,  -- which Flow Key this addresses
  pillar text check (pillar in ('SELF', 'SPACE', 'STORY', 'SPIRIT')),
  status text default 'active' check (status in ('active', 'dismissed', 'completed')),
  created_at timestamptz default now(),
  expires_at timestamptz
);

-- RLS: users can only read/write their own data
alter table habit_completions enable row level security;
alter table focus_sessions enable row level security;
alter table agent_recommendations enable row level security;

create policy "Users own their habit data" on habit_completions
  for all using (auth.uid() = user_id);

create policy "Users own their session data" on focus_sessions
  for all using (auth.uid() = user_id);

create policy "Users own their recommendations" on agent_recommendations
  for all using (auth.uid() = user_id);
```

**Note for agent reads**: `/align` uses the service key (already in env as `SUPABASE_SERVICE_KEY`) to read user data, bypassing RLS. The agent always reads for the owner's user_id.

---

## Phase 1 — Foundation (do once, before any app work)

- [ ] Run schema SQL above in Supabase dashboard
- [ ] Confirm `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are accessible in the Claude Code environment (check `.env` or shell profile)
- [ ] Create a test user in Supabase Auth dashboard (your personal account)
- [ ] Note your `user_id` UUID — needed for both app and agent wiring

---

## Phase 2 — FlowHabits → Supabase

### iOS setup
- [ ] Add `supabase-swift` package to FlowHabits Xcode project (Swift Package Manager)
  - URL: `https://github.com/supabase/supabase-swift`
- [ ] Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to app config (Info.plist or `Config.xcconfig`)
- [ ] Initialize Supabase client in app startup

### Authentication
- [ ] Add Sign in with Apple capability in Xcode (Signing & Capabilities)
- [ ] Implement Apple Sign In flow using Supabase Auth
- [ ] Store session token in Keychain
- [ ] Add sign-in screen (minimal — just the Apple button + skip/use-without-account option)

### Data sync
- [ ] On each habit completion (tap-to-complete), write a row to `habit_completions`
  - Fields: `user_id`, `habit_name`, `pillar`, `completed_at`
- [ ] Handle offline gracefully — queue writes locally, sync on next launch
- [ ] Add a "Sync to Agent" indicator (subtle — a small status in settings)

### Test
- [ ] Complete a habit → confirm row appears in Supabase dashboard
- [ ] Complete habits across all 4 pillars → confirm pillar values are correct

---

## Phase 3 — `/align` reads FlowHabits data

- [ ] Update `/align` SKILL.md to include habit data reading logic
- [ ] Query: `habit_completions` for owner's `user_id`, last 30 days, grouped by pillar
- [ ] Calculate per-pillar completion rate + active habits per pillar
- [ ] Feed into pillar assessment as behavioral evidence (not raw stats — observations)
  - Example: "SELF habits: 80% completion. Body is being honored consistently."
  - Example: "STORY habits: 30% completion. Intention-execution gap showing."
- [ ] Update Flow Profile with behavioral pattern notes
- [ ] Test: run `/align`, confirm it reads and interprets habit data correctly

---

## Phase 4 — FlowZone Web → Supabase

### Setup
- [ ] Add `@supabase/supabase-js` to `apps/flowzone-web/` (`npm install @supabase/supabase-js`)
- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`
- [ ] Initialize Supabase client in `src/lib/supabase.js`

### Authentication
- [ ] Add email/magic link auth (simplest for web — no password to remember)
- [ ] Auth state in Zustand store alongside existing state
- [ ] Minimal auth UI: email input + "Send magic link" → session auto-restores on return

### Data sync
- [ ] On session end, write a row to `focus_sessions`
  - Fields: `user_id`, `duration_minutes`, `focus_reps`, `completed`, `started_at`, `ended_at`
- [ ] Update `src/lib/db.js` — write to both IndexedDB (local) and Supabase (cloud) when authenticated
- [ ] Unauthenticated users: IndexedDB only (existing behavior, no regression)

### Test
- [ ] Complete a focus session → confirm row in Supabase
- [ ] Log reps during session → confirm `focus_reps` count is correct

---

## Phase 5 — `/align` reads session data

- [ ] Query: `focus_sessions` for owner's `user_id`, last 30 days
- [ ] Derive: sessions per week, avg reps/session, avg duration, morning vs. evening pattern
- [ ] Map to SPACE (Intentional Space, Feedback Systems) and SELF (Focused Body) observations
- [ ] Update Flow Profile with session pattern notes
- [ ] Test: run `/align` after several sessions, confirm pattern inference is working

---

## Phase 6 — Agent recommendations loop (bidirectional)

This is where "one-way" becomes truly two-way.

- [ ] Design recommendation schema — which fields does the agent write?
- [ ] Update `/align` to write recommended habits/actions to `agent_recommendations` table
- [ ] **FlowHabits**: on app open, check for new agent recommendations → surface as "Agent suggested" habit prompt
- [ ] **FlowZone Web**: surface agent session insights in post-session view
- [ ] Test the full loop: run `/align` → see recommendation → act on it in app → agent notices at next check-in

---

## Naming Conventions

To keep everything consistent across the stack:

| Layer | Name | Notes |
|-------|------|-------|
| App (iOS) | FlowHabits | Bundle ID: `app.fourflowos.FlowHabits` |
| App (Web) | FlowZone | Live at `fourflowos.com/tools/flowzone` |
| App (iOS, deprioritized) | FlowRep | Bundle ID: `app.fourflowos.FlowRep` |
| Supabase table | `habit_completions` | FlowHabits → Supabase |
| Supabase table | `focus_sessions` | FlowZone Web → Supabase |
| Supabase table | `agent_recommendations` | Agent → Apps |
| Agent skill | `/align` | Reads all tables, writes Flow Profile + recommendations |
| Pillars in data | `SELF`, `SPACE`, `STORY`, `SPIRIT` | Uppercase, exact match across iOS + web + DB |
| Flow Keys | internal agent vocabulary | Never surfaced in app UI |

---

## What the Agent Gains

After Phase 5 is complete, `/align` can observe:

- **SELF / Focused Body**: Focus Reps trend, session completion rate
- **SELF / Tuned Emotions**: Habit completion drop = stress signal
- **SPACE / Intentional Space**: Session frequency, time-of-day consistency
- **SPACE / Feedback Systems**: Whether the data loop itself is being used
- **STORY / Clear Mission**: STORY habit completion vs. SPIRIT habit completion — are the temporal and timeless directions aligned in behavior?
- **Any pillar**: Sudden drops in previously strong areas = something shifted

This is the foundation of the longitudinal model. It compounds with time.
