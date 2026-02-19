import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Terminal from './components/common/Terminal';

// Lazy Loaded Pages (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const Members = lazy(() => import('./pages/Members'));
const Blogs = lazy(() => import('./pages/Blogs'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-deep-obsidian">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-2 border-data-blue border-t-transparent rounded-full animate-spin" />
      <div className="font-mono text-data-blue text-sm animate-pulse">Loading modules...</div>
    </div>
  </div>
);

/**
 * Main App Component
 * 
 * Features:
 * - React Router for navigation
 * - Persistent layout (Navbar, Footer, Terminal)
 * - Page transitions with Framer Motion
 * - Global grid background
 * 
 * Route Structure:
 * / - Home (Input Layer)
 * /projects - Projects (Model Zoo)
 * /members - Members (Neural Network)
 */
function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-deep-obsidian text-gray-100">
        {/* Global Background Grid */}
        <div className="fixed inset-0 grid-background pointer-events-none" />

        {/* Main Layout */}
        <div className="relative z-10">
          {/* Navbar - Fixed at top */}
          <Navbar />

          {/* Main Content */}
          <main className="pt-16">
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/members" element={<Members />} />
                  <Route path="/blogs" element={<Blogs />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer />

          {/* Terminal Command Palette (Ctrl+K) */}
          <Terminal />
        </div>

        {/* Corner Accent Elements */}
        <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-data-blue/20 pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-neural-violet/20 pointer-events-none" />
      </div>
    </Router>
  );
}

export default App;
