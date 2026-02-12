// src/components/TodoSection.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../animation/animations";
import toast from "react-hot-toast"; // Pastikan library ini terinstall

// Import Type-Only
import type { Todo, Priority, Category, Status } from "../types/todo";

// Import Komponen
import { TodoItem } from "./TodoItem";
import { ToastConfig } from "./ToastConfig";
import { EditModal } from "./EditModal";
import { TodoSkeletonList } from "./TodoSkeleton";

const STORAGE_KEY = "genz_todos_v3";
const CATEGORIES: Category[] = ["All", "Work", "Study", "Personal", "Fitness"];

const COLUMNS: { id: Status; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "bg-slate-400" },
  { id: "inprogress", label: "In Progress", color: "bg-amber-400" },
  { id: "done", label: "Done", color: "bg-emerald-400" },
];

const LOADING_DELAY = 1200;

export default function TodoSection() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("Personal");
  const [dueDate, setDueDate] = useState("");
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  /* ================= LOAD & SAVE ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setTodos(JSON.parse(saved));
        } catch (e) {
          console.error("Gagal load data", e);
        }
      }
      setLoading(false);
    }, LOADING_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, loading]);

  /* ================= ACTIONS ================= */
  const handleAdd = () => {
    if (!title.trim()) return toast.error("Judul kosong, bestie! 🙄");
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      status: "todo", 
      priority,
      category,
      dueDate: dueDate || undefined,
    };
    
    setTodos([newTodo, ...todos]);
    setTitle("");
    setDueDate("");
    toast.success("Task mendarat di To Do! 🚀", {
      icon: '🔥',
    });
  };

  const moveTask = (id: string, newStatus: Status) => {
    const targetTask = todos.find(t => t.id === id);
    if (!targetTask) return;

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );

    // Toast notifikasi saat pindah kolom
    const statusLabels: Record<Status, string> = {
      todo: "To Do",
      inprogress: "In Progress",
      done: "Done"
    };
    
    toast.success(`Task pindah ke ${statusLabels[newStatus]}`, {
      icon: '📦',
      duration: 2000,
    });
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    toast.error("Tugas dihapus selamanya. 🗑️");
  };

  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
    setIsModalOpen(false);
    toast.success("Task diperbarui! ✨");
  };

  /* ================= FILTER LOGIC ================= */
  const filteredTodos = useMemo(() => {
    return todos.filter((t) => {
      const catMatch = activeCat === "All" ? true : t.category === activeCat;
      const searchMatch = t.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [todos, activeCat, searchQuery]);

  return (
    <>
      {/* ToastConfig merender <Toaster /> secara internal */}
      <ToastConfig />
      
      <EditModal
        isOpen={isModalOpen}
        todo={selectedTodo}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <motion.section
        className="min-h-screen p-4 sm:p-8 overflow-hidden"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-8 text-left">
          
          {/* INPUT AREA */}
          <div className="backdrop-blur-3xl bg-white/[0.02] rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full -mr-16 -mt-16" />
            
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-8 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic tracking-tighter uppercase">
              Neon Workspace
            </h2>

            <div className="space-y-4 relative z-10">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all placeholder:text-white/20"
                placeholder="Apa rencanamu? (Enter untuk simpan)"
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none appearance-none">
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>
                  ))}
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none appearance-none">
                  <option value="low" className="bg-[#0a0a0a]">Low</option>
                  <option value="medium" className="bg-[#0a0a0a]">Medium</option>
                  <option value="high" className="bg-[#0a0a0a]">High</option>
                </select>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none [color-scheme:dark]" />
                <button onClick={handleAdd} className="bg-white text-black font-black rounded-xl py-3 text-[10px] uppercase tracking-widest hover:bg-accent transition-all">Add Task</button>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center px-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                    activeCat === cat
                      ? "bg-white text-black border-white shadow-xl"
                      : "bg-white/[0.05] text-white/40 border-white/5 hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white outline-none focus:border-accent/40" placeholder="Search tasks..." />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
          </div>

          {/* KANBAN BOARD */}
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10 -mx-4 px-4 md:mx-0 md:px-0">
            {COLUMNS.map((col) => (
              <div
                key={col.id}
                className="flex flex-col min-w-[85vw] md:min-w-0 snap-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                  const id = e.dataTransfer.getData("taskId");
                  if (id) moveTask(id, col.id);
                }}
              >
                <div className="flex items-center gap-3 mb-5 px-2">
                  <div className={`w-2 h-2 rounded-full ${col.color} shadow-[0_0_15px_currentColor]`} />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">{col.label}</h3>
                  <div className="flex-1 h-[1px] bg-white/5" />
                  <span className="text-[10px] text-white/30 font-bold tabular-nums">
                    {filteredTodos.filter((t) => t.status === col.id).length}
                  </span>
                </div>

                <div className="backdrop-blur-2xl bg-white/[0.01] rounded-[2.5rem] p-4 min-h-[450px] md:min-h-[550px] flex flex-col gap-4 border border-white/5 shadow-inner">
                  {loading ? (
                    <TodoSkeletonList />
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {filteredTodos
                        .filter((t) => t.status === col.id)
                        .map((todo) => (
                          <motion.div
                            key={todo.id}
                            layout
                            draggable="true"
                            onDragStartCapture={(e: React.DragEvent<HTMLDivElement>) => {
                              e.dataTransfer.setData("taskId", todo.id);
                              e.dataTransfer.effectAllowed = "move";
                            }}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <TodoItem
                              todo={todo}
                              onDelete={handleDelete}
                              onEdit={handleEditClick}
                              onToggle={(id) => moveTask(id, todo.status === 'done' ? 'todo' : 'done')}
                            />
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  )}
                  
                  {!loading && filteredTodos.filter((t) => t.status === col.id).length === 0 && (
                    <div className="flex-1 flex items-center justify-center rounded-[1.5rem] group opacity-20">
                      <p className="text-[9px] uppercase font-black tracking-[0.4em] text-white italic">
                        Empty
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}