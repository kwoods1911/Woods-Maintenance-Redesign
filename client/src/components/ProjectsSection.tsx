import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import BeforeAfter from "@/components/BeforeAfter";

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const featuredProjects = projects?.slice(0, 2) || [];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a look at some of our recent transformations and the remarkable results we've achieved for our clients.
          </p>
        </div>

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
            featuredProjects.map(project => (
              <BeforeAfter
                key={project.id}
                project={project}
              />
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button size="lg">View All Projects</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
