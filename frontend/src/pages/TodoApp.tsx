import Navbar from "../components/Navbar";
import TodoSection from "../components/TodoSection";

export default function TodoApp() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="neon-bg" />
      <div className="grid-bg" />

      <Navbar />
      <TodoSection />
    </div>
  );
}
