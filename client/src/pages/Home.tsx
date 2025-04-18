import Hero from "@/components/Hero";
import ServiceSection from "@/components/ServiceSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServiceSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
