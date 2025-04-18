import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";

export default function ServiceSection() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const landscapingServices = services?.filter(service => service.category === "landscaping").slice(0, 3) || [];
  const paintingServices = services?.filter(service => service.category === "painting").slice(0, 3) || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive maintenance and improvement solutions for your property.
          </p>
        </div>

        {/* Landscaping Services */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">Landscaping Services</h3>
              <p className="text-gray-600">Professional lawn care and landscape design.</p>
            </div>
            <Link href="/services">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="border rounded-lg shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 animate-pulse w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2 mb-4"></div>
                    <div className="h-16 bg-gray-200 animate-pulse mb-4"></div>
                    <div className="h-10 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              landscapingServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </div>
        </div>

        {/* Painting Services */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">Painting Services</h3>
              <p className="text-gray-600">Interior and exterior painting solutions.</p>
            </div>
            <Link href="/services">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="border rounded-lg shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 animate-pulse w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2 mb-4"></div>
                    <div className="h-16 bg-gray-200 animate-pulse mb-4"></div>
                    <div className="h-10 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              paintingServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/contact">
            <Button size="lg">Request a Free Quote</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
