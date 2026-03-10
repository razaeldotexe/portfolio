import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface WorkItem {
  title: string;
  image: string;
  category: string;
}

const works: WorkItem[] = [
  { title: "Enterprise Web Solution", image: "https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_1280.jpg", category: "Programmer" },
  { title: "Creative Brand Design", image: "https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg", category: "Designer" },
  { title: "Professional Video Edit", image: "https://cdn.pixabay.com/photo/2019/04/07/23/11/video-editor-4110940_1280.jpg", category: "Editor" },
  { title: "Performance Engine Tuning", image: "https://cdn.pixabay.com/photo/2020/07/08/10/30/engine-5383371_1280.jpg", category: "Otomotif" },
];

export function WorkSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % works.length);
  const prev = () => setIndex((prev) => (prev - 1 + works.length) % works.length);

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      next();
    } else if (info.offset.x > swipeThreshold) {
      prev();
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="flex items-center justify-between mb-8 px-6">
        <h2 className="text-3xl font-bold font-outfit text-white">Highlighted Works</h2>
        <div className="flex gap-2">
          <button onClick={prev} className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 overflow-visible cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${index * (window.innerWidth < 768 ? 85 : 42)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex gap-6 w-full"
        >
          {works.map((work, i) => (
            <motion.div
              key={i}
              className="min-w-[85%] md:min-w-[40%] h-[350px] md:h-[450px] relative rounded-2xl overflow-hidden group border border-white/10"
              whileHover={{ y: -10 }}
            >
              <img 
                src={work.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" 
                alt={work.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-2 block">
                  {work.category}
                </span>
                <h3 className="text-xl font-bold text-white font-outfit">
                  {work.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
