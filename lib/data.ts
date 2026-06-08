export const heroSlides = [
  {
    id: 1,
    subtitle: "Your Best",
    title: "Car",
    highlight: "Rental",
    tagline: "Experience",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80",
  },
  {
    id: 2,
    subtitle: "Your Best",
    title: "Car",
    highlight: "Booking",
    tagline: "Experience",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
  },
  {
    id: 3,
    subtitle: "Your Best",
    title: "Car",
    highlight: "Choosing",
    tagline: "Experience",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db7?w=1920&q=80",
  },
] as const;

export const marqueeItems = [
  "Premium",
  "Rates",
  "Car",
  "Rental",
  "Worldwide",
  "Affordable",
] as const;

export const services = [
  {
    icon: "car",
    title: "Corporate car rental",
    description:
      "Fleet solutions for business travel with flexible contracts and dedicated account support.",
  },
  {
    icon: "taxi",
    title: "Car rental with driver",
    description:
      "Professional chauffeurs for airport transfers, events, and executive transportation.",
  },
  {
    icon: "sport",
    title: "Airport transfer",
    description:
      "On-time pickups and drop-offs with real-time flight tracking and meet-and-greet options.",
  },
  {
    icon: "insurance",
    title: "Fleet leasing",
    description:
      "Long-term leasing packages tailored to your mileage, maintenance, and budget needs.",
  },
] as const;

export const processSteps = [
  {
    title: "Choose A Car",
    description:
      "Browse categories and compare vehicles by price, features, and availability.",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80",
  },
  {
    title: "Come In Contact",
    description:
      "Confirm your dates, pickup location, and add-ons with our booking team.",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
  },
  {
    title: "Pick-Up Locations",
    description:
      "Collect your vehicle at the nearest branch or request doorstep delivery.",
    image:
      "https://images.unsplash.com/photo-1620691537282-83d320806644?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Enjoy Driving",
    description:
      "Hit the road with full insurance options and 24/7 roadside assistance.",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
  },
] as const;

export const whyChoose = [
  {
    title: "Easy & Fast Booking",
    description:
      "Reserve online in minutes with instant confirmation and transparent pricing.",
  },
  {
    title: "Many Pickup Locations",
    description:
      "Nationwide branches and partner hubs so you can start your trip nearby.",
  },
  {
    title: "Customer Satisfaction",
    description:
      "Rated highly for clean vehicles, friendly staff, and flexible return policies.",
  },
] as const;

export const counters = [
  { value: 1000, suffix: "+", label: "Vehicle fleet", icon: "car" },
  { value: 10, suffix: "M+", label: "Miles of drive", icon: "mileage" },
  { value: 15, suffix: "K+", label: "Booking reserved", icon: "range" },
  { value: 50, suffix: "K+", label: "Pickup & drop", icon: "pin" },
] as const;

export const carBrands = [
  "Tesla",
  "Honda",
  "Audi",
  "Mazda",
  "Toyota",
  "Acura",
] as const;

export type CarType = "Sedan" | "SUV" | "Tempo Van";

export interface Car {
  brand: string;
  name: string;
  /** Offer / base price (what you charge) */
  price: number;
  /** Original / MRP shown crossed-out */
  originalPrice: number;
  hours: string;
  km: number;
  extraPerKm: number;
  transmission: string;
  fuel: string;
  seats: string;
  type: CarType;
  /** Only for Tempo Van */
  ac?: boolean;
  image: string;
}

export const carTypes: CarType[] = ["Sedan", "SUV", "Tempo Van"];

