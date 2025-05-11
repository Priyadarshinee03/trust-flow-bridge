
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems?.length || 0;

  const getDashboardLink = () => {
    if (user?.role === 'buyer') return '/buyer/dashboard';
    if (user?.role === 'seller') return '/seller/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="bg-background border-b border-border py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold text-foreground">
            TrustFlow
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/how-it-works" className="text-foreground hover:text-primary">
            How It Works
          </Link>
          <Link to="/pricing" className="text-foreground hover:text-primary">
            Pricing
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated && user?.role === 'buyer' && (
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to={getDashboardLink()}>Dashboard</Link>
              </Button>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
