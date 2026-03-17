import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = ["Home", "About", "Services", "Projects", "Contact"];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all bg-obsidian/80 backdrop-blur-md border-b border-white/5">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold font-outfit text-white tracking-tight">
          Razael <span className="text-brand-primary">Saputra</span>
        </h1>
        <div className="h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-xs text-brand-secondary font-medium"
            >
              {professions[index]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 items-center">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item.toLowerCase())}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentPage === item.toLowerCase() 
              ? "text-brand-primary" 
              : "text-white/70 hover:text-brand-secondary"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-obsidian border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item.toLowerCase())}
                className={`text-left text-lg font-medium py-2 transition-colors cursor-pointer ${
                  currentPage === item.toLowerCase() 
                  ? "text-brand-primary" 
                  : "text-white/70"
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
