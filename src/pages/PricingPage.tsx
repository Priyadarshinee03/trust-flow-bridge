
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PricingPage = () => {
  const featureComparison = [
    {
      feature: "Transaction Fee",
      basic: "1.9% (min $5)",
      standard: "1.5% (min $4)",
      premium: "1.0% (min $3)",
      tooltip: "Percentage of the total transaction amount"
    },
    {
      feature: "Payment Processing Time",
      basic: "3 business days",
      standard: "2 business days",
      premium: "1 business day",
      tooltip: "Time it takes for funds to be available after release"
    },
    {
      feature: "Dispute Resolution",
      basic: "Standard",
      standard: "Priority",
      premium: "Same-day",
      tooltip: "How quickly we process disputes"
    },
    {
      feature: "Customer Support",
      basic: "Email only",
      standard: "Email & Phone",
      premium: "Dedicated Agent",
      tooltip: "Available support channels"
    },
    {
      feature: "Transaction Dashboard",
      basic: false,
      standard: true,
      premium: true,
      tooltip: "View and manage all your transactions in one place"
    },
    {
      feature: "Transaction History",
      basic: "30 days",
      standard: "1 year",
      premium: "Unlimited",
      tooltip: "How long we store your transaction records"
    },
    {
      feature: "International Transactions",
      basic: true,
      standard: true,
      premium: true,
      tooltip: "Ability to send money internationally"
    },
    {
      feature: "Analytics",
      basic: false,
      standard: "Basic",
      premium: "Advanced",
      tooltip: "Transaction statistics and insights"
    },
    {
      feature: "Custom Branding",
      basic: false,
      standard: false,
      premium: true,
      tooltip: "Add your logo and brand colors to transaction pages"
    },
    {
      feature: "API Access",
      basic: false,
      standard: false,
      premium: true,
      tooltip: "Integrate escrow payments with your website or app"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Transparent Pricing</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple, fair pricing with no hidden fees. Only pay when you complete a transaction.
              </p>
            </div>
          </div>
        </section>

        <PricingSection />

        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Compare Plans</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find the plan that best suits your transaction needs
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Feature</TableHead>
                    <TableHead className="w-1/4 text-center">Basic</TableHead>
                    <TableHead className="w-1/4 text-center">Standard</TableHead>
                    <TableHead className="w-1/4 text-center">Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featureComparison.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {item.feature}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0">
                                  <HelpCircle className="h-4 w-4 text-gray-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof item.basic === 'boolean' ? 
                          (item.basic ? 
                            <Check className="h-5 w-5 text-escrow-green mx-auto" /> : 
                            <span className="text-gray-300">—</span>
                          ) : 
                          item.basic
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof item.standard === 'boolean' ? 
                          (item.standard ? 
                            <Check className="h-5 w-5 text-escrow-green mx-auto" /> : 
                            <span className="text-gray-300">—</span>
                          ) : 
                          item.standard
                        }
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof item.premium === 'boolean' ? 
                          (item.premium ? 
                            <Check className="h-5 w-5 text-escrow-green mx-auto" /> : 
                            <span className="text-gray-300">—</span>
                          ) : 
                          item.premium
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
