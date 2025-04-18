import { Project } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface BeforeAfterProps {
  project: Project;
}

export default function BeforeAfter({ project }: BeforeAfterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <img 
            src={project.beforeImageUrl} 
            alt={`${project.title} before transformation`}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="bg-black/70 text-white border-0">
              Before
            </Badge>
          </div>
        </div>
        <div className="relative">
          <img 
            src={project.afterImageUrl} 
            alt={`${project.title} after transformation`}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary">
              After
            </Badge>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-primary">{project.title}</h3>
          <Badge className="capitalize">{project.category}</Badge>
        </div>
        <p className="text-gray-600">{project.description}</p>
      </div>
    </div>
  );
}
