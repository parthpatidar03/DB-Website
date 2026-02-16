import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Terminal from './components/common/Terminal';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Members from './pages/Members';
import Blogs from './pages/Blogs';

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
 * /blogs - Blogs (Notebooks)
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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/members" element={<Members />} />
                <Route path="/blogs" element={<Blogs />} />
              </Routes>
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
