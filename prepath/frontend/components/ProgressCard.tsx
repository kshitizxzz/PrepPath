'use client';

import { RoadmapNode } from '@/types';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressCardProps {
  node: RoadmapNode;
  isCompleted?: boolean;
  onToggle?: () => void;
}

export default function ProgressCard({ node, isCompleted = false, onToggle }: ProgressCardProps) {
  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onToggle}
      className={`card cursor-pointer transition-all ${isCompleted ? 'border-green-500/50' : ''}`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          className="flex-shrink-0 mt-1"
        >
          {isCompleted ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-600 hover:text-primary transition" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : ''}`}>
              {node.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[node.difficulty]}`}>
              {node.difficulty.charAt(0).toUpperCase() + node.difficulty.slice(1)}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-3">{node.topic}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Days to prepare:</span>
              <span className="font-semibold text-primary">{node.daysToPrepare} days</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {node.resources.map((resource, i) => (
                <span key={i} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">
                  {resource}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
