# Compendium Sync Instructions

After editing any compendium files, run this command to push changes to the live website (Supabase → Training Platform).

## Command

From the repo root:

```bash
node website/fourflowos-web/scripts/sync-compendium.js
```

Or from the website directory:

```bash
cd website/fourflowos-web
node scripts/sync-compendium.js
```

## What it does

- Reads all Quality, Technique, and Concept `.md` files from `compendium/framework/`
- Parses frontmatter (title, definition, tags, keywords) and body
- Upserts all rows to the Supabase `mechanics` table (keyed on file slug)
- Prunes any DB rows whose files no longer exist
- Reports enrichment score distribution

## Requirements

- `website/fourflowos-web/.env.local` must have `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`
- Run `npm install` in `website/fourflowos-web/` at least once (needs `js-yaml` and `@supabase/supabase-js`)

## What triggers a sync

Run sync after any of:
- Editing a Quality file (`compendium/framework/[PILLAR]/[State]/*.md`)
- Adding or editing a Technique (`_techniques/*.md`)
- Adding or editing a Concept (`_concepts/*.md`)
- Renaming or deleting any compendium file

## What does NOT need a sync

- Edits to `COMPENDIUM_INDEX.md`, `foundations/`, or overview files — these are not read by the script
- Changes to `_source/` captures — raw source files are not synced

## After syncing

Changes are live in the Training Platform at `fourflowos.com/train` immediately — no deploy needed. The Training Platform reads directly from Supabase.
