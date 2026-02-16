import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDataFetch } from '../hooks/useDataFetch';
import ProjectCard from '../components/projects/ProjectCard';
import { PROJECT_CATEGORIES } from '../utils/constants';
import { containerVariants, itemVariants } from '../utils/animations';

/**
 * Projects Page - "The Model Zoo"
 * Features:
 * - Filter pipeline sidebar
 * - Project cards in grid
 * - Category-based filtering
 * - Sort by date/stars
 */
const Projects = () => {
  const { data: projects, loading } = useDataFetch('/api/projects');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSort] = useState('stars');

  const filteredProjects = projects
    ? projects.filter(p => selectedCategory === 'all' || p.category === selectedCategory)
        .sort((a, b) => {
          if (sortBy === 'stars') return b.stars - a.stars;
          if (sortBy === 'date') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
          return 0;
        })
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-mono font-bold mb-4">
            <span className="text-data-blue">[</span>
            The Model Zoo
            <span className="text-data-blue">]</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            SELECT * FROM projects WHERE status = 'innovative'
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 space-y-6"
          >
            {/* Category Filter */}
            <div className="glass p-4 rounded-lg">
              <h3 className="font-mono text-sm text-data-blue mb-4">CATEGORY</h3>
              <div className="space-y-2">
                {PROJECT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded font-mono text-sm transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-data-blue/20 text-data-blue border border-data-blue/50'
                        : 'text-gray-400 hover:text-data-blue hover:bg-gray-800'
                    }`}
                  >
                    {cat.icon && <span className="mr-2">{cat.icon}</span>}
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="glass p-4 rounded-lg">
              <h3 className="font-mono text-sm text-data-blue mb-4">SORT BY</h3>
              <div className="space-y-2">
                {['stars', 'date'].map(sort => (
                  <button
                    key={sort}
                    onClick={() => setSort(sort)}
                    className={`w-full text-left px-3 py-2 rounded font-mono text-sm transition-all ${
                      sortBy === sort
                        ? 'bg-neural-violet/20 text-neural-violet border border-neural-violet/50'
                        : 'text-gray-400 hover:text-neural-violet hover:bg-gray-800'
                    }`}
                  >
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="font-mono text-gray-500">No projects found in this category</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
