
import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main 
        className={cn(
          "flex-1",
          location.pathname === "/" && "bg-gradient-to-b from-white to-secondary"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
