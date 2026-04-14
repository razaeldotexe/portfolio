export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-obsidian border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="w-full pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 border-t border-white/5">
          <p>© {currentYear} Razael Saputra. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Github
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