export const cars: Car[] = [
  // ── Sedan ──────────────────────────────────────────────
  {
    brand: "Maruti",
    name: "Swift Dzire",
    price: 2500,
    originalPrice: 2700,   // +200
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Manual",
    fuel: "Petrol",
    seats: "5 Persons",
    type: "Sedan",
    ac: true,
    image:
      "https://www.autovista.in/assets/img/new_cars_colour_variants/swift-colour-solid-fire-red.jpg",
  },
  {
    brand: "Hyundai",
    name: "Hyundai Aura",
    price: 2800,
    originalPrice: 3050,   // +250
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Manual",
    fuel: "Petrol",
    seats: "5 Persons",
    type: "Sedan",
    ac: true,
    image:
      "https://cdn-s3.autocarindia.com/legacy/cdni/Galleries/20251209090956_Hyundai_Aura_Titan_Grey.jpg",
  },
  {
    brand: "Toyota",
    name: "Toyota Etios",
    price: 2500,
    originalPrice: 2700,   // +200
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Manual",
    fuel: "Petrol",
    seats: "5 Persons",
    type: "Sedan",
    ac: true,
    image:
      "https://w0.peakpx.com/wallpaper/89/425/HD-wallpaper-toyota-etios-studio-2018-cars-compact-cars-2018-toyota-etios-japanese-cars-toyota.jpg",
  },

  // ── SUV ────────────────────────────────────────────────
  {
    brand: "Toyota",
    name: "Innova Crysta",
    price: 4500,
    originalPrice: 4750,   // +250
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "7 Persons",
    type: "SUV",
    ac: true,
    image:
      "https://imgd.aeplcdn.com/600x600/n/cw/ec/145675/toyota-innova-crysta-left-front-three-quarter0.jpeg?isig=0&wm=0",
  },
  {
    brand: "Toyota",
    name: "Innova",
    price: 4000,
    originalPrice: 4200,   // +200
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Manual",
    fuel: "Diesel",
    seats: "7 Persons",
    type: "SUV",
    ac: true,
    image:
      "https://i.pinimg.com/1200x/3a/1f/cb/3a1fcb1a65e2d38a9a34fbb76cec1e39.jpg",
  },
  {
    brand: "Kia",
    name: "Carens",
    price: 3500,
    originalPrice: 3700,   // +200
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "7 Persons",
    type: "SUV",
    ac: true,
    image:
      "https://cdn-s3.autocarindia.com/legacy/cdni/mmv_images/colors/20250808114708_Kia_Carens_Clear_White%5B1%5D.png?w=640&q=75",
  },
  {
    brand: "Maruti",
    name: "Ertiga  (AC)",
    price: 3800,
    originalPrice: 3950,   // +150
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Manual",
    fuel: "Petrol",
    seats: "7 Persons",
    type: "SUV",
    ac: true,
    image:
      "https://i.pinimg.com/736x/89/32/c0/8932c0e6bacc17f73c4d64aa6aa4ff5b.jpg",
  },

  // ── Tempo Van ──────────────────────────────────────────
  {
    brand: "Force",
    name: "Tempo Traveller (AC)",
    price: 6000,
    originalPrice: 6200,   // +200
    hours: "12 hr",
    km: 80,
    extraPerKm: 25,
    transmission: "Manual",
    fuel: "Diesel",
    seats: "12 Persons",
    type: "Tempo Van",
    ac: true,
    image:
      "https://i.pinimg.com/1200x/dc/c4/e9/dcc4e96b05c9c26ff5908091e36a0d37.jpg",
  },
  {
    brand: "Urbania",
    name: "Urbania Traveller (AC)",
    price: 6700,
    originalPrice: 8500,
    hours: "12 hr",
    km: 80,
    extraPerKm: 25,
    transmission: "Manual",
    fuel: "Diesel",
    seats: "12 Persons",
    type: "Tempo Van",
    ac: true,
    image:
      "https://i.pinimg.com/736x/4f/3c/f3/4f3cf34f67ad49f71162c21527591907.jpg",
  },
  {
    brand: "Force",
    name: "Tempo Traveller (Non-AC)",
    price: 5500,
    originalPrice: 5700,   // +200
    hours: "12 hr",
    km: 80,
    extraPerKm: 25,
    transmission: "Manual",
    fuel: "Diesel",
    seats: "12 Persons",
    type: "Tempo Van",
    ac: false,
    image:
      "https://i.pinimg.com/1200x/dc/c4/e9/dcc4e96b05c9c26ff5908091e36a0d37.jpg",
  },
];

export const pricingPlans = [
  {
    name: "Skyline Taxi",
    price: 10,
    description:
      "Ideal for short city trips with predictable rates and quick dispatch.",
    icon: "taxi",
    features: [
      { label: "Initial charge", value: "$06" },
      { label: "Additional Kilometre", value: "$06" },
      { label: "Per minute stopped traffic", value: "$06" },
      { label: "Waiting Charge", value: "$06" },
    ],
  },
  {
    name: "Urban Cabs",
    price: 30,
    description:
      "Balanced plan for daily commuters with priority booking windows.",
    icon: "suv",
    features: [
      { label: "Initial charge", value: "$08" },
      { label: "Additional Kilometre", value: "$07" },
      { label: "Per minute stopped traffic", value: "$05" },
      { label: "Waiting Charge", value: "$06" },
    ],
  },
  {
    name: "TurboTaxi",
    price: 50,
    description:
      "Premium tier with luxury vehicles and dedicated customer support.",
    icon: "jeep",
    features: [
      { label: "Initial charge", value: "$12" },
      { label: "Additional Kilometre", value: "$09" },
      { label: "Per minute stopped traffic", value: "$06" },
      { label: "Waiting Charge", value: "$08" },
    ],
  },
] as const;

export const popularCategories = [
  { name: "Sports Coupe", count: 3, href: "/cars" },
  { name: "Crossover", count: 5, href: "/cars" },
  { name: "Pickup", count: 8, href: "/cars" },
  { name: "Family MPV", count: 6, href: "/cars" },
  { name: "Sedan", count: 9, href: "/cars" },
  { name: "Electric", count: 4, href: "/cars" },
] as const;

