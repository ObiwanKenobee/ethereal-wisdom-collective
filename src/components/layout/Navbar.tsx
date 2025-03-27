
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'AI Chat', path: '/consciousness' },
  { name: 'Knowledge', path: '/knowledge' },
  { name: 'Meditation', path: '/meditation' },
  { name: 'Art & Music', path: '/create' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-panel py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 bg-celestial-purple/20 rounded-full animate-pulse-glow"></div>
            <div className="absolute inset-1 border border-celestial-purple/40 rounded-full animate-rotate-slow"></div>
            <div className="absolute inset-3 bg-celestial-purple rounded-full"></div>
          </div>
          <span className="text-xl font-bold tracking-tight transition-all duration-300 group-hover:text-celestial-gold">
            <span className="text-celestial-purple">G</span>CI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="nav-link">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`glass-panel absolute top-full left-0 right-0 md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-white/80 hover:text-white py-2 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
