'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressCard from '@/components/ProgressCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Plus, BookOpen, Share2 } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  // Sample data
  const roadmapData = {
    id: '1',
    targetCompany: 'Google',
    totalDays: 30,
    daysElapsed: 12,
    daysRemaining: 18,
    nodes: [
      { id: '1', title: 'Arrays & Strings', topic: 'fundamentals', difficulty: 'easy' as const, daysToPrepare: 5, resources: ['LeetCode'], completed: false },
      { id: '2', title: 'Trees & Graphs', topic: 'data-structures', difficulty: 'hard' as const, daysToPrepare: 7, resources: ['Premium'], completed: false },
      { id: '3', title: 'DP Solutions', topic: 'algorithms', difficulty: 'hard' as const, daysToPrepare: 8, resources: ['Striver'], completed: false },
    ],
  };

  const chartData = [
    { topic: 'Arrays', completed: 80 },
    { topic: 'Trees', completed: 45 },
    { topic: 'DP', completed: 20 },
    { topic: 'Graphs', completed: 30 },
  ];

  const progressPercentage = (roadmapData.daysElapsed / roadmapData.totalDays) * 100;

  const toggleNode = (nodeId: string) => {
    setCompletedTopics((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-400">You're on track for {roadmapData.targetCompany}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Days', value: roadmapData.totalDays },
          { label: 'Days Completed', value: roadmapData.daysElapsed },
          { label: 'Days Remaining', value: roadmapData.daysRemaining },
          { label: 'Progress', value: `${progressPercentage.toFixed(0)}%` },
        ].map((stat, i) => (
          <div key={i} className="card">
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-blue-500">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="card mb-12">
        <p className="text-sm font-semibold mb-3">Overall Progress</p>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{progressPercentage.toFixed(0)}% Complete</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Progress Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Your Learning Path</h2>
          <div className="space-y-4">
            {roadmapData.nodes.map((node) => (
              <ProgressCard
                key={node.id}
                node={node as any}
                isCompleted={completedTopics.includes(node.id)}
                onToggle={() => toggleNode(node.id)}
              />
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="card">
          <h3 className="text-lg font-bold mb-6">Topic Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="topic" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="completed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => router.push('/generate')}
          className="card text-left hover:border-blue-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Generate New Roadmap</h3>
            <Plus className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-sm text-gray-400">Create another personalized roadmap</p>
        </button>

        <button
          onClick={() => router.push('/roadmap')}
          className="card text-left hover:border-blue-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">View Current Roadmap</h3>
            <BookOpen className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-sm text-gray-400">See your full learning path</p>
        </button>

        <button
          onClick={() => alert('Share feature coming soon!')}
          className="card text-left hover:border-blue-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Share Progress</h3>
            <Share2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-sm text-gray-400">Share your progress with peers</p>
        </button>
      </div>
    </div>
  );
}
