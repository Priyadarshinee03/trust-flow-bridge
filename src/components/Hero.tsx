
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#1E40AF_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 text-center md:text-left mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Secure Online Transactions <br/>
              <span className="text-escrow-blue">Without The Risk</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              TrustFlow's escrow service protects both buyers and sellers by holding funds securely until both parties are satisfied with the transaction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="px-8 py-6 text-lg">
                Create Transaction
              </Button>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="glass-card rounded-xl overflow-hidden shadow-xl transform rotate-1 -mr-10">
              <div className="bg-white p-4">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-escrow-blue rounded-full flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-lg">Transaction #4721</span>
                    </div>
                    <span className="bg-green-50 text-escrow-green px-3 py-1 rounded-full text-sm font-medium">In Progress</span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Product:</span>
                      <span className="font-medium">Custom Artwork</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium">$350.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Seller:</span>
                      <span className="font-medium">ArtisticCreations</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <h4 className="font-semibold mb-2 text-sm">Transaction Timeline</h4>
                    <ol className="relative border-l border-gray-200 ml-3 space-y-3">
                      <li className="ml-6">
                        <div className="absolute w-3 h-3 bg-escrow-blue rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-2">May 10</p>
                          <p className="text-sm">Transaction created</p>
                        </div>
                      </li>
                      <li className="ml-6">
                        <div className="absolute w-3 h-3 bg-escrow-blue rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-2">May 10</p>
                          <p className="text-sm">Payment secured in escrow</p>
                        </div>
                      </li>
                      <li className="ml-6">
                        <div className="absolute w-3 h-3 bg-escrow-green rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-2">May 11</p>
                          <p className="text-sm">Seller notified</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl overflow-hidden shadow-xl absolute -bottom-10 -left-10 transform -rotate-3">
              <div className="bg-white p-3 max-w-xs">
                <div className="flex items-center justify-between mb-3 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-escrow-green rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium text-sm">Payment Released</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 p-1">
                  Funds have been released to the seller. Transaction complete!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
