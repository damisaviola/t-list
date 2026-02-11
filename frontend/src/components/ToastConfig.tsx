import { Toaster } from "react-hot-toast";

export const ToastConfig = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "rgba(15, 15, 15, 0.8)",
          color: "#fff",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "600",
          padding: "12px 20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        },
        success: {
          iconTheme: {
            primary: "#A3E635", // Sesuaikan dengan warna accent-mu
            secondary: "#000",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};