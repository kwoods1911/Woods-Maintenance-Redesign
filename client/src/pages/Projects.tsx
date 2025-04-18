import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import BeforeAfter from "@/components/BeforeAfter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const landscapingProjects = projects?.filter(project => project.category === "landscaping") || [];
  const paintingProjects = projects?.filter(project => project.category === "painting") || [];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-3">Our Project Portfolio</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Browse through our completed projects to see the transformation we can bring to your property.
          Each project showcases our commitment to quality and attention to detail.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-center mb-8">
          <TabsTrigger value="all" className="px-6">All Projects</TabsTrigger>
          <TabsTrigger value="landscaping" className="px-6">Landscaping</TabsTrigger>
          <TabsTrigger value="painting" className="px-6">Painting</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-80 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-7 bg-gray-200 animate-pulse w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              projects?.map(project => (
                <BeforeAfter
                  key={project.id}
                  project={project}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="landscaping">
          <div className="grid gap-8">
            {isLoading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-80 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-7 bg-gray-200 animate-pulse w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              landscapingProjects.map(project => (
                <BeforeAfter
                  key={project.id}
                  project={project}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="painting">
          <div className="grid gap-8">
            {isLoading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-80 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-7 bg-gray-200 animate-pulse w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              paintingProjects.map(project => (
                <BeforeAfter
                  key={project.id}
                  project={project}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 p-8 bg-primary/5 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Ready to Transform Your Property?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Let us help you bring your vision to life. Whether it's a new landscape design or a fresh coat of paint,
          our team is ready to deliver exceptional results.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/services" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Explore Services
          </a>
          <a href="/contact" className="bg-white border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary/5 transition-colors">
            Request a Quote
          </a>
        </div>
      </div>
    </div>
  );
}
