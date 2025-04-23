import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-gray-100">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-primary"
          style={{
            background: "linear-gradient(to right, rgba(45, 94, 46, 0.8), rgba(76, 175, 80, 0.8))",
          }}
        ></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f')",
            mixBlendMode: "overlay",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Professional Landscaping & Painting Services
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Enhance the beauty and value of your property with our expert maintenance, landscaping, and painting services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/services">
              <Button size="lg" className="bg-white text-primary hover:bg-white/10">
                Explore Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/10">
                Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Professional Service</h3>
                <p className="text-sm text-gray-600">Experienced specialists</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Timely Completion</h3>
                <p className="text-sm text-white-600">On schedule, every time</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-end">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Satisfaction Guarantee</h3>
                <p className="text-sm text-gray-600">100% customer satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
