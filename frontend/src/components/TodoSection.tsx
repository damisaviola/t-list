import { useEffect, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { fadeUp } from "../animation/animations";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const API = "http://localhost:3000";

export default function TodoSection() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // modal edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetch(`${API}/todos`)
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    const res = await fetch(`${API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    setTodos(prev => [...prev, data]);
    setTitle("");
  };

  const toggleDone = async (todo: Todo) => {
    const res = await fetch(`${API}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        done: !todo.done,
      }),
    });

    const updated = await res.json();
    setTodos(prev =>
      prev.map(t => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTodo = async (id: string) => {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // ===== EDIT MODAL =====
  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    setEditTitle("");
  };

  const saveEdit = async () => {
    if (!editingTodo || !editTitle.trim()) return;

    const res = await fetch(`${API}/todos/${editingTodo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        done: editingTodo.done,
      }),
    });

    const updated = await res.json();
    setTodos(prev =>
      prev.map(t => (t.id === updated.id ? updated : t))
    );

    closeModal();
  };

  return (
    <>
      {/* ===== TODO SECTION ===== */}
      <motion.section
        id="todo"
        className="section px-4 flex justify-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="liquid-glass rounded-3xl p-8 sm:p-10 w-full max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Neon Tasks
          </h2>

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Type something futuristic..."
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-accent"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 rounded-xl bg-accent text-black hover:scale-105 transition"
            >
              Add
            </button>
          </div>

          {/* LOADING SKELETON */}
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="skeleton h-11 rounded-xl border border-white/10"
                />
              ))}
            </div>
          )}

          {/* DRAG REORDER LIST */}
          {!loading && (
            <Reorder.Group
              axis="y"
              values={todos}
              onReorder={setTodos}
              className="space-y-3 text-sm"
            >
              <AnimatePresence>
                {todos.map(todo => (
                  <Reorder.Item
                    key={todo.id}
                    value={todo}
                    whileDrag={{ scale: 1.04 }}
                    className="
                      group flex items-center justify-between gap-3
                      px-4 py-3 rounded-xl
                      bg-black/40 border border-white/10
                      hover:border-accent transition
                      cursor-grab active:cursor-grabbing
                    "
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-4 flex-1">
                      {/* CUSTOM CHECKLIST */}
                      <button
                        onClick={() => toggleDone(todo)}
                        className={`
                          relative w-6 h-6 rounded-full
                          flex items-center justify-center
                          border transition
                          ${
                            todo.done
                              ? "bg-accent border-accent shadow-[0_0_12px_rgba(0,242,255,0.6)]"
                              : "border-white/30 hover:border-accent"
                          }
                        `}
                      >
                        {todo.done && (
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                        )}
                      </button>

                      <span
                        className={`transition ${
                          todo.done
                            ? "line-through text-slate-500"
                            : ""
                        }`}
                      >
                        {todo.title}
                      </span>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => openEditModal(todo)}
                        className="text-xs text-slate-400 hover:text-accent"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          )}
        </div>
      </motion.section>

      {/* ===== EDIT MODAL ===== */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="liquid-glass rounded-2xl p-6 sm:p-8 w-[90%] max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">
                Edit Task
              </h3>

              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:border-accent mb-6"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm rounded-lg border border-white/20 hover:border-white/40"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 text-sm rounded-lg bg-accent text-black hover:scale-105 transition"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
