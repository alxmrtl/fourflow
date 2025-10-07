import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-800">About FlowSpace</h1>
        <p className="text-gray-600">Flow-inducing productivity framework</p>
      </div>

      {/* What is FlowSpace */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">What is FlowSpace?</h2>
        <p className="text-gray-700 leading-relaxed">
          FlowSpace is a productivity app designed to help you build deep focus by tracking your
          struggle and celebrating your endurance. Instead of just tracking time, we track <strong>reps</strong>—every
          time you resist distraction and choose to stay with your work.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Flow state isn't about being comfortable. It's about building the muscle to stay present
          when your mind wants to escape. That's what FlowSpace helps you develop.
        </p>
      </div>

      {/* The Four Pillars */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">The Four Pillars</h2>

        <div className="bg-spirit/10 border-2 border-spirit/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-spirit mb-2">SPIRIT - Know Your Why</h3>
          <p className="text-gray-700 text-sm">
            Define your core values and vision. This is your foundation—the deeper purpose
            that pulls you forward when discipline alone isn't enough.
          </p>
        </div>

        <div className="bg-story/10 border-2 border-story/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-story mb-2">STORY - Set Your Goals</h3>
          <p className="text-gray-700 text-sm">
            Create meaningful goals aligned with your values. Break them into actionable tasks
            that move you from vision to reality.
          </p>
        </div>

        <div className="bg-space/10 border-2 border-space/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-space mb-2">SPACE - Design Your Environment</h3>
          <p className="text-gray-700 text-sm">
            Optimize your focus environment with timer settings, ambient sounds, and breathwork
            practices to prepare your mind and body for deep work.
          </p>
        </div>

        <div className="bg-self/10 border-2 border-self/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-self mb-2">SELF - Manage Your Actions</h3>
          <p className="text-gray-700 text-sm">
            Organize your task backlog, plan what to work on today, and track what you've completed.
            This is where strategy meets execution.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-self text-white flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h4 className="font-semibold text-gray-800">Complete Your Setup</h4>
              <p className="text-sm text-gray-600">Define your values, set goals, and configure your focus environment</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-self text-white flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h4 className="font-semibold text-gray-800">Plan Your Day in FLOW</h4>
              <p className="text-sm text-gray-600">Add quick tasks or pull from your backlog to build today's focus list</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-self text-white flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h4 className="font-semibold text-gray-800">Start a Focus Session</h4>
              <p className="text-sm text-gray-600">Hit START on any task to enter minimalist focus mode with the timer</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-self text-white flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h4 className="font-semibold text-gray-800">Track Your Struggle</h4>
              <p className="text-sm text-gray-600">Press the rep button every time you resist distraction and choose to stay</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-self text-white flex items-center justify-center font-bold text-sm">5</div>
            <div>
              <h4 className="font-semibold text-gray-800">Review Progress in STATS</h4>
              <p className="text-sm text-gray-600">Celebrate your reps, see your trends, and watch your focus muscle grow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding Reps */}
      <div className="bg-gradient-to-br from-self/10 to-self/5 rounded-2xl p-6 space-y-3">
        <h2 className="text-2xl font-semibold text-self">Understanding Reps</h2>
        <p className="text-gray-700 leading-relaxed">
          A <strong>rep</strong> is recorded every time you notice yourself wanting to quit, check your phone,
          or escape—but you choose to stay instead. High reps don't mean you're distracted; they mean
          you're actively building your focus endurance.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Over time, those pulls will come less often. Your endurance will grow. That's the practice.
        </p>
      </div>

      {/* Privacy */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Privacy & Data</h3>
        <p className="text-sm text-gray-600">
          All your data is stored locally on your device using IndexedDB. Nothing is sent to external servers.
          Your values, goals, tasks, and focus sessions belong to you.
        </p>
      </div>

      {/* Credits */}
      <div className="text-center text-sm text-gray-500 space-y-1">
        <p>Built with React, TailwindCSS, and Zustand</p>
        <p>© 2025 FourFlow. All rights reserved.</p>
        <p className="text-xs">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default About;
