import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const professions = [
  "Programmer",
  "Designer",
  "Editor",
  "Otomotif"
];

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-obsidian/80 backdrop-blur-md border-b border-white/10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-brand-primary tracking-tight font-outfit">
          Razael Saputra
        </h1>
        <div className="h-6 overflow-hidden mt-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={professions[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-sm font-medium text-teal-muted"
            >
              Professional {professions[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      
      <nav className="hidden md:flex gap-8 items-center">
        {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item.toLowerCase())}
            className={`text-sm font-medium transition-colors ${
              currentPage === item.toLowerCase() 
              ? "text-brand-primary" 
              : "text-white/70 hover:text-brand-secondary"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}
