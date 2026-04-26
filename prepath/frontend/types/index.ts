export interface RoadmapNode {
  id: string;
  title: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  daysToPrepare: number;
  resources: string[];
  completed: boolean;
}

export interface RoadmapData {
  id: string;
  userId: string;
  targetCompany: string;
  daysAvailable: number;
  weakTopics: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  nodes: RoadmapNode[];
  edges: Array<{ source: string; target: string }>;
  totalDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface RoadmapGenerateRequest {
  targetCompany: string;
  daysAvailable: number;
  weakTopics: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}
