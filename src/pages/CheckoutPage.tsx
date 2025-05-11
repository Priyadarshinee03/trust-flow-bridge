
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    address: "",
    city: "",
    zip: "",
    country: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cartItems.length) {
      toast({
        title: "Cart is empty",
        description: "Your cart is empty. Please add items before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate form
    const requiredFields = ['cardName', 'cardNumber', 'cardExpiry', 'cardCvc', 'address', 'city', 'zip', 'country'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Process payment
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      toast({
        title: "Payment successful",
        description: `Your payment has been securely placed in escrow. Order #${orderId} created.`,
      });
      clearCart();
      setIsLoading(false);
      navigate(`/order/tracking/${orderId}`);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                You can't proceed to checkout with an empty cart.
              </p>
              <Button onClick={() => navigate('/buyer/dashboard')}>Browse Products</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Card Details
                        </h3>
                        
                        <div className="grid gap-4">
                          <div>
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input 
                              id="cardName"
                              name="cardName"
                              placeholder="John Smith" 
                              value={formData.cardName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456" 
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="cardExpiry">Expiry Date</Label>
                              <Input 
                                id="cardExpiry"
                                name="cardExpiry"
                                placeholder="MM/YY" 
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardCvc">CVC</Label>
                              <Input 
                                id="cardCvc"
                                name="cardCvc"
                                placeholder="123" 
                                value={formData.cardCvc}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Shipping Address</h3>
                        
                        <div className="grid gap-4">
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Input 
                              id="address"
                              name="address"
                              placeholder="123 Main St" 
                              value={formData.address}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city">City</Label>
                              <Input 
                                id="city"
                                name="city"
                                placeholder="New York" 
                                value={formData.city}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="zip">ZIP / Postal Code</Label>
                              <Input 
                                id="zip"
                                name="zip"
                                placeholder="10001" 
                                value={formData.zip}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <Input 
                              id="country"
                              name="country"
                              placeholder="United States" 
                              value={formData.country}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Escrow Service Fee</span>
                    <span>${(getCartTotal() * 0.05).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.05).toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Complete Payment"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Your payment will be securely held in escrow until you confirm receipt of your items.
                  </p>
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

export default CheckoutPage;
