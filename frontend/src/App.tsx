import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoApp from "./pages/TodoApp";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import "./lib/chart";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* PROTECTED */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />

        {/* 404 — HARUS PALING BAWAH */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
