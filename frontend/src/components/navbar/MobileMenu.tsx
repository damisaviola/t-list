import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="absolute top-full left-0 right-0 mt-3 liquid-glass rounded-2xl p-4 md:hidden"
        >
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            {[
              ["Home", "#home"],
              ["Dashboard", "#dashboard"],
              ["Tasks", "#todo"],
              ["Stats", "#stats"],
              ["Settings", "#settings"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={onClose}
                className="px-3 py-2 rounded-xl hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}

            <div className="h-px bg-white/10 my-2" />

            <Link
              to="/login"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-accent text-black font-bold text-center"
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
