
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "1.9%",
      description: "Perfect for occasional transactions",
      features: [
        "Fee: 1.9% (min $5)",
        "Basic dispute resolution",
        "3-day payment processing",
        "Email support"
      ],
      popular: false,
      buttonText: "Get Started"
    },
    {
      name: "Standard",
      price: "1.5%",
      description: "Best for regular online sellers",
      features: [
        "Fee: 1.5% (min $4)",
        "Priority dispute resolution",
        "2-day payment processing",
        "Phone & email support",
        "Transaction dashboard"
      ],
      popular: true,
      buttonText: "Choose Standard"
    },
    {
      name: "Premium",
      price: "1.0%",
      description: "For high-volume businesses",
      features: [
        "Fee: 1.0% (min $3)",
        "Same-day dispute handling",
        "1-day payment processing",
        "Dedicated support agent",
        "Advanced analytics",
        "Custom branding"
      ],
      popular: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section className="py-16" id="pricing">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No hidden fees. Only pay when you complete a transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl border ${
                plan.popular 
                  ? "border-escrow-blue shadow-lg" 
                  : "border-gray-200 shadow-sm"
              } bg-white overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 w-full text-center py-1.5 bg-escrow-blue text-white text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600"> per transaction</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-escrow-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-escrow-blue hover:bg-escrow-blue/90" 
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need a custom solution? <a href="/contact" className="text-escrow-blue font-medium underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
