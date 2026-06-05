/**
 * TypeScript Types and Interfaces for Max Travels Application
 */

// ============ COMMON TYPES ============
export type Status = "idle" | "loading" | "success" | "error";

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============ CAR TYPES ============
export interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  capacity: number;
  transmission: "manual" | "automatic";
  fuelType: "petrol" | "diesel" | "hybrid" | "electric";
  available: boolean;
}

export interface CarCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

// ============ BOOKING TYPES ============
export interface Booking {
  id: string;
  carId: string;
  customerName: string;
  email: string;
  phone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface BookingFormData {
  carId: string;
  customerName: string;
  email: string;
  phone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  dropoffLocation: string;
}

// ============ CONTACT TYPES ============
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  agreeToTerms?: boolean;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  createdAt: string;
  status: "pending" | "read" | "responded";
}

// ============ TESTIMONIAL TYPES ============
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  company?: string;
}

// ============ SERVICE TYPES ============
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: number;
}

// ============ FEATURE TYPES ============
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  value?: string | number;
}

// ============ TEAM MEMBER TYPES ============
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

// ============ FAQ TYPES ============
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ============ BLOG POST TYPES ============
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
}

// ============ NAVIGATION TYPES ============
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  submenu?: NavLink[];
}

// ============ SOCIAL TYPES ============
export interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube";
  url: string;
  icon: string;
}

// ============ PAGE METADATA TYPES ============
export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  author?: string;
  publishedAt?: string;
}

// ============ COMPONENT PROP TYPES ============
export interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
}

// ============ FORM VALIDATION TYPES ============
export interface ValidationRule {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  custom?: (value: unknown) => boolean | string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof ContactFormData, string>>;

// ============ UTILITY TYPES ============
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchParams {
  q?: string;
  category?: string;
  sort?: "newest" | "oldest" | "popular" | "price-asc" | "price-desc";
  page?: number;
}
