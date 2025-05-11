
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for seller products
const mockProducts = [
  { 
    id: '101', 
    name: 'Premium Headphones', 
    price: 149.99, 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'High-quality over-ear headphones with noise cancellation',
    stock: 15
  },
  { 
    id: '102', 
    name: 'Mechanical Keyboard', 
    price: 129.99, 
    image: 'https://images.unsplash.com/photo-1595225476474-c377a4769c09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'RGB mechanical keyboard with custom switches',
    stock: 8
  }
];

// Mock data for escrow orders
const mockOrders = [
  { 
    id: '201', 
    productName: 'Premium Headphones', 
    buyer: 'John Smith', 
    amount: 149.99, 
    status: 'pending', 
    date: '2023-05-18',
    escrowTime: '24 hrs ago',
    buyerAddress: '123 Main St, New York, NY 10001, United States'
  },
  { 
    id: '202', 
    productName: 'Mechanical Keyboard', 
    buyer: 'Sarah Johnson', 
    amount: 129.99, 
    status: 'in-escrow', 
    date: '2023-05-16',
    escrowTime: '38 hrs ago',
    buyerAddress: '456 Oak St, Los Angeles, CA 90001, United States'
  },
  { 
    id: '203', 
    productName: 'Premium Headphones', 
    buyer: 'Mike Taylor', 
    amount: 149.99, 
    status: 'completed', 
    date: '2023-05-10',
    escrowTime: '5 days ago',
    buyerAddress: '789 Pine St, Chicago, IL 60007, United States',
    trackingNumber: 'TF12983745',
    paymentReceived: true
  }
];

const SellerDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState(mockOrders);
  const [products, setProducts] = useState(mockProducts);
  const { toast } = useToast();
  
  // Form states
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: ""
  });

  useEffect(() => {
    if (!isAuthenticated || (user && user.role !== 'seller')) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const markAsShipped = (orderId: string) => {
    // Generate a random tracking number
    const trackingNumber = 'TF' + Math.floor(Math.random() * 90000000 + 10000000);
    
    setOrders(orders.map(o => 
      o.id === orderId 
        ? { ...o, status: 'delivered', trackingNumber } 
        : o
    ));
    
    toast({
      title: "Order marked as shipped",
      description: `Order #${orderId} has been shipped with tracking number ${trackingNumber}. The buyer has been notified.`,
    });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.stock) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const price = parseFloat(newProduct.price);
    const stock = parseInt(newProduct.stock);
    
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price.",
        variant: "destructive"
      });
      return;
    }
    
    if (isNaN(stock) || stock < 0) {
      toast({
        title: "Invalid stock",
        description: "Please enter a valid stock amount.",
        variant: "destructive"
      });
      return;
    }
    
    // Add new product
    const newProductEntry = {
      id: Date.now().toString(),
      name: newProduct.name,
      price,
      description: newProduct.description,
      image: newProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
      stock
    };
    
    setProducts([newProductEntry, ...products]);
    setNewProduct({ name: "", price: "", description: "", image: "", stock: "" });
    
    toast({
      title: "Product added",
      description: "Your new product has been added to the marketplace.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Payment Pending</Badge>;
      case 'in-escrow':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">In Escrow</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Shipped</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!isAuthenticated) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Seller Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <Button variant="outline" onClick={() => logout()}>Logout</Button>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="add-product">Add New Product</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="grid gap-6">
                <h2 className="text-2xl font-semibold">Your Orders</h2>
                
                {orders.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <p>You don't have any orders yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>Order #{order.id}</CardTitle>
                              <CardDescription>
                                {order.productName} - Ordered by {order.buyer} on {order.date}
                              </CardDescription>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="font-medium">Amount: ${order.amount.toFixed(2)}</p>
                            {order.status === 'in-escrow' && (
                              <p className="text-sm text-blue-600 dark:text-blue-400">
                                Funds received and held in escrow {order.escrowTime}
                              </p>
                            )}
                            {order.status === 'completed' && order.paymentReceived && (
                              <p className="text-sm text-green-600 dark:text-green-400">
                                Payment has been released to your account
                              </p>
                            )}
                          </div>
                          
                          <div className="border-t pt-3">
                            <p className="font-medium">Shipping Address:</p>
                            <p className="text-sm">{order.buyerAddress}</p>
                          </div>
                          
                          {order.trackingNumber && (
                            <div className="border-t pt-3">
                              <p className="font-medium">Tracking Number:</p>
                              <p className="text-sm">{order.trackingNumber}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          {order.status === 'in-escrow' ? (
                            <Button 
                              onClick={() => markAsShipped(order.id)}
                              className="w-full"
                            >
                              Mark as Shipped & Notify Buyer
                            </Button>
                          ) : order.status === 'pending' ? (
                            <div className="text-sm text-muted-foreground">
                              Waiting for payment to be placed in escrow
                            </div>
                          ) : order.status === 'delivered' ? (
                            <div className="text-sm text-purple-600 dark:text-purple-400">
                              Waiting for buyer to confirm delivery
                            </div>
                          ) : (
                            <div className="text-sm text-green-600 dark:text-green-400">
                              Order completed and payment received
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="grid gap-6">
                <h2 className="text-2xl font-semibold">Your Products</h2>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover" 
                      />
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground">In stock: {product.stock}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Remove</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="add-product">
              <div className="grid gap-6">
                <h2 className="text-2xl font-semibold">Add New Product</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>
                      Enter the details of your new product listing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name*</Label>
                        <Input 
                          id="name" 
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="Enter product name" 
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($)*</Label>
                          <Input 
                            id="price" 
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            placeholder="Enter price" 
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock*</Label>
                          <Input 
                            id="stock" 
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                            placeholder="Enter available quantity" 
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description*</Label>
                        <Textarea 
                          id="description" 
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          placeholder="Enter product description" 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input 
                          id="image" 
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                          placeholder="Enter image URL" 
                        />
                      </div>
                      
                      <Button type="submit" className="mt-4">
                        Add Product
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
