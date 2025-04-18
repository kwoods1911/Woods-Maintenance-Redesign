import { Project } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.afterImageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute bottom-3 right-3">
          <Badge className="capitalize bg-primary">{project.category}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-primary">{project.title}</CardTitle>
        <CardDescription className="text-sm">Completed Project</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{project.description}</p>
      </CardContent>
    </Card>
  );
}
