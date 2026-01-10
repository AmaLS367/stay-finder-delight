import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, MapPin, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/trips', label: 'Trips' },
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <MapPin className="h-6 w-6 text-accent" />
            <span>StayFinder</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground ${
                  location.pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
            
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <button
              className="p-2 hover:bg-muted rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-2 py-3 text-sm font-medium ${
                  location.pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
