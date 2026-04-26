'use client';

import { RoadmapGenerateRequest } from '@/types';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

interface RoadmapFormProps {
  onSubmit?: (data: RoadmapGenerateRequest) => Promise<void>;
  isLoading?: boolean;
}

export default function RoadmapForm({ onSubmit, isLoading: externalLoading = false }: RoadmapFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<RoadmapGenerateRequest>({
    targetCompany: '',
    daysAvailable: 30,
    weakTopics: [],
    skillLevel: 'intermediate',
  });

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Topic display names (what users see) mapped to backend names
  const topics = [
    { display: 'Arrays', value: 'arrays' },
    { display: 'Strings', value: 'strings' },
    { display: 'Linked Lists', value: 'linked_lists' },
    { display: 'Stacks & Queues', value: 'stacks_queues' },
    { display: 'Trees', value: 'trees' },
    { display: 'Graphs', value: 'graphs' },
    { display: 'Binary Search', value: 'binary_search' },
    { display: 'Sorting', value: 'sorting' },
    { display: 'Hash Tables', value: 'hashing' },
    { display: 'Dynamic Programming', value: 'dynamic_programming' },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        ...formData,
        weakTopics: selectedTopics,
      };

      if (onSubmit) {
        await onSubmit(requestData);
      } else {
        // Default behavior: call API directly
        const response = await fetch('http://localhost:8000/api/roadmap/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to generate roadmap');
        }

        const roadmap = await response.json();
        
        // Store in localStorage
        localStorage.setItem('currentRoadmap', JSON.stringify(roadmap));
        
        // Redirect to roadmap view
        router.push('/roadmap');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to generate roadmap: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = (value: string) => {
    setSelectedTopics((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const isFormValid = formData.targetCompany.trim() !== '';
  const isSubmitting = loading || externalLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Target Company */}
      <div>
        <label className="block text-sm font-semibold mb-3">Target Company</label>
        <input
          type="text"
          placeholder="e.g., Google, Meta, Amazon"
          value={formData.targetCompany}
          onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
          className="input-field w-full"
          required
        />
      </div>

      {/* Days Available */}
      <div>
        <label className="block text-sm font-semibold mb-3">
          Days Available for Preparation: <span className="text-blue-500">{formData.daysAvailable}</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="7"
            max="180"
            value={formData.daysAvailable}
            onChange={(e) => setFormData({ ...formData, daysAvailable: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-sm text-gray-400 min-w-fit">{formData.daysAvailable} days</span>
        </div>
      </div>

      {/* Skill Level */}
      <div>
        <label className="block text-sm font-semibold mb-3">Current Skill Level</label>
        <div className="flex gap-4">
          {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="skillLevel"
                value={level}
                checked={formData.skillLevel === level}
                onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as any })}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="capitalize">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Weak Topics */}
      <div>
        <label className="block text-sm font-semibold mb-4">Topics You Need to Focus On</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {topics.map((topic) => (
            <button
              key={topic.value}
              type="button"
              onClick={() => toggleTopic(topic.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTopics.includes(topic.value)
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 border border-gray-700 hover:border-blue-500/50 text-gray-300'
              }`}
            >
              {topic.display}
            </button>
          ))}
        </div>
        {selectedTopics.length > 0 && (
          <p className="text-sm text-gray-400 mt-3">
            {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Generating Your Roadmap...
          </>
        ) : (
          'Generate My Roadmap'
        )}
      </button>
    </form>
  );
}
