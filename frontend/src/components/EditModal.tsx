// src/components/EditModal.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Todo, Priority, Category } from "../types/todo";

interface EditModalProps {
  isOpen: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (updatedTodo: Todo) => void;
}

const CATEGORIES: Category[] = ["Work", "Study", "Personal", "Fitness"];

export const EditModal = ({ isOpen, todo, onClose, onSave }: EditModalProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("Personal");
  const [dueDate, setDueDate] = useState(""); // State untuk edit tanggal

  // Sync state saat modal dibuka/todo berubah
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setPriority(todo.priority);
      setCategory(todo.category);
      setDueDate(todo.dueDate || ""); // Pastikan string kosong jika tidak ada tanggal
    }
  }, [todo]);

  const handleSave = () => {
    if (!todo || !title.trim()) return;
    onSave({
      ...todo,
      title,
      priority,
      category,
      dueDate: dueDate || undefined, // Simpan sebagai undefined jika kosong
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop klik untuk tutup */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            className="bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative z-10"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Handle Bar: Hanya muncul di mobile sebagai penanda Bottom Sheet */}
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6 sm:hidden" />

            <h3 className="text-lg sm:text-xl font-black mb-6 sm:mb-8 italic tracking-tight text-white uppercase underline decoration-accent/30 underline-offset-8">
              Edit Workspace
            </h3>

            <div className="space-y-5 sm:space-y-6">
              {/* Input Judul */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">
                  Task Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none text-white transition-all text-sm sm:text-base"
                  placeholder="What needs to be done?"
                />
              </div>

              {/* Input Tanggal (Due Date) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em]">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-5 py-3.5 sm:py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none text-white transition-all text-sm [color-scheme:dark]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Select Kategori */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em] block">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full appearance-none px-5 py-3.5 sm:py-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-accent text-xs sm:text-sm cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#121212]">{cat}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</span>
                  </div>
                </div>

                {/* Select Prioritas */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-[0.2em] block">
                    Priority
                  </label>
                  <div className="relative">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className="w-full appearance-none px-5 py-3.5 sm:py-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-accent text-xs sm:text-sm cursor-pointer"
                    >
                      <option value="low" className="bg-[#121212]">Low</option>
                      <option value="medium" className="bg-[#121212]">Medium</option>
                      <option value="high" className="bg-[#121212]">High</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 sm:mt-10 mb-4 sm:mb-0">
              <button
                onClick={onClose}
                className="w-full sm:flex-1 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all text-white uppercase text-[10px] sm:text-xs tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-full sm:flex-1 py-4 rounded-2xl font-bold bg-accent text-black shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all uppercase text-[10px] sm:text-xs tracking-widest"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};