import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Testimonial } from "@shared/schema";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };
  
  const prevTestimonial = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="h-5 bg-gray-200 w-32 rounded"></div>
              </div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="h-5 bg-gray-200 w-32 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 w-24 rounded"></div>
                </div>
              </div>
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <>
              <div className="transition-all duration-300 transform">
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </div>
              
              <div className="absolute top-1/2 -left-5 md:-left-10 transform -translate-y-1/2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={prevTestimonial}
                  className="h-10 w-10 rounded-full bg-white shadow-md text-primary hover:text-white hover:bg-primary"
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous testimonial</span>
                </Button>
              </div>
              
              <div className="absolute top-1/2 -right-5 md:-right-10 transform -translate-y-1/2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={nextTestimonial}
                  className="h-10 w-10 rounded-full bg-white shadow-md text-primary hover:text-white hover:bg-primary"
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next testimonial</span>
                </Button>
              </div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  ></button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-white">No testimonials available at the moment.</div>
          )}
        </div>
      </div>
    </section>
  );
}
