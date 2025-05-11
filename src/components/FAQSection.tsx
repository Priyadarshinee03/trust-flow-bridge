
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the escrow payment process work?",
      answer: "Our escrow service acts as a trusted third party that holds the buyer's payment until both parties fulfill their obligations. First, the buyer submits payment to TrustFlow. Then, the seller is notified and delivers the product or service. Once the buyer confirms satisfactory delivery, we release the funds to the seller. This protects both parties throughout the transaction."
    },
    {
      question: "What happens if there's a dispute?",
      answer: "If a dispute arises, both parties can submit evidence through our platform. Our dispute resolution team will review the case and make a fair decision based on the evidence provided. We may request additional information if needed. Our goal is to resolve disputes quickly and fairly for both parties."
    },
    {
      question: "How much does TrustFlow charge?",
      answer: "Our fees range from 1.0% to 1.9% of the transaction amount, depending on your plan, with minimum charges starting at $3. The fee is only charged when a transaction is completed successfully. There are no monthly fees or charges for creating an account."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use bank-level encryption to protect all sensitive data. We never store your full payment details on our servers. Additionally, all transactions are monitored for fraud, and we comply with PCI DSS (Payment Card Industry Data Security Standards)."
    },
    {
      question: "How long does it take to receive payment as a seller?",
      answer: "After the buyer confirms receipt and approves the release of funds, payments are processed within 1-3 business days, depending on your plan level. Premium users enjoy the fastest payment processing times."
    },
    {
      question: "Can I use TrustFlow for international transactions?",
      answer: "Yes, TrustFlow supports international transactions in multiple currencies. However, please be aware that international transfers may incur additional bank fees and can take longer to process depending on the countries involved."
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our escrow service.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Still have questions? <a href="/contact" className="text-escrow-blue font-medium underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
