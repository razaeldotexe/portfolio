import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

// Note: In production, consider using an environment variable for the token
const github = axios.create({
  baseURL: GITHUB_API_URL,
});

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export interface Branch {
  name: string;
}

export interface Contributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

export const githubService = {
  getRepositories: async (username: string): Promise<Repository[]> => {
    const response = await github.get(
      `/users/${username}/repos?sort=updated&per_page=6`
    );
    return response.data;
  },

  getRepositoryDetails: async (username: string, repoName: string) => {
    const [commits, branches, contributors] = await Promise.all([
      github.get(`/repos/${username}/${repoName}/commits?per_page=10`),
      github.get(`/repos/${username}/${repoName}/branches`),
      github.get(`/repos/${username}/${repoName}/contributors`),
    ]);

    return {
      commits: commits.data as Commit[],
      branches: branches.data as Branch[],
      contributors: contributors.data as Contributor[],
    };
  },
};
