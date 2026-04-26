'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RoadmapData } from '@/types';
import RoadmapVisualization from '@/components/RoadmapVisualization';
import ProgressCard from '@/components/ProgressCard';
import DayWiseRoadmap from '@/components/DayWiseRoadmap';
import { Download, Share2, ArrowLeft, Calendar } from 'lucide-react';

interface ExtendedRoadmapData extends RoadmapData {
  dailySchedule?: Array<{
    day: number;
    topics: Array<any>;
    isRevisionDay?: boolean;
    isMockContest?: boolean;
    totalProblems: number;
  }>;
}

export default function RoadmapViewPage() {
  const router = useRouter();
  const [roadmapData, setRoadmapData] = useState<ExtendedRoadmapData | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'timeline' | 'graph' | 'topics'>('timeline');

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('currentRoadmap');
    if (stored) {
      setRoadmapData(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const toggleNodeCompletion = (nodeId: string) => {
    setCompletedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    );
  };

  const downloadPDF = () => {
    alert('PDF download feature coming soon!');
  };

  const shareRoadmap = () => {
    alert('Share feature coming soon!');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-400">Loading roadmap...</p>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-400 mb-6">No roadmap found. Generate one to get started!</p>
        <button
          onClick={() => router.push('/generate')}
          className="btn-primary"
        >
          Generate Roadmap
        </button>
      </div>
    );
  }

  const completionPercentage = (completedNodes.length / roadmapData.nodes.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-blue-500 hover:text-blue-400 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{roadmapData.targetCompany} Preparation Roadmap</h1>
        <p className="text-gray-400">
          {roadmapData.daysAvailable} days • {roadmapData.nodes.length} topics • Skill Level: {roadmapData.skillLevel}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Topics', value: roadmapData.nodes.length },
          { label: 'Total Days', value: roadmapData.totalDays },
          { label: 'Completed', value: completedNodes.length },
          { label: 'Progress', value: `${completionPercentage.toFixed(0)}%` },
        ].map((stat, i) => (
          <div key={i} className="card text-center">
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-blue-500">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="card mb-8">
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">{completionPercentage.toFixed(0)}% Complete</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-3 font-semibold transition-all ${
            activeTab === 'timeline'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Day-wise Timeline
        </button>
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-3 font-semibold transition-all ${
            activeTab === 'graph'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Graph View
        </button>
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-3 font-semibold transition-all ${
            activeTab === 'topics'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Topics
        </button>
      </div>

      {/* Content */}
      {activeTab === 'timeline' && roadmapData.dailySchedule && (
        <div className="mb-12">
          <DayWiseRoadmap
            dailySchedule={roadmapData.dailySchedule}
            targetCompany={roadmapData.targetCompany}
          />
        </div>
      )}

      {activeTab === 'graph' && (
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Visualization */}
          <div className="lg:col-span-2 h-[600px]">
            <div className="card h-full">
              <RoadmapVisualization roadmapData={roadmapData} />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={downloadPDF}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={shareRoadmap}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Roadmap
            </button>
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Topics Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {roadmapData.nodes.map((node) => (
              <ProgressCard
                key={node.id}
                node={node}
                isCompleted={completedNodes.includes(node.id)}
                onToggle={() => toggleNodeCompletion(node.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
