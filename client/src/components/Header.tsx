import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M7 20l4-16m2 16l4-16" />
                <path d="M5 8h14" />
                <path d="M5 16h14" />
              </svg>
              <span className="text-xl font-bold text-primary">Woods Maintenance</span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <a className={`text-sm font-medium ${isActive("/") ? "text-primary" : "text-gray-600 hover:text-primary"}`}>
                Home
              </a>
            </Link>
            <Link href="/services">
              <a className={`text-sm font-medium ${isActive("/services") ? "text-primary" : "text-gray-600 hover:text-primary"}`}>
                Services
              </a>
            </Link>
            <Link href="/projects">
              <a className={`text-sm font-medium ${isActive("/projects") ? "text-primary" : "text-gray-600 hover:text-primary"}`}>
                Projects
              </a>
            </Link>
            <Link href="/contact">
              <a className={`text-sm font-medium ${isActive("/contact") ? "text-primary" : "text-gray-600 hover:text-primary"}`}>
                Contact
              </a>
            </Link>
            <div className="pl-4">
              <Link href="/contact">
                <Button>Get a Quote</Button>
              </Link>
            </div>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/">
                    <a className={`text-sm font-medium ${isActive("/") ? "text-primary" : "text-gray-600"}`}>
                      Home
                    </a>
                  </Link>
                  <Link href="/services">
                    <a className={`text-sm font-medium ${isActive("/services") ? "text-primary" : "text-gray-600"}`}>
                      Services
                    </a>
                  </Link>
                  <Link href="/projects">
                    <a className={`text-sm font-medium ${isActive("/projects") ? "text-primary" : "text-gray-600"}`}>
                      Projects
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a className={`text-sm font-medium ${isActive("/contact") ? "text-primary" : "text-gray-600"}`}>
                      Contact
                    </a>
                  </Link>
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button className="w-full">Get a Quote</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
