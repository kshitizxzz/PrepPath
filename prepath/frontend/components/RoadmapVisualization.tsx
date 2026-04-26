'use client';

import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { RoadmapData } from '@/types';

interface RoadmapVisualizationProps {
  roadmapData: RoadmapData;
}

export default function RoadmapVisualization({ roadmapData }: RoadmapVisualizationProps) {
  const nodes: Node[] = roadmapData.nodes.map((node) => ({
    id: node.id,
    data: {
      label: (
        <div className="px-4 py-2">
          <div className="font-bold text-white">{node.title}</div>
          <div className="text-xs text-gray-300">{node.daysToPrepare} days</div>
        </div>
      ),
    },
    position: {
      x: parseInt(node.id) * 250,
      y: Math.random() * 400,
    },
    style: {
      background:
        node.difficulty === 'easy'
          ? '#10b981'
          : node.difficulty === 'medium'
            ? '#f59e0b'
            : '#ef4444',
      color: '#fff',
      border: node.completed ? '2px solid #00ff00' : '1px solid rgba(59, 130, 246, 0.5)',
      borderRadius: '8px',
      opacity: node.completed ? 1 : 0.8,
    },
  }));

  const edges: Edge[] = roadmapData.edges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  }));

  return (
    <div className="w-full h-full bg-dark rounded-xl overflow-hidden border border-gray-800">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background color="#1e293b" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
