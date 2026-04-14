import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { githubService } from "@/lib/github";
import type { Repository } from "@/lib/github";
import { Star, GitBranch, ArrowUpRight, Loader2 } from "lucide-react";

export function GithubProjects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    githubService.getRepositories("razaeldotexe")
      .then(setRepos)
      .catch((err: Error) => console.error("Error fetching repos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo, i) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/50 transition-all group relative cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-white/10 text-white">
              <GitBranch className="w-5 h-5" />
            </div>
            <a 
              href={`/project/${repo.name}`}
              className="p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
            {repo.name}
          </h3>
          <p className="text-sm text-white/60 mb-6 line-clamp-2 h-10">
            {repo.description || "No description provided."}
          </p>
          
          <div className="flex items-center gap-4 text-xs font-medium text-white/40">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-white/40" />
              {repo.stargazers_count}
            </div>
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {repo.language || "Unknown"}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
