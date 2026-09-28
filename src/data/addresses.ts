export type AddressType = "home" | "work" | "other";

export interface Address {
  id: string;
  type: AddressType;
  label: string;
  name: string;
  phone: string;
  flat: string;
  building: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  instructions: string;
  isDefault: boolean;
  createdAt: string;
}

export type AddressFormData = Omit<Address, "id" | "createdAt">;

export const DEMO_ADDRESSES: Address[] = [
  {
    id: "addr_001",
    type: "home",
    label: "Home",
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    flat: "Flat 4B",
    building: "Green Residency",
    street: "Sector 62",
    area: "Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201309",
    landmark: "Near Metro Station",
    instructions: "Call me when you reach the gate.",
    isDefault: true,
    createdAt: "2026-08-01T10:00:00",
  },
  {
    id: "addr_002",
    type: "work",
    label: "Work",
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    flat: "Floor 4, Tower B",
    building: "Tech Park",
    street: "Sector 63",
    area: "Sector 63",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    landmark: "Opposite Noida Stadium",
    instructions: "Ask for Ravi at reception.",
    isDefault: false,
    createdAt: "2026-08-10T10:00:00",
  },
  {
    id: "addr_003",
    type: "other",
    label: "Family Home",
    name: "Sunita Kumar",
    phone: "+91 9812345678",
    flat: "House No. 42",
    building: "Shree Apartments",
    street: "Shakti Khand 2",
    area: "Indirapuram",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201014",
    landmark: "Near D Mart",
    instructions: "Ring bell twice.",
    isDefault: false,
    createdAt: "2026-08-20T10:00:00",
  },
];

export const MOCK_LOCATION_SUGGESTIONS = [
  { label: "Sector 62, Noida", area: "Sector 62", city: "Noida", state: "Uttar Pradesh", pincode: "201309" },
  { label: "Sector 62 Metro Station, Noida", area: "Sector 62", city: "Noida", state: "Uttar Pradesh", pincode: "201309" },
  { label: "Sector 63, Noida", area: "Sector 63", city: "Noida", state: "Uttar Pradesh", pincode: "201301" },
  { label: "Indirapuram, Ghaziabad", area: "Indirapuram", city: "Ghaziabad", state: "Uttar Pradesh", pincode: "201014" },
  { label: "Connaught Place, New Delhi", area: "Connaught Place", city: "New Delhi", state: "Delhi", pincode: "110001" },
  { label: "Bandra West, Mumbai", area: "Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050" },
  { label: "Koramangala, Bengaluru", area: "Koramangala", city: "Bengaluru", state: "Karnataka", pincode: "560034" },
  { label: "Jubilee Hills, Hyderabad", area: "Jubilee Hills", city: "Hyderabad", state: "Telangana", pincode: "500033" },
];

export const DEMO_CURRENT_LOCATION = {
  area: "Sector 62", city: "Noida", state: "Uttar Pradesh", pincode: "201309",
};
