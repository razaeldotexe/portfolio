import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { githubService } from '@/lib/github';
import type { Commit, Branch, Contributor } from '@/lib/github';
import {
  GitCommit,
  GitBranch,
  Users,
  ArrowLeft,
  Calendar,
  User as UserIcon,
  Loader2,
} from 'lucide-react';

interface RepoDetailProps {
  repoName: string;
  onBack: () => void;
}

export function RepoDetail({ repoName, onBack }: RepoDetailProps) {
  const [data, setData] = useState<{
    commits: Commit[];
    branches: Branch[];
    contributors: Contributor[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    githubService
      .getRepositoryDetails('razaeldotexe', repoName)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [repoName]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40 gap-4">
        <Loader2 className="w-10 h-10 text-white/20 animate-spin" />
        <p className="text-white/40 animate-pulse">
          Fetching repository data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Commits */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white font-outfit mb-2 flex items-center gap-3">
              <GitCommit className="text-white w-8 h-8" />
              Commit History
            </h2>
            <p className="text-white/40">Latest activity on {repoName}</p>
          </div>

          <div className="space-y-4">
            {data?.commits.map((commit, i) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <UserIcon className="w-5 h-5 text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate mb-1">
                    {commit.commit.message}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      {commit.commit.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(commit.commit.author.date).toLocaleDateString()}
                    </span>
                    <span className="font-mono bg-white/5 px-1 rounded text-white/30">
                      {commit.sha.substring(0, 7)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-12">
          {/* Branches */}
          <section>
            <h3 className="text-xl font-bold text-white font-outfit mb-6 flex items-center gap-2">
              <GitBranch className="text-white/60 w-5 h-5" />
              Branches
            </h3>
            <div className="flex flex-wrap gap-2">
              {data?.branches.map((branch) => (
                <span
                  key={branch.name}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70"
                >
                  {branch.name}
                </span>
              ))}
            </div>
          </section>

          {/* Contributors */}
          <section>
            <h3 className="text-xl font-bold text-white font-outfit mb-6 flex items-center gap-2">
              <Users className="text-white/60 w-5 h-5" />
              Contributors
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {data?.contributors.map((contributor) => (
                <div
                  key={contributor.login}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <img
                    src={contributor.avatar_url}
                    className="w-10 h-10 rounded-full border border-white/10"
                    alt={contributor.login}
                  />
                  <div>
                    <p className="text-sm font-bold text-white">
                      {contributor.login}
                    </p>
                    <p className="text-xs text-white/40">
                      {contributor.contributions} contributions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
