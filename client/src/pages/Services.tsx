import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Service } from "@shared/schema";
import { Link } from "wouter";

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const landscapingServices = services?.filter(service => service.category === "landscaping") || [];
  const paintingServices = services?.filter(service => service.category === "painting") || [];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-3">Our Professional Services</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We offer a comprehensive range of maintenance and landscaping services to enhance
          the beauty and value of your property.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-center mb-8">
          <TabsTrigger value="all" className="px-6">All Services</TabsTrigger>
          <TabsTrigger value="landscaping" className="px-6">Landscaping</TabsTrigger>
          <TabsTrigger value="painting" className="px-6">Painting</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="border shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse rounded-t"></div>
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-gray-200 animate-pulse"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-gray-200 animate-pulse w-full"></div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              services?.map(service => (
                <Card key={service.id} className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-primary">{service.name}</CardTitle>
                    <CardDescription className="text-sm capitalize">
                      {service.category} Service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/contact">
                      <Button className="w-full">Request a Quote</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="landscaping">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="border shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse rounded-t"></div>
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-gray-200 animate-pulse"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-gray-200 animate-pulse w-full"></div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              landscapingServices.map(service => (
                <Card key={service.id} className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-primary">{service.name}</CardTitle>
                    <CardDescription className="text-sm capitalize">
                      Landscaping Service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/contact">
                      <Button className="w-full">Request a Quote</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="painting">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="border shadow-md">
                  <div className="h-48 bg-gray-200 animate-pulse rounded-t"></div>
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-gray-200 animate-pulse mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-gray-200 animate-pulse"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-gray-200 animate-pulse w-full"></div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              paintingServices.map(service => (
                <Card key={service.id} className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-primary">{service.name}</CardTitle>
                    <CardDescription className="text-sm capitalize">
                      Painting Service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/contact">
                      <Button className="w-full">Request a Quote</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-primary/5 rounded-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Why Choose Our Services?</h2>
          <p className="text-gray-600 mt-2">We pride ourselves on quality, reliability, and exceptional customer service.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Experienced Professionals</h3>
            <p className="text-gray-600">Our team brings years of expertise and craftsmanship to every project.</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Timely Completion</h3>
            <p className="text-gray-600">We value your time and ensure projects are completed as scheduled.</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Materials</h3>
            <p className="text-gray-600">We use only premium products and materials for lasting results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
