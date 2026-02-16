#!/bin/bash

# Create Home Page
cat > src/pages/Home.jsx << 'EOF'
import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataFetch } from '../hooks/useDataFetch';
import { TICKER_MESSAGES } from '../utils/constants';
import { fadeInVariants, slideUpVariants, containerVariants, itemVariants } from '../utils/animations';

/**
 * Home Page - "The Input Layer"
 * Features:
 * - Neural splash hero with scatter plot effect
 * - Bento grid for "What we do"
 * - Club ticker with scrolling achievements
 * - Live stats with data gauges
 */
const Home = () => {
  const { data: stats } = useDataFetch('/api/stats');

  return (
    <div className="min-h-screen">
      {/* Hero Section - Neural Splash */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid-background-animated opacity-20" />
        
        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-mono font-bold mb-6"
          >
            <span className="text-data-blue neon-text">DATA</span>
            <span className="text-neural-violet neon-text-violet">BYTE</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-400 mb-8 font-mono"
          >
            The Official Machine Learning Club of NIT Trichy
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            Where data meets innovation. We build intelligent systems, conduct cutting-edge research,
            and push the boundaries of artificial intelligence.
          </motion.p>

          {/* CTA Button - Code Snippet Style */}
          <motion.div variants={itemVariants}>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-data-blue/10 border-2 border-data-blue rounded-lg font-mono text-data-blue hover:bg-data-blue/20 hover:shadow-neon transition-all group"
            >
              <span>run_exploration.sh</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 text-data-blue opacity-30"
        >
          <Database size={80} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-20 text-neural-violet opacity-30"
        >
          <Brain size={80} />
        </motion.div>
      </section>

      {/* What We Do - Bento Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-mono font-bold text-center mb-12"
          >
            <span className="text-data-blue">{'<'}</span>
            The Latent Space
            <span className="text-data-blue">{' />'}</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Machine Learning',
                icon: Brain,
                description: 'Build and deploy ML models that solve real-world problems',
                color: 'data-blue',
              },
              {
                title: 'Computer Vision',
                icon: Code,
                description: 'Develop visual recognition systems and image processing algorithms',
                color: 'neural-violet',
              },
              {
                title: 'Natural Language Processing',
                icon: Database,
                description: 'Create intelligent systems that understand and generate human language',
                color: 'terminal-green',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 glass rounded-lg border-${item.color}/30 hover:border-${item.color} transition-all group`}
              >
                <item.icon className={`w-12 h-12 text-${item.color} mb-4 group-hover:animate-pulse`} />
                <h3 className="text-xl font-mono font-semibold mb-2 text-gray-200">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Ticker */}
      <section className="py-12 bg-matrix-black/50 overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex space-x-8 whitespace-nowrap"
          >
            {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((message, index) => (
              <span
                key={index}
                className="font-mono text-sm text-terminal-green"
              >
                {message}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Projects', value: stats.projects.total, color: 'data-blue' },
                { label: 'Members', value: stats.members.total, color: 'neural-violet' },
                { label: 'Papers', value: stats.papers.published, color: 'terminal-green' },
                { label: 'Events', value: stats.events.workshops, color: 'yellow-500' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center p-6 glass rounded-lg"
                >
                  <div className={`text-4xl font-mono font-bold text-${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-mono text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
EOF

# Create Projects Page
cat > src/pages/Projects.jsx << 'EOF'
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
EOF

echo "✅ Created Home and Projects pages"
