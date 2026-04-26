'use client';

import RoadmapForm from '@/components/RoadmapForm';

export default function GeneratePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Generate Your Roadmap</h1>
        <p className="text-gray-400 text-lg">
          Tell us about your interview goals and we'll create a personalized learning path powered by Dijkstra's algorithm
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <div className="card">
            <RoadmapForm />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold mb-3">How It Works</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold flex-shrink-0">1.</span>
                <span>Provide your interview details and current level</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold flex-shrink-0">2.</span>
                <span>Our algorithm analyzes the optimal learning sequence using Dijkstra's shortest path</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold flex-shrink-0">3.</span>
                <span>Get a personalized roadmap with resources and time estimates</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold flex-shrink-0">4.</span>
                <span>Track progress and mark topics as complete</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-3">Pro Tips</h3>
            <ul className="space-y-2 text-gray-400 text-sm list-disc list-inside">
              <li>Be honest about your weak areas - we prioritize them</li>
              <li>Start with realistic timelines (30-60 days optimal)</li>
              <li>Focus on depth, not breadth - master fundamentals first</li>
              <li>Practice consistently - ideally 2-3 hours daily</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-3">Popular Companies</h3>
            <div className="flex flex-wrap gap-2">
              {['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Tesla'].map((company) => (
                <span key={company} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
