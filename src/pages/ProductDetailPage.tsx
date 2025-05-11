import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock product data
const mockProducts = {
  '1': { 
    id: '1', 
    name: 'Wireless Earbuds', 
    price: 89.99, 
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'High-quality wireless earbuds with noise cancellation',
    seller: 'TechStore',
    rating: 4.5,
    reviews: 128,
    fullDescription: `
      Experience crystal-clear sound and immersive audio with these premium wireless earbuds. 
      Key features include:
      
      • Active noise cancellation technology
      • 8-hour battery life with additional 24 hours from the charging case
      • Touch controls for easy operation
      • Water and sweat resistant (IPX5 rating)
      • Bluetooth 5.2 connectivity
      • Available in black, white, and navy blue
      
      The ergonomic design ensures a comfortable fit for extended wear, while the premium 
      drivers deliver rich bass and crisp highs. Perfect for workouts, commuting, or everyday use.
    `
  },
  '2': { 
    id: '2', 
    name: 'Smart Watch', 
    price: 199.99, 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'Advanced smartwatch with health tracking features',
    seller: 'GadgetZone',
    rating: 4.7,
    reviews: 256,
    fullDescription: `
      Stay connected and monitor your health with this state-of-the-art smartwatch.
      Key features include:
      
      • High-resolution AMOLED display
      • Heart rate, SpO2, and sleep monitoring
      • GPS tracking for outdoor activities
      • 50+ workout modes
      • Water resistant up to 50 meters
      • 7-day battery life on a single charge
      • Notification support for calls, messages, and apps
      
      The lightweight aluminum casing and comfortable silicone band make it perfect for 
      all-day wear. Track your fitness goals, monitor your health metrics, and stay connected 
      with this versatile smartwatch.
    `
  },
  '3': { 
    id: '3', 
    name: 'Bluetooth Speaker', 
    price: 129.99, 
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'Portable bluetooth speaker with 20 hours battery life',
    seller: 'AudioHub',
    rating: 4.3,
    reviews: 89,
    fullDescription: `
      Fill any space with rich, immersive sound from this portable Bluetooth speaker.
      Key features include:
      
      • Powerful 360° sound with deep bass
      • 20-hour battery life
      • IPX7 waterproof rating
      • Built-in microphone for calls
      • Wireless stereo pairing with a second speaker
      • Durable fabric covering and rugged design
      • Compact size for easy portability
      
      Perfect for outdoor adventures, beach trips, or home use. The speaker connects 
      easily to any Bluetooth-enabled device and remembers up to 8 paired devices for 
      quick connections.
    `
  }
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get product data based on ID
  const product = id ? mockProducts[id as keyof typeof mockProducts] : null;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
              <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
              <Button onClick={() => navigate('/')}>Return to Home</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in as a buyer to make purchases.",
      });
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'buyer') {
      toast({
        title: "Access denied",
        description: "Only buyer accounts can make purchases.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Payment successful",
        description: `Your payment of $${product.price.toFixed(2)} has been securely held in escrow. The seller will be notified to ship your item.`,
      });
      setIsLoading(false);
      navigate('/buyer/dashboard');
    }, 1500);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in as a buyer to add items to cart.",
      });
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'buyer') {
      toast({
        title: "Access denied",
        description: "Only buyer accounts can add items to cart.",
        variant: "destructive"
      });
      return;
    }

    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-cover" 
              />
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {/* Star rating */}
                    <div className="flex mr-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-b py-4">
                <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground mt-1">Sold by: {product.seller}</div>
              </div>
              
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{product.fullDescription}</p>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Buy Now with Escrow Protection"}
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
              
              <Card className="mt-6 bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-900">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="bg-escrow-blue rounded-full p-1 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">TrustFlow Escrow Protection</h4>
                      <p className="text-sm">
                        Your payment is securely held until you confirm receipt of your item. 
                        If there's a problem, our dispute resolution team will help.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
