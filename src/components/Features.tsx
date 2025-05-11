
import { Shield, ThumbsUp, AlertTriangle, MessageSquare } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Secure Payments",
      description: "Your money is held safely in escrow until you confirm the delivery is satisfactory."
    },
    {
      icon: <ThumbsUp className="h-10 w-10" />,
      title: "Trusted Transactions",
      description: "Build confidence between buyers and sellers with our protected payment system."
    },
    {
      icon: <AlertTriangle className="h-10 w-10" />,
      title: "Dispute Resolution",
      description: "If things go wrong, our team will help resolve disputes fairly for both parties."
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Real-time Updates",
      description: "Stay informed with notifications at every step of the transaction process."
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Choose TrustFlow</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our escrow system provides security and peace of mind for all your online transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-block p-3 rounded-lg bg-blue-50 text-escrow-blue mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
