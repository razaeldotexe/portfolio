import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

const quotes = {
  id: "Aku selalu penasaran maka cobalah tidak pernah coba maka tidak pernah tahu",
  en: "I am always curious, so try it; if you never try, you'll never know",
  jp: "私はいつも好奇心旺盛です。だから試してみてください。試さなければ、決して分かりません",
  kr: "나는 항상 호기심이 많으니 시도해 보세요. 시도하지 않으면 결코 알 수 없습니다",
  de: "Ich bin immer neugierig, also probieren Sie es aus; wenn Sie es nie versuchen, werden Sie es nie wissen"
};

type Language = keyof typeof quotes;

export function Footer() {
  const [lang, setLang] = useState<Language>("id");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-obsidian border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl">
          <Globe className="w-6 h-6 text-brand-secondary" />
          <div className="h-20 flex items-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={lang}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-2xl font-medium text-white/90 italic leading-relaxed font-outfit"
              >
                "{quotes[lang]}"
              </motion.blockquote>
            </AnimatePresence>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            {Object.keys(quotes).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as Language)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  lang === l 
                  ? "bg-brand-primary border-brand-primary text-white" 
                  : "border-white/20 text-white/40 hover:border-white/40"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 border-t border-white/5">
          <p>© {currentYear} Razael Saputra. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-secondary transition-colors">Github</a>
            <a href="#" className="hover:text-brand-secondary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-secondary transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
