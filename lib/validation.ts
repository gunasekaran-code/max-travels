/**
 * Form Validation Utilities
 */

import type { ContactFormData, FormErrors, ValidationRule } from "./types";

// Email validation pattern
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation pattern (basic international format)
const PHONE_PATTERN = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

// Common validation rules
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  } as ValidationRule,
  email: {
    required: true,
    pattern: EMAIL_PATTERN,
  } as ValidationRule,
  phone: {
    pattern: PHONE_PATTERN,
  } as ValidationRule,
  message: {
    required: true,
    minLength: 10,
    maxLength: 5000,
  } as ValidationRule,
  password: {
    required: true,
    minLength: 8,
  } as ValidationRule,
};

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  return PHONE_PATTERN.test(phone.replace(/\s/g, ""));
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
  isValid: boolean;
  score: "weak" | "fair" | "good" | "strong";
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;
  else suggestions.push("Password should be at least 8 characters");

  if (password.length >= 12) score++;
  else if (password.length < 8) suggestions.push("Minimum 8 characters recommended");

  if (/[a-z]/.test(password)) score++;
  else suggestions.push("Add lowercase letters");

  if (/[A-Z]/.test(password)) score++;
  else suggestions.push("Add uppercase letters");

  if (/[0-9]/.test(password)) score++;
  else suggestions.push("Add numbers");

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else suggestions.push("Add special characters");

  const scoreMap: Record<number, "weak" | "fair" | "good" | "strong"> = {
    1: "weak",
    2: "weak",
    3: "fair",
    4: "good",
    5: "strong",
    6: "strong",
  };

  return {
    isValid: score >= 3,
    score: scoreMap[score] || "weak",
    suggestions,
  };
}

/**
 * Validate a single field
 */
export function validateField(fieldName: string, value: string, rule: ValidationRule): string | null {
  if (rule.required && (!value || value.trim() === "")) {
    return `${fieldName} is required`;
  }

  if (value && rule.pattern && !rule.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }

  if (value && rule.minLength && value.length < rule.minLength) {
    return `${fieldName} must be at least ${rule.minLength} characters`;
  }

  if (value && rule.maxLength && value.length > rule.maxLength) {
    return `${fieldName} must not exceed ${rule.maxLength} characters`;
  }

  if (rule.custom && value) {
    const customResult = rule.custom(value);
    if (typeof customResult === "string") return customResult;
    if (customResult === false) return `${fieldName} is invalid`;
  }

  return null;
}

/**
 * Validate contact form
 */
export function validateContactForm(data: Partial<ContactFormData>): FormErrors {
  const errors: FormErrors = {};

  // Validate name
  if (!data.name || data.name.trim() === "") {
    errors.name = "Name is required";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.length > 100) {
    errors.name = "Name must not exceed 100 characters";
  }

  // Validate email
  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Validate phone (optional but must be valid if provided)
  if (data.phone && data.phone.trim() !== "" && !isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  // Validate message
  if (!data.message || data.message.trim() === "") {
    errors.message = "Message is required";
  } else if (data.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (data.message.length > 5000) {
    errors.message = "Message must not exceed 5000 characters";
  }

  return errors;
}

/**
 * Check if there are any validation errors
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined && error !== "");
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  const element = document.createElement("div");
  element.textContent = input;
  return element.innerHTML;
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Debounce validation errors (show after delay)
 */
export function debounceValidation(
  callback: (errors: FormErrors) => void,
  delay: number = 300
): (errors: FormErrors) => void {
  let timeoutId: NodeJS.Timeout;
  return (errors: FormErrors) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(errors), delay);
  };
}
