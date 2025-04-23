import { 
  users, type User, type InsertUser,
  testimonials, type Testimonial, type InsertTestimonial,
  services, type Service, type InsertService,
  projects, type Project, type InsertProject,
  contactRequests, type ContactRequest, type InsertContactRequest
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  getServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  createContactRequest(contactRequest: InsertContactRequest): Promise<ContactRequest>;
  getContactRequests(): Promise<ContactRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private testimonialStore: Map<number, Testimonial>;
  private serviceStore: Map<number, Service>;
  private projectStore: Map<number, Project>;
  private contactRequestStore: Map<number, ContactRequest>;
  
  currentUserId: number;
  currentTestimonialId: number;
  currentServiceId: number;
  currentProjectId: number;
  currentContactRequestId: number;

  constructor() {
    this.users = new Map();
    this.testimonialStore = new Map();
    this.serviceStore = new Map();
    this.projectStore = new Map();
    this.contactRequestStore = new Map();
    
    this.currentUserId = 1;
    this.currentTestimonialId = 1;
    this.currentServiceId = 1;
    this.currentProjectId = 1;
    this.currentContactRequestId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Initialize sample services
    const landscapingServices = [
      {
        name: "Lawn Maintenance",
        description: "Regular lawn care including mowing, edging, and fertilizing to keep your yard looking its best all year round.",
        category: "landscaping",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
      },
      {
        name: "Garden Design",
        description: "Custom garden design and installation services tailored to your property and preferences.",
        category: "landscaping",
        imageUrl: "https://images.unsplash.com/photo-1558521958-0a228e77e984"
      },
      {
        name: "Seasonal Cleanup",
        description: "Comprehensive seasonal cleanups including leaf removal, debris clearing, and garden bed preparation.",
        category: "landscaping",
        imageUrl: "https://images.unsplash.com/photo-1437240443155-4429a25183e5"
      },
      {
        name: "Snow Removal",
        description: "Plowing Snowfrom driveways and side walks",
        category: "snowremoval",
        imageUrl: "https://images.unsplash.com/photo-1437240443155-4429a25183e5"
      }

    ];
    
    const paintingServices = [
      {
        name: "Interior Painting",
        description: "Professional interior painting services with premium paints and expert application techniques.",
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f"
      },
      {
        name: "Exterior Painting",
        description: "Weather-resistant exterior painting that protects and beautifies your home's facade.",
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1555551414-4b0dc2e346eb"
      },
      {
        name: "Cabinet Refinishing",
        description: "Transform your kitchen or bathroom with expert cabinet refinishing and painting services.",
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
      }
    ];
    
    [...landscapingServices, ...paintingServices].forEach(service => {
      this.createService(service);
    });
    
    // Initialize sample projects
    const sampleProjects = [
      {
        title: "Modern Backyard Transformation",
        description: "Complete redesign of an outdated backyard into a modern outdoor living space with sustainable landscaping.",
        category: "landscaping",
        beforeImageUrl: "https://images.unsplash.com/photo-1558521958-0a228e77e984",
        afterImageUrl: "https://images.unsplash.com/photo-1558521958-df61c4a4962b"
      },
      {
        title: "Victorian Home Exterior",
        description: "Full exterior painting restoration of a classic Victorian home with proper color schemes.",
        category: "painting",
        beforeImageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
        afterImageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115"
      },
      {
        title: "Drought-Resistant Garden Installation",
        description: "Converted a water-hungry lawn to a beautiful drought-resistant garden with native plants.",
        category: "landscaping",
        beforeImageUrl: "https://images.unsplash.com/photo-1560749003-f4b1e17e2dff",
        afterImageUrl: "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b8c4"
      },
      {
        title: "Kitchen Cabinet Makeover",
        description: "Refinished and repainted outdated kitchen cabinets for a fresh, contemporary look.",
        category: "painting",
        beforeImageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        afterImageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
    
    // Initialize sample testimonials
    const sampleTestimonials = [
      {
        name: "Michael Thompson",
        role: "Homeowner",
        message: "The team completely transformed our backyard into an oasis. Their attention to detail in both the landscaping and painting of our outdoor structures was impressive.",
        rating: 5
      },
      {
        name: "Sarah Johnson",
        role: "Business Owner",
        message: "We hired them to refresh our office exterior and landscape the front entrance. The results exceeded our expectations and made a huge difference in our curb appeal.",
        rating: 5
      },
      {
        name: "David Wilson",
        role: "Homeowner",
        message: "Their painting crew was professional, clean, and did exceptional work on our interior walls. Will definitely use them for our upcoming landscaping project.",
        rating: 4
      }
    ];
    
    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialStore.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonialStore.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonialStore.set(id, testimonial);
    return testimonial;
  }
  
  async getServices(): Promise<Service[]> {
    return Array.from(this.serviceStore.values());
  }
  
  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.serviceStore.values()).filter(
      service => service.category === category
    );
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.serviceStore.get(id);
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.serviceStore.set(id, service);
    return service;
  }
  
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectStore.values());
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projectStore.values()).filter(
      project => project.category === category
    );
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projectStore.get(id);
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projectStore.set(id, project);
    return project;
  }
  
  async createContactRequest(insertContactRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactRequestId++;
    const now = new Date();
    const contactRequest: ContactRequest = { 
      ...insertContactRequest, 
      id, 
      createdAt: now 
    };
    this.contactRequestStore.set(id, contactRequest);
    return contactRequest;
  }
  
  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequestStore.values());
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const user = await db.select().from(users).where(eq(users.id, id)).get();
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await db.select().from(users).where(eq(users.username, username)).get();
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning().get();
    return result;
  }
  
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).all();
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const testimonial = await db.select().from(testimonials).where(eq(testimonials.id, id)).get();
    return testimonial;
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(insertTestimonial).returning().get();
    return result;
  }
  
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).all();
  }
  
  async getServicesByCategory(category: string): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.category, category)).all();
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const service = await db.select().from(services).where(eq(services.id, id)).get();
    return service;
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const result = await db.insert(services).values(insertService).returning().get();
    return result;
  }
  
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).all();
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.category, category)).all();
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const project = await db.select().from(projects).where(eq(projects.id, id)).get();
    return project;
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(insertProject).returning().get();
    return result;
  }
  
  async createContactRequest(insertContactRequest: InsertContactRequest): Promise<ContactRequest> {
    const result = await db.insert(contactRequests).values(insertContactRequest).returning().get();
    return result;
  }
  
  async getContactRequests(): Promise<ContactRequest[]> {
    return await db.select().from(contactRequests).all();
  }
}

