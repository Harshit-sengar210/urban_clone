export type Benefit = {
  id: string;
  title: string;
  description: string;
  iconName: string; // we'll use a string to map to lucide-react icons in the component
};

export type Testimonial = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  quote: string;
};

export type PlatformStat = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
};

export type UseCase = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  categorySlug: string;
};
