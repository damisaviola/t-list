// components/profile/types.ts

export type User = {
  name: string;
  email: string;
  role: string;
  joinedAt: string;
};

export type Stats = {
  totalTasks: number;
  completed: number;
  pending: number;
  productivity: number;
  streak: number;
};
