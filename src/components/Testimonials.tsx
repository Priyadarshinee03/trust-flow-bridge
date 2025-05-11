
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Online Seller",
      image: "/placeholder.svg",
      quote: "TrustFlow has transformed my small Instagram business. My customers feel more secure, and I've seen a 30% decrease in order cancellations. Truly a game-changer!",
      stars: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Regular Online Buyer",
      image: "/placeholder.svg",
      quote: "After being scammed twice on social media purchases, I now only buy through TrustFlow. The peace of mind is worth every penny of the small fee.",
      stars: 5
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Handmade Jewelry Seller",
      image: "/placeholder.svg",
      quote: "As someone selling high-value handmade items, TrustFlow has helped me build trust with new customers. The simple interface makes it easy for everyone.",
      stars: 4
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of buyers and sellers trust TrustFlow for their online transactions.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="text-center md:text-left">
                        <p className="font-semibold text-lg">{testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === activeIndex ? "bg-escrow-blue" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
