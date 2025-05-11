
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import { Check, ArrowRight } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">How TrustFlow Works</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our escrow payment system creates a safe environment for online transactions,
                protecting both buyers and sellers throughout the process.
              </p>
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Detailed Process</h2>
              
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-xl mb-4">For Buyers</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-blue mr-2 mt-0.5" />
                          <span>Protection from fraudulent sellers</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-blue mr-2 mt-0.5" />
                          <span>Money only released after approval</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-blue mr-2 mt-0.5" />
                          <span>Secure payment handling</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-blue mr-2 mt-0.5" />
                          <span>Clear transaction timeline</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-xl mb-4">For Sellers</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-green mr-2 mt-0.5" />
                          <span>Guaranteed payment for delivery</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-green mr-2 mt-0.5" />
                          <span>Reduced order cancellations</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-green mr-2 mt-0.5" />
                          <span>Professional transaction handling</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-escrow-green mr-2 mt-0.5" />
                          <span>Built-in dispute resolution</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-xl mb-4">TrustFlow Guarantee</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                          <span>Secure payment processing</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                          <span>Fair dispute resolution</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                          <span>Transparent communication</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                          <span>Full transaction documentation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-xl mb-4">Dispute Resolution Process</h3>
                  <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                    <li className="ml-6">
                      <div className="absolute w-4 h-4 bg-escrow-blue rounded-full mt-1.5 -left-2 border border-white flex items-center justify-center text-white text-xs">
                        1
                      </div>
                      <div className="ml-2">
                        <h4 className="font-semibold mb-1">Report an Issue</h4>
                        <p className="text-gray-600">Either party can initiate a dispute through the transaction dashboard.</p>
                      </div>
                    </li>
                    <li className="ml-6">
                      <div className="absolute w-4 h-4 bg-escrow-blue rounded-full mt-1.5 -left-2 border border-white flex items-center justify-center text-white text-xs">
                        2
                      </div>
                      <div className="ml-2">
                        <h4 className="font-semibold mb-1">Submit Evidence</h4>
                        <p className="text-gray-600">Both parties can upload messages, photos, receipts, or other documentation.</p>
                      </div>
                    </li>
                    <li className="ml-6">
                      <div className="absolute w-4 h-4 bg-escrow-blue rounded-full mt-1.5 -left-2 border border-white flex items-center justify-center text-white text-xs">
                        3
                      </div>
                      <div className="ml-2">
                        <h4 className="font-semibold mb-1">Review Process</h4>
                        <p className="text-gray-600">Our team carefully reviews all evidence and may contact both parties for more information.</p>
                      </div>
                    </li>
                    <li className="ml-6">
                      <div className="absolute w-4 h-4 bg-escrow-blue rounded-full mt-1.5 -left-2 border border-white flex items-center justify-center text-white text-xs">
                        4
                      </div>
                      <div className="ml-2">
                        <h4 className="font-semibold mb-1">Resolution & Decision</h4>
                        <p className="text-gray-600">A fair decision is made based on the evidence, and funds are released accordingly.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
