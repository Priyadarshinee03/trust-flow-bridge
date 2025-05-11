
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

// Mock data for disputes
const mockDisputes = [
  { 
    id: '301', 
    productName: 'Wireless Earbuds',
    buyer: 'John Smith',
    seller: 'TechStore',
    amount: 89.99,
    status: 'open',
    date: '2023-05-19',
    buyerReason: 'Product not as described - missing features',
    sellerResponse: 'All features were clearly listed in the product description'
  },
  { 
    id: '302', 
    productName: 'Smart Watch',
    buyer: 'Sarah Johnson',
    seller: 'GadgetZone',
    amount: 199.99,
    status: 'investigating',
    date: '2023-05-17',
    buyerReason: 'Product never arrived',
    sellerResponse: 'Tracking shows delivery was completed'
  },
  { 
    id: '303', 
    productName: 'Mechanical Keyboard',
    buyer: 'Mike Taylor',
    seller: 'ComputerWorld',
    amount: 129.99,
    status: 'resolved',
    date: '2023-05-12',
    buyerReason: 'Product damaged on arrival',
    sellerResponse: 'Product was properly packaged',
    resolution: 'Partial refund of $50 issued to buyer'
  }
];

// Mock data for all transactions
const mockTransactions = [
  { 
    id: '101', 
    productName: 'Wireless Earbuds', 
    buyer: 'John Smith',
    seller: 'TechStore', 
    amount: 89.99, 
    status: 'in-escrow', 
    date: '2023-05-15',
    escrowFee: 4.50,
    escrowTime: '24 hrs ago'
  },
  { 
    id: '102', 
    productName: 'Smart Watch', 
    buyer: 'Sarah Johnson',
    seller: 'GadgetZone', 
    amount: 199.99, 
    status: 'delivered', 
    date: '2023-05-10',
    escrowFee: 10.00,
    escrowTime: '5 days ago',
    deliveryDate: '2023-05-12'
  },
  { 
    id: '103', 
    productName: 'Bluetooth Speaker', 
    buyer: 'Mike Taylor',
    seller: 'AudioHub', 
    amount: 129.99, 
    status: 'completed', 
    date: '2023-05-01',
    escrowFee: 6.50,
    escrowTime: '2 weeks ago',
    deliveryDate: '2023-05-03',
    completionDate: '2023-05-04'
  },
  { 
    id: '104', 
    productName: 'Premium Headphones', 
    buyer: 'Lisa Brown',
    seller: 'SoundSystemsInc', 
    amount: 149.99, 
    status: 'completed', 
    date: '2023-04-28',
    escrowFee: 7.50,
    escrowTime: '3 weeks ago',
    deliveryDate: '2023-04-30',
    completionDate: '2023-05-01'
  }
];

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState(mockDisputes);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Calculate statistics
  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const activeDisputes = disputes.filter(d => d.status !== 'resolved').length;
  const totalRevenue = transactions.reduce((sum, t) => sum + t.escrowFee, 0);
  const fundsInEscrow = transactions.filter(t => t.status === 'in-escrow').reduce((sum, t) => sum + t.amount, 0);

  useEffect(() => {
    if (!isAuthenticated || (user && user.role !== 'admin')) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const resolveDispute = (disputeId: string, resolution: string) => {
    setDisputes(disputes.map(d => 
      d.id === disputeId 
        ? { ...d, status: 'resolved', resolution } 
        : d
    ));
    
    toast({
      title: "Dispute resolved",
      description: `Dispute #${disputeId} has been resolved. All parties have been notified.`,
    });
  };

  const startInvestigation = (disputeId: string) => {
    setDisputes(disputes.map(d => 
      d.id === disputeId 
        ? { ...d, status: 'investigating' } 
        : d
    ));
    
    toast({
      title: "Investigation started",
      description: `Dispute #${disputeId} is now under investigation.`,
    });
  };

  const releaseFunds = (transactionId: string) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { ...t, status: 'completed', completionDate: new Date().toISOString().split('T')[0] } 
        : t
    ));
    
    toast({
      title: "Funds released",
      description: `Funds for Transaction #${transactionId} have been released to the seller.`,
    });
  };

  const refundBuyer = (transactionId: string) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { ...t, status: 'refunded', completionDate: new Date().toISOString().split('T')[0] } 
        : t
    ));
    
    toast({
      title: "Funds refunded",
      description: `Funds for Transaction #${transactionId} have been refunded to the buyer.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Open</Badge>;
      case 'investigating':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Resolved</Badge>;
      case 'in-escrow':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">In Escrow</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Delivered</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Refunded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(t => 
    t.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.includes(searchTerm)
  );

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
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">System management and oversight</p>
            </div>
            <Button variant="outline" onClick={() => logout()}>Logout</Button>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTransactions}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Funds in Escrow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${fundsInEscrow.toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Disputes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeDisputes}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="escrow" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="escrow">Escrow Management</TabsTrigger>
              <TabsTrigger value="disputes">Disputes</TabsTrigger>
              <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="escrow">
              <div className="grid gap-6">
                <h2 className="text-2xl font-semibold">Escrow Management</h2>
                
                <div className="grid gap-4">
                  {transactions
                    .filter(t => t.status === 'in-escrow' || t.status === 'delivered')
                    .map((transaction) => (
                      <Card key={transaction.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>Transaction #{transaction.id}</CardTitle>
                              <CardDescription>
                                {transaction.productName} - {transaction.date}
                              </CardDescription>
                            </div>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="font-medium">Amount in Escrow: ${transaction.amount.toFixed(2)}</p>
                            <p className="text-sm">Escrow Fee: ${transaction.escrowFee.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">
                              Buyer: {transaction.buyer} | Seller: {transaction.seller}
                            </p>
                          </div>
                          
                          <div className="border-t pt-3">
                            <p className="font-medium">Status Details:</p>
                            <p className="text-sm">
                              {transaction.status === 'in-escrow' 
                                ? `Payment received and held in escrow ${transaction.escrowTime}`
                                : `Product marked as delivered on ${transaction.deliveryDate}, awaiting buyer confirmation`
                              }
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-2">
                          {transaction.status === 'delivered' && (
                            <>
                              <Button 
                                onClick={() => releaseFunds(transaction.id)}
                                className="flex-1"
                              >
                                Release Funds to Seller
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => refundBuyer(transaction.id)}
                                className="flex-1"
                              >
                                Issue Refund to Buyer
                              </Button>
                            </>
                          )}
                          {transaction.status === 'in-escrow' && (
                            <p className="text-sm text-muted-foreground">
                              Waiting for seller to mark as shipped and buyer to confirm delivery
                            </p>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                
                {transactions.filter(t => t.status === 'in-escrow' || t.status === 'delivered').length === 0 && (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <p>There are no active escrow transactions to manage.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="disputes">
              <div className="grid gap-6">
                <h2 className="text-2xl font-semibold">Dispute Management</h2>
                
                {disputes.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <p>There are no disputes to manage.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {disputes.map((dispute) => (
                      <Card key={dispute.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>Dispute #{dispute.id}</CardTitle>
                              <CardDescription>
                                {dispute.productName} - {dispute.date}
                              </CardDescription>
                            </div>
                            {getStatusBadge(dispute.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="font-medium">Amount: ${dispute.amount.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">
                              Buyer: {dispute.buyer} | Seller: {dispute.seller}
                            </p>
                          </div>
                          
                          <div className="border-t pt-3">
                            <p className="font-medium">Buyer's Claim:</p>
                            <p className="text-sm">{dispute.buyerReason}</p>
                          </div>
                          
                          <div className="border-t pt-3">
                            <p className="font-medium">Seller's Response:</p>
                            <p className="text-sm">{dispute.sellerResponse}</p>
                          </div>
                          
                          {dispute.resolution && (
                            <div className="border-t pt-3">
                              <p className="font-medium">Resolution:</p>
                              <p className="text-sm">{dispute.resolution}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex-col items-start space-y-3">
                          {dispute.status === 'open' && (
                            <div className="flex flex-col w-full space-y-2">
                              <Button 
                                onClick={() => startInvestigation(dispute.id)}
                                className="w-full"
                              >
                                Start Investigation
                              </Button>
                            </div>
                          )}
                          
                          {dispute.status === 'investigating' && (
                            <div className="flex flex-col w-full space-y-2">
                              <Button 
                                onClick={() => resolveDispute(dispute.id, 'Full refund issued to buyer')}
                                variant="default"
                                className="w-full"
                              >
                                Resolve in Buyer's Favor
                              </Button>
                              <Button 
                                onClick={() => resolveDispute(dispute.id, 'Funds released to seller')}
                                variant="outline"
                                className="w-full"
                              >
                                Resolve in Seller's Favor
                              </Button>
                              <Button 
                                onClick={() => resolveDispute(dispute.id, 'Partial refund of 50% issued to buyer')}
                                variant="secondary"
                                className="w-full"
                              >
                                Partial Refund
                              </Button>
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <div className="grid gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Transaction History</h2>
                  <div className="w-full md:w-1/3">
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Product</th>
                        <th className="text-left p-2">Buyer</th>
                        <th className="text-left p-2">Seller</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Fee</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b">
                          <td className="p-2">{transaction.id}</td>
                          <td className="p-2">{transaction.productName}</td>
                          <td className="p-2">{transaction.buyer}</td>
                          <td className="p-2">{transaction.seller}</td>
                          <td className="p-2">${transaction.amount.toFixed(2)}</td>
                          <td className="p-2">${transaction.escrowFee.toFixed(2)}</td>
                          <td className="p-2">{transaction.date}</td>
                          <td className="p-2">{getStatusBadge(transaction.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-4">
                    <p>No matching transactions found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
