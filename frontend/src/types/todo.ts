// src/types/todo.ts
export type Priority = "low" | "medium" | "high";
export type Category = "All" | "Work" | "Study" | "Personal" | "Fitness";
export type Status = "todo" | "inprogress" | "done"; // Tambahkan ini

export interface Todo {
  id: string;
  title: string;
  status: Status; // Ganti 'done: boolean' menjadi 'status: Status'
  priority: Priority;
  category: Category;
  dueDate?: string;
}