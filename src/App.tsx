import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { WorkSlider } from "./components/portfolio/WorkSlider";
import { GithubProjects } from "./components/portfolio/GithubProjects";
import { RepoDetail } from "./components/portfolio/RepoDetail";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, User as UserIcon, Code2, Rocket, MessageSquare, Phone, Instagram } from "lucide-react";

type Page = "home" | "about" | "services" | "projects" | "contact" | "repo-detail";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const navigateTorepo = (repoName: string) => {
    setSelectedRepo(repoName);
    setCurrentPage("repo-detail");
    window.scrollTo(0, 0);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://etsukgjzmdgxgcejbvvf.supabase.co/functions/v1/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus("error");
    }
  };

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-obsidian text-white selection:bg-brand-primary selection:text-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <PageWrapper key="home">
              <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
                    <Rocket className="w-3 h-3" /> Available for projects
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold font-outfit leading-tight">
                    Crafting <span className="text-brand-primary">Digital</span> Experiences.
                  </h1>
                  <p className="text-lg text-white/60 max-w-lg leading-relaxed">
                    Saya adalah Razael Saputra, seorang multi-profesi yang berdedikasi dalam dunia teknologi, desain, otomotif, dan kreatifitas video.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCurrentPage("projects")}
                      className="px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20"
                    >
                      View My Work
                    </button>
                    <button 
                      onClick={() => setCurrentPage("contact")}
                      className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-bold rounded-xl transition-all"
                    >
                      Let's Talk
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full" />
                  <img 
                    src="/photo.png" 
                    alt="Razael Saputra" 
                    className="relative z-10 w-full max-w-md mx-auto aspect-square object-cover object-top rounded-3xl border border-white/10 shadow-2xl"
                  />
                </div>
              </section>

              <WorkSlider />
              
              <section className="py-24 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold font-outfit mb-4">Latest Repositories</h2>
                    <p className="text-white/40">Real-time data from my GitHub profile</p>
                  </div>
                  <div onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const link = target.closest('a');
                    if (link && link.getAttribute('href')?.startsWith('/project/')) {
                      e.preventDefault();
                      const name = link.getAttribute('href')?.replace('/project/', '');
                      if (name) navigateTorepo(name);
                    }
                  }}>
                    <GithubProjects />
                  </div>
                </div>
              </section>
            </PageWrapper>
          )}

          {currentPage === "projects" && (
            <PageWrapper key="projects">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                  <h2 className="text-4xl font-bold font-outfit mb-4">My Projects</h2>
                  <p className="text-white/40">Explore my technical repositories and creative works.</p>
                </div>
                <div onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const link = target.closest('a');
                    if (link && link.getAttribute('href')?.startsWith('/project/')) {
                      e.preventDefault();
                      const name = link.getAttribute('href')?.replace('/project/', '');
                      if (name) navigateTorepo(name);
                    }
                  }}>
                  <GithubProjects />
                </div>
              </div>
            </PageWrapper>
          )}

          {currentPage === "repo-detail" && selectedRepo && (
            <PageWrapper key="repo-detail">
              <RepoDetail 
                repoName={selectedRepo} 
                onBack={() => setCurrentPage("projects")} 
              />
            </PageWrapper>
          )}

          {currentPage === "services" && (
            <PageWrapper key="services">
              <div className="max-w-4xl mx-auto px-6">
                <div className="mb-16 text-center">
                  <h2 className="text-4xl font-bold font-outfit mb-4">My Services & Socials</h2>
                  <p className="text-white/40">Hubungi saya melalui platform di bawah ini untuk layanan profesional.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "Discord", icon: <MessageSquare className="w-8 h-8" />, color: "bg-[#5865F2]", text: "Join Community", link: "#" },
                    { name: "WhatsApp", icon: <Phone className="w-8 h-8" />, color: "bg-[#25D366]", text: "Chat via WA", link: "#" },
                    { name: "Instagram", icon: <Instagram className="w-8 h-8" />, color: "bg-[#E4405F]", text: "Follow @razael", link: "#" }
                  ].map((service) => (
                    <motion.a
                      key={service.name}
                      href={service.link}
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-6 group hover:border-brand-primary transition-all"
                    >
                      <div className={`p-4 rounded-xl ${service.color} text-white shadow-lg shadow-black/20`}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                        <p className="text-sm text-white/40 mb-4">Layanan fast response melalui {service.name}.</p>
                        <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest group-hover:bg-brand-primary group-hover:border-brand-primary transition-all">
                          {service.text}
                       </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </PageWrapper>
          )}

          {currentPage === "about" && (
            <PageWrapper key="about">
              <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
                <UserIcon className="w-16 h-16 text-brand-primary mx-auto" />
                <h2 className="text-4xl font-bold font-outfit">About Me</h2>
                <div className="space-y-6 text-lg text-white/60 leading-relaxed text-left">
                  <p>
                     Saya Razael Saputra, memiliki ketertarikan mendalam dalam berbagai bidang yang saya tekuni secara profesional. 
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <li className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <Code2 className="text-brand-primary mb-4" />
                      <h4 className="font-bold mb-2">Programmer</h4>
                      <p className="text-sm">Membangun solusi perangkat lunak yang skalabel dan efisien.</p>
                    </li>
                    <li className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <Briefcase className="text-teal-muted mb-4" />
                      <h4 className="font-bold mb-2">Designer & Editor</h4>
                      <p className="text-sm">Menciptakan visual yang memukau dan narasi video yang kuat.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </PageWrapper>
          )}

          {currentPage === "contact" && (
            <PageWrapper key="contact">
              <div className="max-w-xl mx-auto px-6 text-center space-y-12">
                <div className="space-y-4">
                  <Mail className="w-16 h-16 text-brand-secondary mx-auto" />
                  <h2 className="text-4xl font-bold font-outfit">Ready to work?</h2>
                  <p className="text-white/40">Hubungi saya untuk kolaborasi atau proyek menarik lainnya.</p>
                </div>
                <form className="space-y-4 text-left" onSubmit={handleContactSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Full Name</label>
                    <input name="name" type="text" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary outline-none transition-all" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Email Address</label>
                    <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary outline-none transition-all" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Message</label>
                    <textarea name="message" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-primary outline-none transition-all h-32" placeholder="Tell me about your project" />
                  </div>
                  <button 
                    disabled={formStatus === "loading"}
                    className="w-full py-4 bg-white text-obsidian font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "loading" ? "Sending..." : "Send Message"}
                  </button>
                  {formStatus === "success" && <p className="text-brand-secondary text-sm font-bold text-center">Pesan berhasil dikirim!</p>}
                  {formStatus === "error" && <p className="text-red-500 text-sm font-bold text-center">Gagal mengirim pesan. Silakan coba lagi.</p>}
                </form>
              </div>
            </PageWrapper>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
