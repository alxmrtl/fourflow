import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const SelfReview = () => {
  const { sessions, loadSessions, tasks, goals } = useStore();
  const [todaySessions, setTodaySessions] = useState([]);
  const [weekSessions, setWeekSessions] = useState([]);
  const [stats, setStats] = useState({
    todayCount: 0,
    todayTime: 0,
    todayReps: 0,
    weekCount: 0,
    weekTime: 0,
    weekReps: 0,
    averageReps: 0,
  });

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    if (sessions.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const todayData = sessions.filter(s => s.date === today);
      const weekData = sessions.filter(s => s.date >= weekAgo);

      setTodaySessions(todayData);
      setWeekSessions(weekData);

      const todayReps = todayData.reduce((sum, s) => sum + (s.reps || 0), 0);
      const weekReps = weekData.reduce((sum, s) => sum + (s.reps || 0), 0);

      setStats({
        todayCount: todayData.length,
        todayTime: todayData.reduce((sum, s) => sum + (s.actualDuration || 0), 0),
        todayReps,
        weekCount: weekData.length,
        weekTime: weekData.reduce((sum, s) => sum + (s.actualDuration || 0), 0),
        weekReps,
        averageReps: weekData.length > 0 ? Math.round(weekReps / weekData.length) : 0,
      });
    }
  }, [sessions]);

  const getTaskTitle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    return task?.title || 'Unknown task';
  };

  const getGoalTitle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task?.goalId) {
      const goal = goals.find(g => g.id === task.goalId);
      return goal?.title;
    }
    return null;
  };

  const advancedGoals = [...new Set(
    todaySessions
      .map(s => getGoalTitle(s.taskId))
      .filter(Boolean)
  )];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-self">REVIEW</h1>
        <p className="text-gray-600">Celebrate your progress</p>
      </div>

      {/* Today's Stats */}
      <div className="bg-gradient-to-br from-self/10 to-self/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-self">Today's Focus</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-self">{stats.todayCount}</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-self">{stats.todayTime}</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-self">{stats.todayReps}</div>
            <div className="text-sm text-gray-600">Reps</div>
          </div>
        </div>

        {stats.todayReps > 0 && (
          <p className="text-center text-gray-700 font-medium">
            {stats.todayReps > 10
              ? "Your focus muscle is getting stronger. Every rep is growth."
              : "You showed up and stayed. That's strength."}
          </p>
        )}
      </div>

      {/* Goal Momentum */}
      {advancedGoals.length > 0 && (
        <div className="bg-story/10 rounded-lg p-6 space-y-3">
          <h3 className="text-xl font-semibold text-story">Goal Momentum</h3>
          <p className="text-gray-700">
            {advancedGoals.length === 1 ? (
              <>You advanced <span className="font-semibold">{advancedGoals[0]}</span> today</>
            ) : (
              <>You advanced {advancedGoals.length} goals today: <span className="font-semibold">{advancedGoals.join(', ')}</span></>
            )}
          </p>
        </div>
      )}

      {/* This Week */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">This Week</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.weekCount}</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.weekTime}</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.weekReps}</div>
            <div className="text-sm text-gray-600">Total Reps</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.averageReps}</div>
            <div className="text-sm text-gray-600">Avg/Session</div>
          </div>
        </div>
      </div>

      {/* Rep Trends */}
      {weekSessions.length > 1 && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Rep Trends</h3>

          <div className="space-y-2">
            {weekSessions.slice(-7).map((session, index) => {
              const date = new Date(session.timestamp).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              });

              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-sm text-gray-600 w-24">{date}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                    <div
                      className="bg-self h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.min((session.reps || 0) * 5, 100)}%` }}
                    >
                      <span className="text-xs font-semibold text-white">{session.reps || 0}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 w-20">
                    {session.actualDuration}m
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-600 bg-gray-50 rounded p-3">
            <strong>Remember:</strong> High reps = you stayed despite pulls. Low reps = your endurance is building. Both are wins.
          </p>
        </div>
      )}

      {/* Recent Sessions */}
      {todaySessions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">Today's Sessions</h3>
          {todaySessions.map((session, index) => {
            const goal = getGoalTitle(session.taskId);
            const time = new Date(session.timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit'
            });

            return (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{getTaskTitle(session.taskId)}</h4>
                    {goal && (
                      <p className="text-sm text-story">Building: {goal}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">{time} • {session.actualDuration} minutes</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-self">{session.reps || 0}</div>
                    <div className="text-xs text-gray-500">reps</div>
                    {session.feltFlow && (
                      <div className="text-xs text-green-600 mt-1">✓ Flow</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Streaks & Milestones */}
      <div className="bg-gradient-to-r from-spirit/10 to-self/10 rounded-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Keep Building</h3>
        <p className="text-gray-700">
          Total lifetime reps: <span className="font-bold text-self">{sessions.reduce((sum, s) => sum + (s.reps || 0), 0)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Every time you choose to stay, you're rewiring your brain for focus.
        </p>
      </div>

      {/* Empty State */}
      {stats.todayCount === 0 && (
        <div className="text-center py-12 space-y-4">
          <p className="text-lg text-gray-600">No sessions yet today</p>
          <p className="text-gray-500">Head to PLAN to start your first focus session</p>
        </div>
      )}
    </div>
  );
};

export default SelfReview;
