
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

// Mock data for products
const mockProducts = [
  { 
    id: '1', 
    name: 'Wireless Earbuds', 
    price: 89.99, 
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'High-quality wireless earbuds with noise cancellation'
  },
  { 
    id: '2', 
    name: 'Smart Watch', 
    price: 199.99, 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'Advanced smartwatch with health tracking features'
  },
  { 
    id: '3', 
    name: 'Bluetooth Speaker', 
    price: 129.99, 
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    description: 'Portable bluetooth speaker with 20 hours battery life'
  }
];

// Mock data for escrow transactions
const mockTransactions = [
  { 
    id: '101', 
    productName: 'Wireless Earbuds', 
    seller: 'TechStore', 
    amount: 89.99, 
    status: 'in-escrow', 
    date: '2023-05-15',
    trackingNumber: 'TF28374659'
  },
  { 
    id: '102', 
    productName: 'Smart Watch', 
    seller: 'GadgetZone', 
    amount: 199.99, 
    status: 'delivered', 
    date: '2023-05-10',
    trackingNumber: 'TF65748392'
  },
  { 
    id: '103', 
    productName: 'Bluetooth Speaker', 
    seller: 'AudioHub', 
    amount: 129.99, 
    status: 'completed', 
    date: '2023-05-01',
    trackingNumber: 'TF12983745'
  }
];

const BuyerDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(mockTransactions);

  useEffect(() => {
    if (!isAuthenticated || (user && user.role !== 'buyer')) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const confirmDelivery = (transactionId: string) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { ...t, status: 'completed' } 
        : t
    ));
    
    toast({
      title: "Delivery confirmed",
      description: "Funds have been released to the seller. Thank you for your purchase!",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'in-escrow':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">In Escrow</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Delivered</Badge>;
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
              <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <Button variant="outline" onClick={() => logout()}>Logout</Button>
          </div>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="transactions">My Transactions</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <div className="grid gap-6">
                <h2 className="text-2xl font-semibold">Your Escrow Transactions</h2>
                
                {transactions.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <p>You don't have any transactions yet.</p>
                      <Button asChild className="mt-4">
                        <Link to="/marketplace">Browse Products</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {transactions.map((transaction) => (
                      <Card key={transaction.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{transaction.productName}</CardTitle>
                              <CardDescription>
                                Purchased from {transaction.seller} on {transaction.date}
                              </CardDescription>
                            </div>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="font-medium">Amount: ${transaction.amount.toFixed(2)}</p>
                            <p className="text-sm">Tracking Number: {transaction.trackingNumber}</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          {transaction.status === 'in-escrow' ? (
                            <div className="text-sm text-muted-foreground">
                              Payment is held in escrow until delivery. Tracking #{transaction.trackingNumber}
                            </div>
                          ) : transaction.status === 'delivered' ? (
                            <div className="flex flex-col w-full space-y-2">
                              <Button 
                                onClick={() => confirmDelivery(transaction.id)}
                              >
                                Confirm Receipt & Release Funds
                              </Button>
                              <p className="text-xs text-muted-foreground text-center">
                                By confirming receipt, you're authorizing the release of funds to the seller
                              </p>
                            </div>
                          ) : (
                            <div className="text-sm text-green-600 dark:text-green-400">
                              Transaction completed successfully
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="marketplace">
              <div className="grid gap-6">
                <h2 className="text-2xl font-semibold">Available Products</h2>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {mockProducts.map((product) => (
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
                      <CardContent>
                        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link to={`/product/${product.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