export const testimonials = [
  {
    name: "Bhismar Bhizz",
    role: "Customer",
    text: "Smooth booking process with Max Travels. The rental car was spotless and pickup took less than ten minutes at the Thoothukudi airport branch.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVhK7YkxgeUrZVZs4HuMUj4CMoTdLbSROI5FIC6lo_sPxWQv7rU=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    name: "Shrikant Adhini",
    role: "Customer",
    text: "Great value for a week-long car rental in Thoothukudi. The Max Travels staff explained all rental insurance choices clearly with no hidden fees.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWzICjCbT7dw1cZN_Z0sq_kIifDwwmSiEMk-KiDCnANubk95A1b=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "1 month ago",
  },
  {
    name: "Divya Sri",
    role: "Customer",
    text: "Easily the best cab service in Thoothukudi and Coimbatore! Always on time, clean cars, and very polite drivers. Highly recommended for local trips.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjX6hGgsJfHXfmwIioR8j1WcgOkf90yhJgCNYMrH8YoHph6m4fQ=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "3 days ago",
  },
  {
    name: "Natarajan M",
    role: "Customer",
    text: "Used Max Travels for a corporate event fleet in Tuticorin. Every driver arrived right on time and the vehicles provided were premium grade.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjU2zWOnP521FQvNd9lpyYSlEhlVByGVhkPJxx9O0t4TCFQT_wY=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    name: "Sheik Mohideen",
    role: "Customer",
    text: "Their mobile-friendly checkout made booking our outstation taxi from Thoothukudi incredibly easy. Will definitely use Max Travels again for our next road trip.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWyWSMAFtNo1W0JFLYFIHF_1E0qYbcMtNxGGDCyGVwpuBg5G7sP=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "2 months ago",
  },
  {
    name: "athi narayanan",
    role: "Customer",
    text: "Excellent service from start to finish. If you need a reliable travel agency in Thoothukudi, Max Travels is the way to go. Professional driver and immaculate vehicle.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjV98bLRh3TWUl0l1DgJukr5JsmOvI4H72fE_tPUKLG5KGK_2KGOXw=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "1 week ago",
  },
  {
    name: " Suresh Kumar",
    role: "Customer",
    text: "Used Max Travels for Thoothukudi airport transfers multiple times. They are never late. Superb reliability for airport taxi drops.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjUwnCEy28qJSqEueQUdHY3gij51tYLqIUOG2R85iq2flRrtakgm=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "5 days ago",
  },
  {
    name: "Sri dhar",
    role: "Customer",
    text: "Wonderful experience booking a family trip tour package. Max Travels arranged everything perfectly for our travel from Tuticorin. Very comfortable ride.",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWiScmcKQsYlG4mAFQ_e79ro69Lp4MdHSYojcR39P76lzZ5OrVe=w144-h144-p-rp-mo-br100",
    rating: 5,
    date: "2 weeks ago",
  },
];

export const faqs = [
  {
    question: "How old do I need to be to rent a car?",
    answer:
      "Drivers must be at least 21 years old. Drivers under 25 may incur a young-driver surcharge depending on vehicle class.",
  },
  {
    question: "What documents do I need to rent a car?",
    answer:
      "A valid driver's license, government-issued ID, and a credit or debit card in the renter's name are required at pickup.",
  },
  {
    question: "What types of vehicles are available for rent?",
    answer:
      "We offer sedans, SUVs, luxury cars, vans, and electric vehicles. Availability varies by location and season.",
  },
  {
    question: "Can I rent a car with a debit card?",
    answer:
      "Yes, at participating locations. A security hold may apply and additional verification steps can be required.",
  },
  {
    question: "What is your fuel policy?",
    answer:
      "Most rentals use a full-to-full policy. Return the vehicle with the same fuel level to avoid refueling charges.",
  },
] as const;

export const teamMembers = [
  {
    name: "Olivia Grace",
    role: "Sr. Driver",
    years: "05",
    thumb:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  },
  {
    name: "Olivia Smith",
    role: "Premium Driver",
    years: "08",
    thumb:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
  },
  {
    name: "James Olivia",
    role: "Jr. Driver",
    years: "04",
    thumb:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
  },
  {
    name: "Jason Ray",
    role: "Sr. Driver",
    years: "07",
    thumb:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
  },
  {
    name: "James Vince",
    role: "Service Coordinator",
    years: "03",
    thumb:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
  },
] as const;

export const blogPosts = [
  {
    title: "Documents required for car rental services",
    excerpt:
      "Know which IDs and payment methods to bring for a faster checkout experience.",
    date: { day: "10", month: "Nov" },
    tag: "Car Showcase",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  },
  {
    title: "Effective car rental blog topics for your fleet",
    excerpt:
      "Content ideas that help customers compare plans and choose the right vehicle.",
    date: { day: "12", month: "Nov" },
    tag: "Guides",
    image:
      "https://images.unsplash.com/photo-148529157115f-77046a4775ea?w=800&q=80",
  },
  {
    title: "Rental cost of sport and luxury cars explained",
    excerpt:
      "How daily rates, deposits, and insurance affect premium vehicle pricing.",
    date: { day: "15", month: "Nov" },
    tag: "Pricing",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
] as const;

export const galleryImages = [
  "https://images.unsplash.com/photo-1494976388531-d1058498bdd8?w=600&q=80",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
  "https://images.unsplash.com/photo-1619767886555-ef6afc3f097f?w=600&q=80",
  "https://images.unsplash.com/photo-1616422285623-13f39b62d166?w=600&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
] as const;

export const brandLogos = [
  "Toyota",
  "BMW",
  "Audi",
  "Ford",
  "Honda",
  "Mercedes",
] as const;
