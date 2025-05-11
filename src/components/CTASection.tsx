
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-escrow-blue text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Trade with Confidence?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of buyers and sellers who use TrustFlow to secure their online transactions.
            Our escrow payment system ensures both parties are protected throughout the entire process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-white text-escrow-blue hover:bg-gray-100 transition px-8"
            >
              Create a Transaction
            </Button>
            <Link to="/how-it-works">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 transition px-8"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
