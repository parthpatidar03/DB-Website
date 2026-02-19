import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDataFetch } from '../hooks/useDataFetch';
import BlogCard from '../components/blogs/BlogCard';
import { containerVariants, itemVariants } from '../utils/animations';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

/**
 * Blogs Page - "The Knowledge Graph"
 * Features:
 * - List of articles/blogs
 * - Sort by Date
 * - Pagination
 */
const Blogs = () => {
  const [sortBy, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const LIMIT = 6;

  // Fetch data
  const { data: blogs, loading, pagination } = useDataFetch(
    '/api/blogs',
    {
      page,
      limit: LIMIT,
      sort: sortBy
    },
    [page, sortBy]
  );

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
            <span className="text-data-blue">{'{'}</span>
            The Knowledge Graph
            <span className="text-data-blue">{'}'}</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            SELECT * FROM thoughts WHERE type = 'insight'
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Sort Only for now */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 space-y-6"
          >
            <div className="glass p-4 rounded-lg">
              <h3 className="font-mono text-sm text-data-blue mb-4">SORT BY DATE</h3>
              <div className="space-y-2">
                {['newest', 'oldest'].map((sort) => (
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

          {/* Blogs Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            {loading ? (
              <LoadingSkeleton count={3} />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
                  {blogs && blogs.map((blog) => (
                    <motion.div key={blog.id} variants={itemVariants}>
                      <BlogCard blog={blog} />
                    </motion.div>
                  ))}
                </div>

                {(!blogs || blogs.length === 0) && (
                  <div className="text-center py-20">
                    <p className="font-mono text-gray-500">No blogs found.</p>
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
    </div>
  );
};

export default Blogs;
