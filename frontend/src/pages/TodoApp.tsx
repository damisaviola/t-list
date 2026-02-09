import Navbar from "../components/navbar/Navbar";
import TodoSection from "../components/TodoSection";

export default function TodoApp() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND */}
      <div className="neon-bg absolute inset-0 -z-10" />
      <div className="grid-bg absolute inset-0 -z-10" />

      {/* NAVBAR (FIXED) */}
      <Navbar />

      {/* CONTENT */}
      <main className="pt-28">
        <TodoSection />
      </main>
    </div>
  );
}
