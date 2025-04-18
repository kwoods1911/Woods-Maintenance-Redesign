import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { Link } from "wouter";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
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
  );
}
