import { motion } from 'framer-motion';
import { cardHoverVariants } from '../../utils/animations';
import { ExternalLink, Calendar, Clock } from 'lucide-react';

const BlogCard = ({ blog }) => {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="group relative bg-matrix-black border border-data-blue/20 rounded-lg overflow-hidden h-full flex flex-col"
    >
      {/* Blog Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-matrix-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center space-x-4 mb-3 text-xs font-mono text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-data-blue transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
          {blog.description}
        </p>

        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-data-blue hover:text-terminal-green transition-colors font-mono text-sm"
        >
          <span>Read on Medium</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
};

export default BlogCard;
