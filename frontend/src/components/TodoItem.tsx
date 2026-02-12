// src/components/TodoItem.tsx
import { motion } from "framer-motion";
import type { Todo, Priority } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void; // Digunakan untuk memindah status via tombol cepat
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const todayStr = new Date().toISOString().split("T")[0];

  // Helper untuk format tanggal
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    if (dateStr === todayStr) return "Hari Ini";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // Cek apakah tugas terlewat (Overdue)
  const isOverdue = () => {
    // Tugas dianggap overdue jika belum 'done' dan tanggal sudah lewat
    if (!todo.dueDate || todo.status === "done") return false;
    return todo.dueDate < todayStr;
  };

  const priorityStyles = (p: Priority) => {
    switch (p) {
      case "high":
        return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
      case "medium":
        return "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]";
      default:
        return "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      className={`group relative flex flex-col gap-3 p-4 rounded-[1.5rem] border transition-all duration-300 backdrop-blur-xl cursor-grab active:cursor-grabbing ${
        todo.status === "done"
          ? "bg-emerald-950/10 border-emerald-500/20 opacity-70"
          : isOverdue()
          ? "bg-red-950/10 border-red-500/30 shadow-lg shadow-red-500/5"
          : "bg-[#1a1a1a]/60 border-white/5 hover:border-white/20 shadow-xl"
      }`}
    >
      {/* HEADER AREA: Checkbox & Title */}
      <div className="flex items-start gap-3">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(todo.id);
          }}
          className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all duration-300 ${
            todo.status === "done"
              ? "bg-accent border-accent shadow-[0_0_10px_rgba(163,230,53,0.5)]"
              : "border-white/20 hover:border-accent"
          }`}
        >
          {todo.status === "done" && (
            <span className="text-black text-[10px] font-black">✓</span>
          )}
        </motion.button>

        <h3
          className={`text-sm font-bold leading-tight flex-1 transition-all duration-500 ${
            todo.status === "done" ? "text-slate-500 line-through italic" : "text-white"
          }`}
        >
          {todo.title}
        </h3>
      </div>

      {/* METADATA AREA: Priority, Date, Category */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Priority */}
        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
          <div className={`w-1.5 h-1.5 rounded-full ${priorityStyles(todo.priority)}`} />
          <span className="text-[8px] uppercase font-black tracking-widest text-slate-400">
            {todo.priority}
          </span>
        </div>

        {/* Due Date */}
        {todo.dueDate && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 ${isOverdue() ? "text-red-400" : "text-slate-500"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><path d="M3 10h18" /></svg>
            <span className="text-[8px] font-black uppercase">
              {formatDate(todo.dueDate)}
            </span>
          </div>
        )}

        {/* Category */}
        <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[8px] font-black uppercase tracking-wider text-slate-500 ml-auto">
          {todo.category}
        </span>
      </div>

      {/* ACTION BUTTONS: Edit & Delete */}
      <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(todo); }}
          className="p-1.5 rounded-lg text-slate-500 hover:text-accent hover:bg-white/5 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    </motion.div>
  );
};