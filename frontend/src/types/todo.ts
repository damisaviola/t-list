export type Priority = "low" | "medium" | "high";
export type Category = "All" | "Work" | "Study" | "Personal" | "Fitness";
export type Filter = "all" | "active" | "completed";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string; // Tambahkan ini (format: YYYY-MM-DD)
}