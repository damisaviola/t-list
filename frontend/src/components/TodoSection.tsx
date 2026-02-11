import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { fadeUp } from "../animation/animations";
import toast from "react-hot-toast";

// Import Type-Only
import type { Todo, Priority, Category, Filter } from "../types/todo";

// Import Komponen
import { TodoItem } from "./TodoItem";
import { ToastConfig } from "./ToastConfig";
import { EditModal } from "./EditModal";
import { TodoSkeletonList } from "./TodoSkeleton"; // Pastikan file ini sudah dibuat

const STORAGE_KEY = "genz_todos_v3";
const CATEGORIES: Category[] = ["All", "Work", "Study", "Personal", "Fitness"];
const LOADING_DELAY = 1500;

export default function TodoSection() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("Personal");
  const [dueDate, setDueDate] = useState("");
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  /* ================= LOAD DATA ================= */
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

  /* ================= SAVE DATA ================= */
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, loading]);

  /* ================= CRUD ACTIONS ================= */
  const handleAdd = () => {
    if (!title.trim()) {
      toast.error("Isi judul dulu, bestie! 🙄");
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      done: false,
      priority,
      category,
      dueDate: dueDate || undefined,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
    setDueDate("");
    toast.success("Tugas mendarat! 🚀");
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    toast.error("Tugas dihapus.");
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
    toast.success("Tugas diperbarui! ✨");
  };

  /* ================= FILTER & SEARCH LOGIC ================= */
  const filtered = useMemo(() => {
    return todos.filter((t) => {
      const statusMatch =
        filter === "all" ? true : filter === "active" ? !t.done : t.done;
      const catMatch = activeCat === "All" ? true : t.category === activeCat;
      const searchMatch = t.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return statusMatch && catMatch && searchMatch;
    });
  }, [todos, filter, activeCat, searchQuery]);

  return (
    <>
      <ToastConfig />
      <EditModal
        isOpen={isModalOpen}
        todo={selectedTodo}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <motion.section
        className="min-h-screen px-4 py-10 flex justify-center items-start bg-transparent"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="liquid-glass rounded-[2.5rem] p-6 sm:p-10 w-full max-w-2xl shadow-2xl h-auto flex flex-col transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic tracking-tight uppercase">
            Neon Workspace
          </h2>

          {/* INPUT FORM */}
          <div className="space-y-3 mb-8">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white outline-none focus:border-accent transition-all placeholder:text-slate-500"
              placeholder="Apa rencanamu?"
            />
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="sm:col-span-3 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white outline-none appearance-none cursor-pointer"
              >
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c} className="bg-[#121212]">
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="sm:col-span-3 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white outline-none appearance-none cursor-pointer"
              >
                <option value="low" className="bg-[#121212]">Low</option>
                <option value="medium" className="bg-[#121212]">Medium</option>
                <option value="high" className="bg-[#121212]">High</option>
              </select>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="sm:col-span-3 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white outline-none [color-scheme:dark]"
              />
              <button
                onClick={handleAdd}
                className="sm:col-span-3 bg-accent text-black font-black rounded-xl py-3 text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-accent/20"
              >
                Add
              </button>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white outline-none focus:bg-white/10 transition-all placeholder:text-slate-600"
              placeholder="Cari tugas kamu..."
            />
          </div>

          {/* CATEGORY TABS */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 border-b border-white/5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                  activeCat === cat
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "bg-white/5 text-slate-500 border-white/5 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* RENDER AREA (Loading atau List) */}
          {loading ? (
            <TodoSkeletonList />
          ) : (
            <>
              <Reorder.Group
                axis="y"
                values={todos}
                onReorder={setTodos}
                className="space-y-3"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onEdit={handleEditClick}
                    />
                  ))}
                </AnimatePresence>
              </Reorder.Group>

              {filtered.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10 text-slate-500 italic text-sm"
                >
                  {searchQuery
                    ? "Tugas tidak ditemukan. 🔍"
                    : "List bersih, waktunya chill! ✨"}
                </motion.p>
              )}
            </>
          )}
        </div>
      </motion.section>
    </>
  );
}