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
    title: "Corporate Car Rental in Thoothukudi",
    description:
      "Reliable fleet solutions for businesses in Tuticorin and across Tamil Nadu. Flexible contracts, dedicated account support, and on-time corporate travel every trip.",
  },
  {
    icon: "taxi",
    title: "Cab with Driver – Thoothukudi & Nearby",
    description:
      "Experienced, verified drivers for airport transfers, weddings, and executive travel in Thoothukudi, Tirunelveli, and beyond.",
  },
  {
    icon: "sport",
    title: "Airport Transfer – Tuticorin Airport",
    description:
      "Punctual pickups and drop-offs at Thoothukudi Airport with real-time flight tracking and courteous meet-and-greet service.",
  },
  {
    icon: "insurance",
    title: "Outstation Cab from Thoothukudi",
    description:
      "Comfortable outstation taxi packages from Tuticorin to Chennai, Madurai, Coimbatore, Tirunelveli, and all major Tamil Nadu destinations.",
  },
] as const;

export const processSteps = [
  {
    title: "Choose Your Car",
    description:
      "Pick from sedans, MUVs, and Tempo Travellers suited for local Thoothukudi trips or long outstation routes across Tamil Nadu.",
    image:
      "https://cdn.shopify.com/s/files/1/0843/2612/1760/files/Gemini_Generated_Image_urvlgpurvlgpurvl.jpg?v=1746792608",
  },
  {
    title: "Book in Minutes",
    description:
      "Call or WhatsApp us instantly to confirm your cab in Thoothukudi. Fast booking, transparent pricing, zero hidden charges.",
    image:
      "https://images.unsplash.com/photo-1719937206224-602b1db4d883?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Pickup Across Thoothukudi",
    description:
      "We pick you up anywhere in Tuticorin — home, office, hospital, or Thoothukudi Railway Station. Doorstep cab service available.",
    image:
      "https://images.unsplash.com/photo-1620691537282-83d320806644?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Ride Safe, Ride Comfortable",
    description:
      "Travel with full insurance coverage and 24/7 roadside assistance on every Max Travels cab across Tamil Nadu.",
    image:
      "https://images.unsplash.com/photo-1541570213932-8cd806e3f8f6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
] as const;

export const whyChoose = [
  {
    title: "Best Cab Service in Thoothukudi",
    description:
      "Rated #1 car travels in Tuticorin for on-time pickup, clean vehicles, and lowest outstation fares across Tamil Nadu.",
  },
  {
    title: "Multiple Pickup Points in Tuticorin",
    description:
      "We serve all areas of Thoothukudi — Tiruchendur Road, Millerpuram, Bryant Nagar, VOC Port area, and surrounding towns.",
  },
  {
    title: "Trusted by Thousands in Tamil Nadu",
    description:
      "Hundreds of 5-star reviews from local customers. Transparent billing, professional drivers, and flexible cancellation for every booking.",
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

export type CarType = "Sedan" | "MUV" | "Tempo Van";

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

export const carTypes: CarType[] = ["Sedan", "MUV", "Tempo Van"];

export const cars: Car[] = [
  // ── Sedan ──────────────────────────────────────────────
  {
    brand: "Maruti",
    name: "Swift Dzire",
    price: 2500,
    originalPrice: 2700,
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
    originalPrice: 3050,
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
    originalPrice: 2700,
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

  // ── MUV ────────────────────────────────────────────────
  {
    brand: "Toyota",
    name: "Innova Crysta",
    price: 4500,
    originalPrice: 4750,
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: "7 Persons",
    type: "MUV",
    ac: true,
    image:
      "https://imgd.aeplcdn.com/600x600/n/cw/ec/145675/toyota-innova-crysta-left-front-three-quarter0.jpeg?isig=0&wm=0",
  },
  {
    brand: "Toyota",
    name: "Innova",
    price: 4000,
    originalPrice: 4200,
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Manual",
    fuel: "Diesel",
    seats: "7 Persons",
    type: "MUV",
    ac: true,
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Toyota-Innova/1174/1544523709266/front-left-side-47.jpg",
  },
  {
    brand: "Kia",
    name: "Carens",
    price: 3500,
    originalPrice: 3700,
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "7 Persons",
    type: "MUV",
    ac: true,
    image:
      "https://cdn-s3.autocarindia.com/legacy/cdni/mmv_images/colors/20250808114708_Kia_Carens_Clear_White%5B1%5D.png?w=640&q=75",
  },
  {
    brand: "Maruti",
    name: "Ertiga  (AC)",
    price: 3800,
    originalPrice: 3950,
    hours: "12 hr",
    km: 80,
    extraPerKm: 13,
    transmission: "Manual",
    fuel: "Petrol",
    seats: "7 Persons",
    type: "MUV",
    ac: true,
    image:
      "https://i.pinimg.com/736x/89/32/c0/8932c0e6bacc17f73c4d64aa6aa4ff5b.jpg",
  },

  // ── Tempo Van ──────────────────────────────────────────
  {
    brand: "Force",
    name: "Tempo Traveller (AC)",
    price: 6000,
    originalPrice: 6200,
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
    originalPrice: 5700,
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
    price: 199,
    description:
      "Perfect for short city rides within Thoothukudi. Affordable metered fares with quick dispatch anywhere in Tuticorin.",
    icon: "taxi",
    features: [
      { label: "Initial charge", value: "₹40" },
      { label: "Additional Kilometre", value: "₹13" },
      { label: "Per minute stopped traffic", value: "₹1.50" },
      { label: "Waiting Charge", value: "₹02" },
    ],
  },
  {
    name: "Urban Cabs",
    price: 499,
    description:
      "Ideal for daily commuters and outstation trips from Thoothukudi to Tirunelveli, Madurai, and nearby Tamil Nadu cities.",
    icon: "MUV",
    features: [
      { label: "Initial charge", value: "₹50" },
      { label: "Additional Kilometre", value: "₹15" },
      { label: "Per minute stopped traffic", value: "₹02" },
      { label: "Waiting Charge", value: "₹2.50" },
    ],
  },
  {
    name: "TurboTaxi",
    price: 999,
    description:
      "Premium cab service in Thoothukudi with luxury vehicles, professional drivers, and dedicated 24/7 customer support for corporate and VIP travel.",
    icon: "jeep",
    features: [
      { label: "Initial charge", value: "₹70" },
      { label: "Additional Kilometre", value: "₹20" },
      { label: "Per minute stopped traffic", value: "₹2.50" },
      { label: "Waiting Charge", value: "₹03" },
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
    question: "Which areas in Thoothukudi do you serve?",
    answer:
      "Max Travels covers all of Thoothukudi district including Tuticorin city, Tiruchendur, Kovilpatti, Ettayapuram, VOC Port area, Millerpuram, and all nearby towns. We also operate outstation cabs to Tirunelveli, Madurai, Chennai, and all major Tamil Nadu cities.",
  },
  {
    question: "What documents do I need to book a cab in Thoothukudi?",
    answer:
      "A valid Aadhaar card or government-issued ID is sufficient for booking. For self-drive rentals, a valid Indian driver's licence is required at the time of pickup.",
  },
  {
    question: "Do you offer outstation taxi service from Thoothukudi?",
    answer:
      "Yes! We provide outstation cab service from Thoothukudi to all Tamil Nadu destinations — Madurai, Chennai, Coimbatore, Tirunelveli, Kanyakumari, Rameswaram, and more. One-way and round-trip packages available.",
  },
  {
    question: "Can I book a cab for Thoothukudi Airport transfer?",
    answer:
      "Absolutely. We specialise in Thoothukudi Airport (VOC Airport) pickups and drops. Our drivers track your flight in real time so you never have to wait.",
  },
  {
    question: "What is your fuel policy for outstation trips?",
    answer:
      "All our outstation packages from Thoothukudi are inclusive of fuel. The quoted price covers fuel charges — no surprise billing at the end of your trip.",
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
    title: "Documents Required to Book a Cab in Thoothukudi",
    excerpt:
      "Booking a car travels service in Tuticorin is fast and simple. Here's exactly which ID proofs and payment methods you need for same-day cab booking in Thoothukudi.",
    date: { day: "10", month: "Nov" },
    tag: "Car Showcase",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  },
  {
    title: "Best Outstation Cab Routes from Thoothukudi in Tamil Nadu",
    excerpt:
      "Planning a trip from Thoothukudi? Explore the most popular outstation taxi routes to Madurai, Kanyakumari, Chennai, and Tirunelveli with Max Travels — the most trusted car travels in Tuticorin.",
    date: { day: "12", month: "Nov" },
    tag: "Guides",
    image:
      "https://images.unsplash.com/photo-1532931899774-fbd4de0008fb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Sedan vs Innova: Which Cab is Right for Your Thoothukudi Trip?",
    excerpt:
      "Confused between a sedan and an Innova Crysta for your next trip from Thoothukudi? Compare seating, comfort, and per-km rates to choose the best car travels option for your family or group.",
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