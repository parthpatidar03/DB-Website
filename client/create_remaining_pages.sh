#!/bin/bash

# Create Members Page
cat > src/pages/Members.jsx << 'EOF'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDataFetch } from '../hooks/useDataFetch';
import MemberCard from '../components/members/MemberCard';
import { MEMBER_ROLES } from '../utils/constants';
import { containerVariants, itemVariants } from '../utils/animations';

/**
 * Members Page - "The Neural Network"
 * Features:
 * - Member cards with CV detection frames
 * - Role-based filtering
 * - Grid/List view toggle
 */
const Members = () => {
  const { data: members, loading } = useDataFetch('/api/members');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredMembers = members
    ? members.filter(m => selectedRole === 'all' || m.role === selectedRole)
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
            <span className="text-data-blue">{'{'}</span>
            The Neural Network
            <span className="text-data-blue">{'}'}</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            // The neurons that power our intelligence
          </p>
        </motion.div>

        {/* Role Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          <button
            onClick={() => setSelectedRole('all')}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
              selectedRole === 'all'
                ? 'bg-data-blue/20 text-data-blue border-2 border-data-blue'
                : 'bg-gray-800 text-gray-400 hover:text-data-blue'
            }`}
          >
            All Members
          </button>
          {MEMBER_ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                selectedRole === role.id
                  ? `bg-${role.color}/20 text-${role.color} border-2 border-${role.color}`
                  : 'bg-gray-800 text-gray-400 hover:text-data-blue'
              }`}
            >
              {role.label}
            </button>
          ))}
        </motion.div>

        {/* Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMembers.map((member, index) => (
            <motion.div key={member.id} variants={itemVariants}>
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-gray-500">No members found with this role</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
EOF

# Create Blogs Page
cat > src/pages/Blogs.jsx << 'EOF'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDataFetch } from '../hooks/useDataFetch';
import { BLOG_CATEGORIES } from '../utils/constants';
import { Calendar, Clock, Heart, Eye } from 'lucide-react';
import { containerVariants, itemVariants } from '../utils/animations';

/**
 * Blogs Page - "The Notebooks"
 * Features:
 * - Markdown editor style layout
 * - Category filtering
 * - Blog cards with stats
 */
const Blogs = () => {
  const { data: blogs, loading } = useDataFetch('/api/blogs');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBlogs = blogs
    ? blogs.filter(b => selectedCategory === 'all' || b.category === selectedCategory)
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
            <span className="text-data-blue">/</span>
            The Notebooks
            <span className="text-data-blue">/</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            # Research logs, tutorials, and project documentation
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                selectedCategory === cat.id
                  ? 'bg-data-blue/20 text-data-blue border-2 border-data-blue'
                  : 'bg-gray-800 text-gray-400 hover:text-data-blue'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-lg overflow-hidden border border-data-blue/20 hover:border-data-blue/50 transition-all group"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matrix-black via-transparent to-transparent" />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <h3 className="text-xl font-mono font-semibold text-data-blue mb-3 group-hover:text-neural-violet transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{blog.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-neural-violet/10 border border-neural-violet/30 rounded text-xs font-mono text-neural-violet"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart size={14} className="text-neural-violet" />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{blog.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-gray-500">No blogs found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
EOF

echo "✅ Created Members and Blogs pages"
