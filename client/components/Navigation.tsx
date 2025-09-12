import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/work', label: 'Work' },
    { path: '/news', label: 'News' },
    { path: '/about', label: 'About' },
    { path: '/capabilities', label: 'Capabilities' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-[0.7vw] left-[0.7vw] right-[0.7vw] h-[60px] z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/90 backdrop-blur-md border-2 border-cream' : ''
      }`}
    >
      <nav className="flex items-center justify-between h-full px-[0.7vw]">
        {/* Logo */}
        <Link
          to="/"
          className="font-title text-cream text-2xl md:text-3xl tracking-wider hover:text-red transition-colors duration-300"
        >
          NARWHAL
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-[2.8vw]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-copy uppercase text-sm font-semibold tracking-wider transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-red'
                  : 'text-cream hover:text-red'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cream hover:text-red transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[60px] left-0 right-0 bg-dark border-t-2 border-cream transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`font-copy uppercase text-lg font-semibold tracking-wider transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-red'
                  : 'text-cream hover:text-red'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
