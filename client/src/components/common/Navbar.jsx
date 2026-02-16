import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { NAV_LINKS, SYSTEM_METRICS } from '../../utils/constants';

/**
 * Navbar Component - "The Header Array"
 * Features:
 * - File system inspired navigation
 * - System metrics ticker (EPOCH, ACCURACY, LOSS)
 * - Breadcrumb path display
 * - Logo that expands on hover
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState(SYSTEM_METRICS);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Simulate live metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        epoch: prev.epoch + 1,
        accuracy: Math.min(0.999, prev.accuracy + 0.001),
        loss: Math.max(0.001, prev.loss - 0.001),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get current path for breadcrumb
  const getBreadcrumb = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.length > 0 ? `root > ${paths.join(' > ')}` : 'root > home';
  };

  // Render navigation link with notation
  const renderNavLink = (link) => {
    const isActive = location.pathname === link.path;
    
    let notation = '';
    if (link.notation === 'bracket') notation = '[]';
    if (link.notation === 'curly') notation = '{}';
    if (link.notation === 'slash') notation = '//';

    return (
      <Link
        key={link.id}
        to={link.path}
        className={`relative px-4 py-2 font-mono text-sm transition-all duration-300 ${
          isActive
            ? 'text-data-blue'
            : 'text-gray-400 hover:text-data-blue'
        }`}
      >
        <span className="mr-2 text-xs text-gray-600">{link.id}.</span>
        {notation[0] && <span className="text-data-blue">{notation[0]}</span>}
        {link.label}
        {notation[1] && <span className="text-data-blue">{notation[1]}</span>}
        
        {/* Active indicator line */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-data-blue to-neural-violet"
            layoutId="activeNav"
            initial={false}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-matrix-black/95 backdrop-blur-lg border-b border-data-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - The Origin */}
          <Link
            to="/"
            className="relative font-mono font-bold text-xl overflow-hidden"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <motion.span
              className="text-data-blue"
              animate={{ width: isExpanded ? 'auto' : '40px' }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? '[DataByte]' : 'DB_'}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map(renderNavLink)}
          </div>

          {/* System Metrics Ticker */}
          <div className="hidden lg:flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">EPOCH:</span>
              <span className="text-data-blue font-semibold">{metrics.epoch.toString().padStart(3, '0')}</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">ACCURACY:</span>
              <span className="text-terminal-green font-semibold">{metrics.accuracy.toFixed(3)}</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">LOSS:</span>
              <span className="text-neural-violet font-semibold">{metrics.loss.toFixed(3)}</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">STATUS:</span>
              <span className="text-data-blue font-semibold">{metrics.status}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-data-blue transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center py-2 text-xs font-mono text-gray-500 border-t border-gray-800">
          <Terminal size={14} className="mr-2 text-terminal-green" />
          <span>{getBreadcrumb()}</span>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-matrix-black border-t border-data-blue/20"
        >
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map(link => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md font-mono text-sm transition-colors ${
                  location.pathname === link.path
                    ? 'bg-data-blue/10 text-data-blue'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-data-blue'
                }`}
              >
                <span className="mr-2 text-xs">{link.id}.</span>
                {link.label}
              </Link>
            ))}
            
            {/* Mobile System Metrics */}
            <div className="pt-4 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-gray-900 p-2 rounded">
                  <div className="text-gray-500">EPOCH</div>
                  <div className="text-data-blue font-semibold">{metrics.epoch}</div>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <div className="text-gray-500">ACCURACY</div>
                  <div className="text-terminal-green font-semibold">{metrics.accuracy.toFixed(3)}</div>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <div className="text-gray-500">LOSS</div>
                  <div className="text-neural-violet font-semibold">{metrics.loss.toFixed(3)}</div>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <div className="text-gray-500">STATUS</div>
                  <div className="text-data-blue font-semibold">{metrics.status}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