// Seed the database with initial data
async function seedDatabase() {
  try {
    // Check if the database is empty
    const existingServices = await db.select().from(services).all();
    if (existingServices.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }
    
    console.log("Seeding database with initial data...");
    
    // Service data
    const landscapingServices = [
      {
        name: "Lawn Maintenance",
        description: "Regular lawn care including mowing, edging, and fertilizing to keep your yard looking its best all year round.",
        category: "landscaping",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
      },
      {
        name: "Garden Design",
        description: "Custom garden design and installation services tailored to your property and preferences.",
        category: "landscaping",
        imageUrl: "https://images.unsplash.com/photo-1558521958-0a228e77e984"
      },
      {
        name: "Seasonal Cleanup",
        description: "Comprehensive seasonal cleanups including leaf removal, debris clearing, and garden bed preparation.",
        category: "landscaping",
        imageUrl: "https://images.unsplash.com/photo-1437240443155-4429a25183e5"
      }
    ];
    
    const paintingServices = [
      {
        name: "Interior Painting",
        description: "Professional interior painting services with premium paints and expert application techniques.",
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f"
      },
      {
        name: "Exterior Painting",
        description: "Weather-resistant exterior painting that protects and beautifies your home's facade.",
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1555551414-4b0dc2e346eb"
      },
      {
        name: "Cabinet Refinishing",
        description: "Transform your kitchen or bathroom with expert cabinet refinishing and painting services.",
        category: "painting",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
      }
    ];
    
    // Insert services
    for (const service of [...landscapingServices, ...paintingServices]) {
      await db.insert(services).values(service);
    }
    
    // Project data
    const sampleProjects = [
      {
        title: "Modern Backyard Transformation",
        description: "Complete redesign of an outdated backyard into a modern outdoor living space with sustainable landscaping.",
        category: "landscaping",
        beforeImageUrl: "https://images.unsplash.com/photo-1558521958-0a228e77e984",
        afterImageUrl: "https://images.unsplash.com/photo-1558521958-df61c4a4962b"
      },
      {
        title: "Victorian Home Exterior",
        description: "Full exterior painting restoration of a classic Victorian home with proper color schemes.",
        category: "painting",
        beforeImageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
        afterImageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115"
      },
      {
        title: "Drought-Resistant Garden Installation",
        description: "Converted a water-hungry lawn to a beautiful drought-resistant garden with native plants.",
        category: "landscaping",
        beforeImageUrl: "https://images.unsplash.com/photo-1560749003-f4b1e17e2dff",
        afterImageUrl: "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b8c4"
      },
      {
        title: "Kitchen Cabinet Makeover",
        description: "Refinished and repainted outdated kitchen cabinets for a fresh, contemporary look.",
        category: "painting",
        beforeImageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        afterImageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
      }
    ];
    
    // Insert projects
    for (const project of sampleProjects) {
      await db.insert(projects).values(project);
    }
    
    // Testimonial data
    const sampleTestimonials = [
      {
        name: "Michael Thompson",
        role: "Homeowner",
        message: "The team completely transformed our backyard into an oasis. Their attention to detail in both the landscaping and painting of our outdoor structures was impressive.",
        rating: 5
      },
      {
        name: "Sarah Johnson",
        role: "Business Owner",
        message: "We hired them to refresh our office exterior and landscape the front entrance. The results exceeded our expectations and made a huge difference in our curb appeal.",
        rating: 5
      },
      {
        name: "David Wilson",
        role: "Homeowner",
        message: "Their painting crew was professional, clean, and did exceptional work on our interior walls. Will definitely use them for our upcoming landscaping project.",
        rating: 4
      }
    ];
    
    // Insert testimonials
    for (const testimonial of sampleTestimonials) {
      await db.insert(testimonials).values(testimonial);
    }
    
    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run the seedDatabase function and export the DatabaseStorage
export const storage = new DatabaseStorage();

// Seed the database after exporting storage
seedDatabase().catch(console.error);
