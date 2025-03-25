
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { ShoppingCartIcon, HeartIcon, MenuIcon, XIcon } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const { cartCount } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-lg font-semibold tracking-tight hover:text-primary transition-colors"
          >
            ElegantStore
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/wishlist"
              className={`text-sm transition-colors hover:text-primary ${
                location.pathname === '/wishlist' ? 'text-primary font-medium' : 'text-foreground'
              }`}
            >
              Wishlist
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center">
            <Link
              to="/wishlist"
              className="p-2 rounded-full text-foreground hover:bg-secondary transition-colors relative"
              aria-label="Wishlist"
            >
              <HeartIcon size={20} />
            </Link>
            
            <Link
              to="/cart"
              className="p-2 rounded-full text-foreground hover:bg-secondary transition-colors relative ml-2"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-scale-in">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="ml-4 md:hidden p-2 rounded-full text-foreground hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-16 inset-x-0 bg-white border-b border-border shadow-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
          <Link
            to="/"
            className={`text-sm py-2 transition-colors ${
              location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/wishlist"
            className={`text-sm py-2 transition-colors ${
              location.pathname === '/wishlist' ? 'text-primary font-medium' : 'text-foreground'
            }`}
          >
            Wishlist
          </Link>
          <Link
            to="/cart"
            className={`text-sm py-2 transition-colors ${
              location.pathname === '/cart' ? 'text-primary font-medium' : 'text-foreground'
            }`}
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
