// src/services/serviceDiscoveryService.ts
export interface DiscoveredService {
  id: string;
  name: string;
  category: string;
  icon: string;
}

const MOCK_SERVICES: DiscoveredService[] = [
  { id: "s1", name: "Home Cleaning", category: "Complete home cleaning service", icon: "🧹" },
  { id: "s2", name: "Deep Cleaning", category: "Detailed home deep cleaning", icon: "🧽" },
  { id: "s3", name: "Bathroom Cleaning", category: "Professional bathroom cleaning", icon: "🚿" },
  { id: "s4", name: "Sofa Cleaning", category: "Deep sofa & upholstery cleaning", icon: "🛋️" },
  { id: "s5", name: "AC Repair", category: "AC troubleshooting & repair", icon: "❄️" },
  { id: "s6", name: "AC Service", category: "Regular AC maintenance", icon: "🌬️" },
  { id: "s7", name: "AC Installation", category: "New AC setup", icon: "🔧" },
  { id: "s8", name: "Electrician", category: "General electrical work", icon: "⚡" },
  { id: "s9", name: "Electrical Repair", category: "Fixing electrical issues", icon: "🔌" },
  { id: "s10", name: "Plumbing", category: "General plumbing work", icon: "🚰" },
  { id: "s11", name: "Pipe Repair", category: "Fixing leaks & pipes", icon: "🔧" },
  { id: "s12", name: "Tap Repair", category: "Fixing faucets & taps", icon: "💧" },
  { id: "s13", name: "Carpentry", category: "Woodwork & furniture repair", icon: "🪚" },
  { id: "s14", name: "Pest Control", category: "Eliminate pests & bugs", icon: "🐜" },
  { id: "s15", name: "Salon at Home", category: "Beauty services at home", icon: "💇‍♀️" },
  { id: "s16", name: "Men's Haircut", category: "Grooming & haircut", icon: "✂️" },
];

export const POPULAR_SERVICES: DiscoveredService[] = [
  MOCK_SERVICES[0], // Home Cleaning
  MOCK_SERVICES[4], // AC Repair
  MOCK_SERVICES[7], // Electrician
  MOCK_SERVICES[9], // Plumbing
  MOCK_SERVICES[14], // Salon at Home
  MOCK_SERVICES[13], // Pest Control
];

export const serviceDiscoveryService = {
  async searchServices(query: string): Promise<DiscoveredService[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    if (!query) {
      return [];
    }

    const lowercaseQuery = query.toLowerCase();
    return MOCK_SERVICES.filter((service) => 
      service.name.toLowerCase().includes(lowercaseQuery) || 
      service.category.toLowerCase().includes(lowercaseQuery)
    );
  }
};
