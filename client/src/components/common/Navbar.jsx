import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { NAV_LINKS, SYSTEM_METRICS } from "../../utils/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState(SYSTEM_METRICS);
  const location = useLocation();

  // Simulate live metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        epoch: prev.epoch + 1,
        accuracy: Math.min(0.999, prev.accuracy + 0.001),
        loss: Math.max(0.001, prev.loss - 0.001),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBreadcrumb = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.length > 0 ? `root > ${paths.join(" > ")}` : "root > home";
  };

  const renderNavLink = (link) => {
    const isActive = location.pathname === link.path;

    let notation = "";
    if (link.notation === "bracket") notation = "[]";
    if (link.notation === "curly") notation = "{}";
    if (link.notation === "slash") notation = "//";

    return (
      <Link
        key={link.id}
        to={link.path}
        className={`relative px-3 py-2 font-mono text-sm transition-all duration-300 ${
          isActive
            ? "text-data-blue font-semibold"
            : "text-gray-400 hover:text-data-blue"
        }`}
      >
        <span className="mr-2 text-xs text-gray-600">{link.id}.</span>

        {notation[0] && <span className="text-data-blue">{notation[0]}</span>}
        {link.label}
        {notation[1] && <span className="text-data-blue">{notation[1]}</span>}

        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-data-blue to-neural-violet"
            layoutId="activeNav"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-matrix-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16">
        {/*Logo */}
          <Link to="/" className="select-none">
            <span className="font-extrabold text-2xl tracking-tight">
              <span className="text-white">d</span>
              <span className="text-gray-300">B</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(renderNavLink)}
          </div>

          {/* System Metrics */}
          <div className="hidden lg:flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">EPOCH:</span>
              <span className="text-data-blue font-semibold">
                {metrics.epoch.toString().padStart(3, "0")}
              </span>
            </div>

            <div className="w-px h-4 bg-gray-700" />

            <div className="flex items-center space-x-2">
              <span className="text-gray-500">ACC:</span>
              <span className="text-terminal-green font-semibold">
                {metrics.accuracy.toFixed(3)}
              </span>
            </div>

            <div className="w-px h-4 bg-gray-700" />

            <div className="flex items-center space-x-2">
              <span className="text-gray-500">LOSS:</span>
              <span className="text-neural-violet font-semibold">
                {metrics.loss.toFixed(3)}
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-matrix-black border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-md font-mono text-sm transition-colors ${
                    location.pathname === link.path
                      ? "bg-data-blue/10 text-data-blue font-semibold"
                      : "text-gray-400 hover:bg-gray-800 hover:text-data-blue"
                  }`}
                >
                  <span className="mr-2 text-xs">{link.id}.</span>
                  {link.label}
                </Link>
              ))}

              {/* Mobile Metrics */}
              <div className="pt-4 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-gray-900 p-2 rounded">
                    <div className="text-gray-500">EPOCH</div>
                    <div className="text-data-blue font-semibold">
                      {metrics.epoch}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-2 rounded">
                    <div className="text-gray-500">ACCURACY</div>
                    <div className="text-terminal-green font-semibold">
                      {metrics.accuracy.toFixed(3)}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-2 rounded">
                    <div className="text-gray-500">LOSS</div>
                    <div className="text-neural-violet font-semibold">
                      {metrics.loss.toFixed(3)}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-2 rounded">
                    <div className="text-gray-500">STATUS</div>
                    <div className="text-data-blue font-semibold">
                      {metrics.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
