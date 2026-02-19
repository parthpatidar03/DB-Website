import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDataFetch } from '../hooks/useDataFetch';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';
import { PROJECT_CATEGORIES } from '../utils/constants';
import { containerVariants, itemVariants } from '../utils/animations';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

/**
 * Projects Page - "The Model Zoo"
 * Features:
 * - Server-side filtering & pagination
 * - Project cards in grid
 * - Category-based filtering
 * - Sort by name/status
 */
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSort] = useState('stars');
  const [page, setPage] = useState(1);
  const LIMIT = 6;

  // Fetch data with server-side pagination & filtering
  const { data: projects, loading, pagination } = useDataFetch(
    '/api/projects',
    {
      page,
      limit: LIMIT,
      filters: { category: selectedCategory },
      sort: sortBy
    },
    [page, selectedCategory, sortBy] // Dependencies to trigger re-fetch
  );

  // Modal State
  const [selectedProject, setSelectedProject] = useState(null);
  const [membersMap, setMembersMap] = useState({});

  // Fetch full member list for cached lookup
  // We fetch a large limit to get everyone effectively
  const { data: allMembers } = useDataFetch('/api/members?limit=1000', {}, []);

  useEffect(() => {
    if (allMembers) {
      const map = {};
      allMembers.forEach(m => map[m.rollNo] = m);
      setMembersMap(map);
    }
  }, [allMembers]);

  const handleCategoryChange = (catId) => {
      setSelectedCategory(catId);
      setPage(1);
  };

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

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
                    onClick={() => handleCategoryChange(cat.id)}
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
                {['stars', 'name'].map(sort => (
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
            {loading ? (
              <LoadingSkeleton count={6} />
            ) : (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                  {projects && projects.map((project) => (
                    <motion.div 
                        key={project.id} 
                        variants={itemVariants}
                        onClick={() => openModal(project)}
                        className="cursor-pointer"
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>

                {(!projects || projects.length === 0) && (
                  <div className="text-center py-20">
                    <p className="font-mono text-gray-500">No projects found in this category.</p>
                  </div>
                )}
                </>
            )}

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12 font-mono">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="px-4 py-2 rounded border border-gray-700 hover:border-data-blue disabled:opacity-50 disabled:hover:border-gray-700 transition-colors"
                >
                  &lt; PREV
                </button>
                <span className="text-data-blue">
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages || loading}
                  className="px-4 py-2 rounded border border-gray-700 hover:border-data-blue disabled:opacity-50 disabled:hover:border-gray-700 transition-colors"
                >
                  NEXT &gt;
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={closeModal} 
        membersMap={membersMap}
      />
    </div>
  );
};

export default Projects;
