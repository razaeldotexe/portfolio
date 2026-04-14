import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface WorkItem {
  title: string;
  image: string;
  category: string;
}

const works: WorkItem[] = [
  {
    title: 'Enterprise Web Solution',
    image:
      'https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_1280.jpg',
    category: 'Programmer',
  },
  {
    title: 'Creative Brand Design',
    image:
      'https://cdn.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg',
    category: 'Designer',
  },
  {
    title: 'Professional Video Edit',
    image:
      'https://cdn.pixabay.com/photo/2015/05/15/02/07/computer-767781_1280.jpg',
    category: 'Editor',
  },
  {
    title: 'Performance Engine Tuning',
    image:
      'https://cdn.pixabay.com/photo/2014/06/04/16/52/classic-car-362176_1280.jpg',
    category: 'Otomotif',
  },
];

export function WorkSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-12">
      <div className="flex items-center justify-between mb-8 px-6">
        <h2 className="text-3xl font-bold font-outfit text-white">
          Highlighted Works
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto px-6 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory touch-pan-x"
      >
        {works.map((work, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[85%] md:min-w-[40%] h-[350px] md:h-[450px] relative rounded-2xl overflow-hidden group border border-white/10 shrink-0 snap-center cursor-pointer"
            whileHover={{ y: -10 }}
          >
            <img
              src={work.image}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              alt={work.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2 block">
                {work.category}
              </span>
              <h3 className="text-xl font-bold text-white font-outfit">
                {work.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
