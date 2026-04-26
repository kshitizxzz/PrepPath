'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw, Trophy, Calendar } from 'lucide-react';

interface DayEntry {
  day: number;
  topics: Array<{
    name: string;
    microTopics: string[];
    difficulty: string;
    problems: number;
  }>;
  isRevisionDay: boolean;
  isMockContest: boolean;
  totalProblems: number;
}

interface DayWiseRoadmapProps {
  dailySchedule: DayEntry[];
  targetCompany: string;
}

export default function DayWiseRoadmap({ dailySchedule, targetCompany }: DayWiseRoadmapProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'hard':
        return 'bg-red-500/20 border-red-500/30 text-red-300';
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/30 text-green-200';
      case 'medium':
        return 'bg-yellow-500/30 text-yellow-200';
      case 'hard':
        return 'bg-red-500/30 text-red-200';
      default:
        return 'bg-blue-500/30 text-blue-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Your {targetCompany} Prep Timeline</h2>
          <p className="text-gray-400">{dailySchedule.length} days of personalized preparation</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-blue-500">{dailySchedule.length}</div>
          <div className="text-sm text-gray-400">Total Days</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600" />

        {/* Day cards */}
        <div className="space-y-6">
          {dailySchedule.map((dayEntry, idx) => (
            <motion.div
              key={dayEntry.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative"
            >
              {/* Circle on timeline */}
              <div className="absolute left-0 top-6 w-16 h-16 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Day</div>
                    <div className="text-lg font-bold text-white">{dayEntry.day}</div>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className={`ml-32 p-6 rounded-lg border transition-all hover:shadow-lg ${getDifficultyColor(dayEntry.topics[0]?.difficulty || 'medium')}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {dayEntry.isRevisionDay ? (
                      <div className="flex items-center gap-2 mb-2">
                        <RotateCcw className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-lg font-bold">Revision Day</h3>
                      </div>
                    ) : dayEntry.isMockContest ? (
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold">Mock Contest</h3>
                      </div>
                    ) : (
                      <h3 className="text-lg font-bold mb-2">{dayEntry.topics[0]?.name}</h3>
                    )}
                  </div>
                  {dayEntry.isRevisionDay && (
                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold">
                      Review
                    </span>
                  )}
                  {dayEntry.isMockContest && (
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
                      Contest
                    </span>
                  )}
                </div>

                {/* Micro-topics */}
                {!dayEntry.isRevisionDay && !dayEntry.isMockContest && dayEntry.topics[0]?.microTopics && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Topics to cover:</p>
                    <div className="flex flex-wrap gap-2">
                      {dayEntry.topics[0].microTopics.map((micro, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-slate-700/50 text-gray-300 text-sm"
                        >
                          {micro}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Revision/Contest details */}
                {(dayEntry.isRevisionDay || dayEntry.isMockContest) && dayEntry.topics[0]?.microTopics && (
                  <div className="mb-4 space-y-2">
                    {dayEntry.topics[0].microTopics.map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-300">
                        • {item}
                      </p>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Problems: </span>
                      <span className="font-semibold text-white">{dayEntry.totalProblems}</span>
                    </div>
                    {dayEntry.topics[0]?.difficulty && (
                      <div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyBadgeColor(dayEntry.topics[0].difficulty)}`}>
                          {dayEntry.topics[0].difficulty.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition">
                    View Details →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid md:grid-cols-3 gap-4">
        <div className="card text-center">
          <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-gray-400 text-sm mb-1">Total Timeline</p>
          <p className="text-2xl font-bold">{dailySchedule.length} Days</p>
        </div>
        <div className="card text-center">
          <RotateCcw className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-gray-400 text-sm mb-1">Revision Days</p>
          <p className="text-2xl font-bold">{Math.floor(dailySchedule.length / 7)}</p>
        </div>
        <div className="card text-center">
          <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-gray-400 text-sm mb-1">Mock Contests</p>
          <p className="text-2xl font-bold">{Math.floor(dailySchedule.length / 15)}</p>
        </div>
      </div>
    </div>
  );
}