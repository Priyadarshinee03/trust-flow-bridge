
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Truck, Package, DollarSign } from "lucide-react";

// Mock order for demonstration
const mockOrder = {
  id: "",
  date: new Date().toISOString().split('T')[0],
  status: "in-escrow",
  items: [
    { 
      id: '1', 
      name: 'Wireless Earbuds',
      price: 89.99,
      quantity: 1,
      seller: 'TechStore'
    }
  ],
  total: 94.49, // Including escrow fee
  shippingAddress: "123 Main St, New York, NY 10001, United States",
  trackingNumber: "TF28374659"
};

const OrderTrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState({...mockOrder, id: id || ""});
  const [loading, setLoading] = useState(false);
  
  const confirmDelivery = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setOrder({...order, status: "completed"});
      toast({
        title: "Delivery confirmed",
        description: "Funds have been released to the seller. Thank you for your purchase!",
      });
      setLoading(false);
    }, 1500);
  };

  const getStatusSteps = () => {
    const steps = [
      { 
        label: "Payment Secured", 
        description: "Your payment is held in escrow", 
        icon: <DollarSign className="h-8 w-8" />,
        completed: true 
      },
      { 
        label: "Order Processed", 
        description: "Seller has been notified", 
        icon: <Package className="h-8 w-8" />,
        completed: order.status !== "in-escrow" 
      },
      { 
        label: "In Transit", 
        description: "Your order is on its way", 
        icon: <Truck className="h-8 w-8" />,
        completed: order.status === "delivered" || order.status === "completed" 
      },
      { 
        label: "Delivered", 
        description: "Order completed successfully", 
        icon: <CheckCircle className="h-8 w-8" />,
        completed: order.status === "completed" 
      }
    ];
    
    return steps;
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "in-escrow":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">In Escrow</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Delivered</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  useEffect(() => {
    // In a real app, fetch order data based on ID
    if (id) {
      // For demo purposes, randomly set status based on the order ID
      const statuses = ["in-escrow", "delivered", "completed"];
      const randomStatus = id.charCodeAt(0) % 3;
      setOrder({...mockOrder, id, status: statuses[randomStatus]});
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Order Tracking</h1>
              <p className="text-muted-foreground">Order #{order.id}</p>
            </div>
            {getStatusBadge(order.status)}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Order Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {getStatusSteps().map((step, index) => (
                      <div key={index} className="flex mb-8 last:mb-0">
                        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${
                          step.completed 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                        }`}>
                          {step.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">{step.label}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Items</h3>
                    <div className="mt-2 space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <span className="font-medium">{item.name}</span> × {item.quantity}
                            <div className="text-sm text-muted-foreground">
                              Sold by: {item.seller}
                            </div>
                          </div>
                          <div>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Shipping Address</h3>
                    <p className="mt-1">{order.shippingAddress}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Tracking Information</h3>
                    <p className="mt-1">Tracking Number: {order.trackingNumber}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span>{getStatusBadge(order.status)}</span>
                  </div>
                  
                  {order.status === "delivered" && (
                    <Button 
                      className="w-full mt-4"
                      onClick={confirmDelivery}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Confirm Receipt of Product"}
                    </Button>
                  )}
                  
                  {order.status === "completed" && (
                    <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 p-3 rounded text-center mt-4">
                      You have confirmed receipt of this order. Funds have been released to the seller.
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => navigate('/buyer/dashboard')}
                  >
                    Return to Dashboard
                  </Button>
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

export default OrderTrackingPage;
