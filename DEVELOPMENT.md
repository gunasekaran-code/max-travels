# Development Guide - Max Travels

## 📚 Table of Contents
1. [Development Setup](#development-setup)
2. [Code Standards](#code-standards)
3. [Component Development](#component-development)
4. [Testing Checklist](#testing-checklist)
5. [Performance Guidelines](#performance-guidelines)
6. [Deployment Guide](#deployment-guide)
7. [Troubleshooting](#troubleshooting)

---

## 🛠️ Development Setup

### Initial Setup
```bash
# 1. Clone repository
git clone <repository-url>
cd max-travels-cursor

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:3000
```

### Recommended Development Tools
- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin
  - Thunder Client (for API testing)

### EditorConfig
Create `.editorconfig` file:
```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
```

---

## 📋 Code Standards

### TypeScript Guidelines
1. **Always define types for props**
   ```typescript
   interface ComponentProps {
     title: string;
     onClick: () => void;
     variant?: 'primary' | 'secondary';
   }
   ```

2. **Use type definitions from lib/types.ts**
   ```typescript
   import type { ContactFormData, Service } from '@/lib/types';
   ```

3. **Avoid `any` type**
   - Use `unknown` and type guard instead
   - Use generics `<T>` for flexible components

### Naming Conventions
- **Files**: `camelCase` or `PascalCase` for components
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **CSS Classes**: `kebab-case`

### Import Order
```typescript
// 1. External packages
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Internal components
import { Button } from '@/components/ui/Button';
import { HeroSlider } from '@/components/sections/HeroSlider';

// 3. Internal utilities and types
import { validateContactForm } from '@/lib/validation';
import type { ContactFormData } from '@/lib/types';

// 4. Styles
import './Component.css';
```

### Formatting
- Use Prettier for code formatting
- Indentation: 2 spaces
- Line length: 100 characters (soft limit)
- Semicolons: Required
- Quotes: Double quotes for JSX

---

## 🎨 Component Development

### Creating a New Component

#### 1. Functional Component Template
```typescript
import React from 'react';
import type { ComponentProps } from '@/lib/types';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
  className?: string;
}

/**
 * MyComponent - Brief description
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * @example
 * <MyComponent title="Hello" onAction={() => console.log('clicked')} />
 */
export function MyComponent({
  title,
  onAction,
  className = '',
}: MyComponentProps): React.ReactElement {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {onAction && <button onClick={onAction}>Click me</button>}
    </div>
  );
}

export default MyComponent;
```

#### 2. Section Component Template
```typescript
import React from 'react';

/**
 * MySection - Page section with specific content
 * 
 * Used in: Home page
 * Responsive: Yes (mobile, tablet, desktop)
 */
export function MySection(): React.ReactElement {
  return (
    <section id="my-section" className="py-20 md:py-28">
      <div className="container-max">
        <h2 className="section-title">Section Title</h2>
        <p className="section-tagline">Tagline</p>
        {/* Content here */}
      </div>
    </section>
  );
}

export default MySection;
```

#### 3. Styling Best Practices
```typescript
// ✅ DO: Use Tailwind classes
<div className="rounded-lg border border-max-border p-6 transition hover:shadow-card">

// ❌ DON'T: Use inline styles
<div style={{ borderRadius: '8px', padding: '24px' }}>

// ✅ DO: Use responsive classes
<div className="text-base md:text-lg lg:text-xl">

// ❌ DON'T: Use breakpoint media queries
<div className="@media (md) { font-size: 18px; }">
```

#### 4. Accessibility Requirements
```typescript
// ✅ DO: Include semantic HTML
<button aria-label="Close menu" onClick={onClose}>

// ✅ DO: Provide form labels
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// ✅ DO: Include alt text
<Image src={url} alt="Descriptive text for SEO" />

// ❌ DON'T: Skip accessibility attributes
<div onClick={handler}>Click me</div>
```

---

## ✅ Testing Checklist

### Pre-Commit Checklist
- [ ] TypeScript compiles without errors
- [ ] ESLint passes all checks
- [ ] Components render without console errors
- [ ] Responsive design tested (mobile/tablet/desktop)
- [ ] Forms validate correctly
- [ ] Links navigate properly
- [ ] Images load correctly
- [ ] Animations are smooth

### Mobile Testing
- [ ] Test on actual mobile device (not just browser DevTools)
- [ ] Test touch interactions
- [ ] Test landscape orientation
- [ ] Test hamburger menu functionality
- [ ] Test form inputs (keyboard handling)
- [ ] Test scroll behavior

### Desktop Testing
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test hover states
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test responsive breakpoints
- [ ] Test high-resolution displays

### Performance Testing
```bash
# Build and analyze
npm run build

# Check bundle size
npm run analyze  # if you have webpack-bundle-analyzer installed

# Test performance metrics
# Use Google Lighthouse in DevTools
```

### SEO Testing
- [ ] Check Google Search Console
- [ ] Verify Meta tags in HTML
- [ ] Check Open Graph tags
- [ ] Verify structured data with Schema.org validator
- [ ] Test robots.txt
- [ ] Check sitemap.xml
- [ ] Verify canonical URLs

---

## ⚡ Performance Guidelines

### Image Optimization
```typescript
// ✅ DO: Use Next.js Image component
<Image
  src={imageUrl}
  alt="Description"
  width={800}
  height={600}
  quality={75}
  priority={false}
  className="object-cover"
/>

// ❌ DON'T: Use HTML img tag
<img src={imageUrl} alt="Description" />
```

### Code Splitting
```typescript
// ✅ DO: Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
});

// ✅ DO: Lazy load sections
export const revalidate = 60; // ISR: revalidate every 60 seconds
```

### CSS Best Practices
```typescript
// ✅ DO: Combine CSS classes
className="flex items-center justify-between gap-4 p-6 rounded-lg bg-white shadow-card"

// ❌ DON'T: Create unnecessary component wrappers
// Just for styling

// ✅ DO: Use CSS utilities (Tailwind)
// ❌ DON'T: Create custom CSS files unless necessary
```

### JavaScript Optimization
```typescript
// ✅ DO: Use React.memo for expensive components
const MemoizedComponent = React.memo(MyComponent);

// ✅ DO: Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// ✅ DO: Use useMemo for expensive calculations
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

---

## 🚀 Deployment Guide

### Pre-Deployment Checklist
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Build optimized and tested locally
- [ ] SEO metadata verified
- [ ] Analytics configured
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Performance budget met (Lighthouse 90+)
- [ ] Security headers configured
- [ ] SSL certificate configured

### Environment Variables for Production
```bash
# .env.production.local
NEXT_PUBLIC_API_URL=https://api.maxtravel.com
RESEND_API_KEY=your_production_api_key
CONTACT_EMAIL=info@maxtravel.com
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Deploy to Vercel (Recommended)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod

# 4. Verify deployment
# Visit https://maxtravel.vercel.app
```

### Deploy to Other Platforms

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

#### AWS Amplify
```bash
amplify init
amplify hosting add
amplify push
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: Build fails with TypeScript errors
**Solution:**
```bash
# 1. Clear Next.js cache
rm -rf .next

# 2. Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Run build again
npm run build
```

#### Issue: Images not loading in production
**Solution:**
```typescript
// Check next.config.ts images configuration
export const config = {
  images: {
    domains: ['images.unsplash.com', 'your-domain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
};
```

#### Issue: Animations janky on mobile
**Solution:**
```typescript
// Use will-change CSS property
<div className="will-change-transform transition-transform duration-300">
  Content
</div>

// Disable animations on mobile
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

#### Issue: Form validation not working
**Solution:**
```bash
# Check browser console for errors
# Verify validation imports
import { validateContactForm, hasErrors } from '@/lib/validation';

# Test with sample data
const testData = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Test',
  message: 'Test message content',
};
const errors = validateContactForm(testData);
console.log(errors); // Should be empty object
```

#### Issue: Slow performance on production
**Solution:**
```bash
# 1. Analyze bundle size
npm run build

# 2. Check for missing Image optimization
# 3. Enable caching headers in next.config.ts
# 4. Use ISR (Incremental Static Regeneration)
export const revalidate = 3600; // 1 hour

# 5. Monitor with Web Vitals
# Install: npm install web-vitals
```

---

## 📞 Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Common Commands
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript check

# Utilities
npm list                # List installed packages
npm outdated            # Check for outdated packages
npm audit               # Check for security issues
npm audit fix           # Auto-fix security issues
```

---

**Last Updated**: June 2026  
**Version**: 1.0.0
