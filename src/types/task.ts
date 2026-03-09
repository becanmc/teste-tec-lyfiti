export interface Task {
  id: string;
  title: string;
  description: string;
  urgencyScore: number | null;
  impactScore: number | null;
  isCompleted: boolean;
  createdAt: Date;
  order: number;
  categoryId?: string;
  isScoring?: boolean;
}

export interface TaskInput {
  title: string;
  description: string;
  categoryId?: string;
}
