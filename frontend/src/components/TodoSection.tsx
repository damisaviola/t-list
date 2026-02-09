import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { fadeUp } from "../animation/animations";

type Priority = "low" | "medium" | "high";

type Todo = {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  dueDate?: string;
};

type Filter = "all" | "active" | "completed";

const STORAGE_KEY = "genz_todos";
const LOADING_DELAY = 1500;

export default function TodoSection() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("medium");
  const [editDueDate, setEditDueDate] = useState<string>("");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      setTodos(saved ? JSON.parse(saved) : []);
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
  const addTodo = () => {
    if (!title.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      done: false,
      priority,
      dueDate: dueDate || undefined,
    };
    setTodos(prev => [newTodo, ...prev]);
    setTitle("");
    setPriority("medium");
    setDueDate("");
  };

  const toggleDone = (todo: Todo) => {
    setTodos(prev => prev.map(t => (t.id === todo.id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const saveEdit = () => {
    if (!editingTodo || !editTitle.trim()) return;
    setTodos(prev =>
      prev.map(t =>
        t.id === editingTodo.id
          ? { ...t, title: editTitle, priority: editPriority, dueDate: editDueDate || undefined }
          : t
      )
    );
    closeModal();
  };

  /* ================= HELPERS ================= */
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter(t => !t.done);
    if (filter === "completed") return todos.filter(t => t.done);
    return todos;
  }, [todos, filter]);

  const isOverdue = (todo: Todo) => {
    if (!todo.dueDate || todo.done) return false;
    const today = new Date().toISOString().split("T")[0];
    return todo.dueDate < today;
  };

  const priorityDot = (p: Priority) => {
    if (p === "high") return "bg-red-400";
    if (p === "medium") return "bg-yellow-400";
    return "bg-emerald-400";
  };

  return (
    <>
      <motion.section
        id="todo"
        className="min-h-screen px-4 py-10 flex justify-center items-start bg-transparent"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Card Utama: h-auto + items-start memastikan card memanjang ke bawah */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-10 w-full max-w-2xl shadow-2xl h-auto flex flex-col transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic">
            Neon Tasks
          </h2>

          {/* INPUT SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Apa rencanamu hari ini?"
              disabled={loading}
              className="md:col-span-12 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none focus:border-accent text-white placeholder:text-slate-500 transition-all"
            />

            <div className="md:col-span-5 relative">
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as Priority)}
                disabled={loading}
                className="w-full appearance-none px-5 py-3.5 rounded-2xl bg-black/30 border border-white/10 text-sm focus:border-accent outline-none text-white cursor-pointer pr-10"
              >
                <option value="low" className="bg-[#121212]">Low Priority</option>
                <option value="medium" className="bg-[#121212]">Medium Priority</option>
                <option value="high" className="bg-[#121212]">High Priority</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</span>
            </div>

            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              disabled={loading}
              className="md:col-span-4 px-5 py-3.5 rounded-2xl bg-black/30 border border-white/10 text-sm focus:border-accent outline-none text-white cursor-pointer [color-scheme:dark] pr-5"
            />

            <button
              onClick={addTodo}
              disabled={loading}
              className="md:col-span-3 px-6 py-3.5 rounded-2xl bg-accent text-black font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg disabled:opacity-50"
            >
              Tambah
            </button>
          </div>

          {/* FILTERBAR */}
          {!loading && (
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
              <div className="flex p-1 rounded-xl bg-black/20 backdrop-blur-md">
                {(["all", "active", "completed"] as Filter[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      filter === f ? "bg-accent text-black shadow-lg" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-tighter text-slate-500">
                {todos.filter(t => t.done).length}/{todos.length} Done
              </span>
            </div>
          )}

          {/* SKELETON LOADING */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="h-20 rounded-2xl bg-white/10 border border-white/5"
                />
              ))}
            </div>
          )}

          {/* TODO LIST */}
          {!loading && (
            <Reorder.Group axis="y" values={todos} onReorder={setTodos} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredTodos.map(todo => (
                  <Reorder.Item
                    key={todo.id}
                    value={todo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileDrag={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                    className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border backdrop-blur-sm transition-all cursor-grab active:cursor-grabbing ${
                      isOverdue(todo) ? "border-red-500/40" : "border-white/10 hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleDone(todo)}
                        className={`min-w-[28px] h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                          todo.done ? "bg-accent border-accent" : "border-white/20 hover:border-accent"
                        }`}
                      >
                        {todo.done && <span className="text-black text-sm font-black">✓</span>}
                      </button>

                      <div className="flex flex-col text-left">
                        <span className={`text-base font-medium transition-all ${todo.done ? "line-through text-slate-500" : "text-slate-100"}`}>
                          {todo.title}
                        </span>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${priorityDot(todo.priority)} shadow-[0_0_8px_currentColor]`} />
                            {todo.priority}
                          </span>
                          {todo.dueDate && (
                            <span className={isOverdue(todo) ? "text-red-400" : ""}>
                              📅 {isOverdue(todo) ? "Overdue" : todo.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-none border-white/5 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(todo)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-accent hover:text-black transition-all text-xs font-bold text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                      >
                        Hapus
                      </button>
                    </div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          )}

          {!loading && todos.length === 0 && (
            <div className="text-center py-10 text-slate-500 italic">Chill aja dulu, belum ada tugas.</div>
          )}
        </div>
      </motion.section>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-3xl p-8 w-full max-w-md shadow-2xl overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8 sm:hidden" />
              <h3 className="text-xl font-black mb-8 italic tracking-tight text-white uppercase underline decoration-accent/30 underline-offset-8">Ubah Task</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Judul</label>
                  <input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Select Prioritas dengan ikon rapi */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest text-left block">Prioritas</label>
                    <div className="relative">
                      <select
                        value={editPriority}
                        onChange={e => setEditPriority(e.target.value as Priority)}
                        className="w-full appearance-none px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-accent text-sm cursor-pointer pr-10"
                      >
                        <option value="low" className="bg-[#121212]">Low</option>
                        <option value="medium" className="bg-[#121212]">Medium</option>
                        <option value="high" className="bg-[#121212]">High</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</span>
                    </div>
                  </div>

                  {/* Input Tanggal dengan ikon rapi */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest text-left block">Tanggal</label>
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={e => setEditDueDate(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:border-accent text-sm cursor-pointer [color-scheme:dark] pr-5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                <button onClick={closeModal} className="flex-1 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all text-white uppercase text-xs">Batal</button>
                <button onClick={saveEdit} className="flex-1 py-4 rounded-2xl font-bold bg-accent text-black shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all uppercase text-xs">Simpan</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}