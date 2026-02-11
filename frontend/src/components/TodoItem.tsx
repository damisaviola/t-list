// src/components/TodoItem.tsx
import { Reorder, motion } from "framer-motion";
import type { Todo, Priority } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    if (dateStr === todayStr) return "Hari Ini";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.done) return false;
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
    <Reorder.Item
      value={todo}
      className="relative list-none mb-3 px-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileDrag={{ scale: 1.02, zIndex: 50 }}
    >
      <div
        className={`group relative flex items-center gap-3 p-4 sm:p-5 rounded-[1.5rem] border transition-all duration-300 backdrop-blur-xl ${
          todo.done
            ? "bg-emerald-950/10 border-emerald-500/20 opacity-70"
            : isOverdue()
            ? "bg-red-950/10 border-red-500/30"
            : "bg-[#1a1a1a]/60 border-white/5 hover:border-white/20 shadow-xl"
        }`}
      >
        {/* CHECKBOX - Area sentuh besar untuk jempol */}
        <div className="flex-shrink-0">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(todo.id);
            }}
            className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300 ${
              todo.done
                ? "bg-accent border-accent shadow-[0_0_12px_rgba(163,230,53,0.5)]"
                : "border-white/20"
            }`}
          >
            {todo.done && (
              <span className="text-black text-sm font-black">✓</span>
            )}
          </motion.button>
        </div>

        {/* CONTENT - Text wrapping agar tidak overflow di HP kecil */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3
            className={`text-sm sm:text-base font-bold truncate transition-all duration-500 ${
              todo.done ? "text-slate-500 line-through italic" : "text-white"
            }`}
          >
            {todo.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {/* Priority Tag */}
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${priorityStyles(todo.priority)}`} />
              <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
                {todo.priority}
              </span>
            </div>

            {/* Divider (Hidden di HP sangat kecil jika wrap) */}
            <span className="hidden xs:block h-3 w-[1px] bg-white/10" />

            {/* Date Tag */}
            {todo.dueDate && (
              <div className={`flex items-center gap-1 ${isOverdue() ? "text-red-400" : "text-slate-400"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span className="text-[9px] font-black uppercase">
                  {formatDate(todo.dueDate)}
                </span>
              </div>
            )}

            {/* Category Tag */}
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-wider text-slate-500">
              {todo.category}
            </span>
          </div>
        </div>

        {/* ACTIONS - Di Mobile tampil lebih jelas, di Desktop muncul saat hover */}
        <div className="flex items-center gap-1">
          {/* Edit Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(todo);
            }}
            className="p-2.5 rounded-xl text-slate-400 active:bg-white/10 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
            className="p-2.5 rounded-xl text-red-500/50 active:bg-red-500/10 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
};