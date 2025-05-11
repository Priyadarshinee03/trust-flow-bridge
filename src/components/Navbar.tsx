
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, Package, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-escrow-blue rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-bold text-xl">TrustFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
            How It Works
          </Link>
          <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {user?.role === 'buyer' && (
                <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                  <Link to="/buyer/dashboard">
                    <ShoppingCart className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              )}
              
              {user?.role === 'seller' && (
                <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                  <Link to="/seller/dashboard">
                    <Package className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              )}
              
              {user?.role === 'admin' && (
                <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                  <Link to="/admin/dashboard">
                    <User className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
              
              <Button 
                variant="default" 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="default" onClick={() => navigate('/login')}>Get Started</Button>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden container py-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'buyer' && (
                  <Link 
                    to="/buyer/dashboard"
                    className="text-sm font-medium transition-colors hover:text-primary flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buyer Dashboard
                  </Link>
                )}
                
                {user?.role === 'seller' && (
                  <Link 
                    to="/seller/dashboard"
                    className="text-sm font-medium transition-colors hover:text-primary flex items-center"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Seller Dashboard
                  </Link>
                )}
                
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard"
                    className="text-sm font-medium transition-colors hover:text-primary flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Link>
                )}
                
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    navigate('/');
                    setIsOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
              >
                Get Started
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
