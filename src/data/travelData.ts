export interface DestinationItem {
  id: string;
  name: string;
  tagline: string;
  state: string;
  region: 'Himalayas' | 'Beaches' | 'Heritage' | 'Spiritual' | 'Backwaters';
  description: string;
  imageUrl: string;
  bestSeason: string;
  popularActivities: string[];
  startingPriceINR: number;
  rating: number;
}

export interface HotelItem {
  id: string;
  name: string;
  destination: string;
  location: string;
  stars: number;
  rating: number;
  reviewsCount: number;
  pricePerNightINR: number;
  imageUrl: string;
  amenities: string[];
  description: string;
}

export interface AdventureItem {
  id: string;
  title: string;
  destination: string;
  category: 'Water' | 'Air' | 'Snow' | 'Trek' | 'Camping';
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Thrilling';
  duration: string;
  priceINR: number;
  imageUrl: string;
  description: string;
  safetyEquipment: string;
}

export interface GuideItem {
  id: string;
  name: string;
  destination: string;
  location: string;
  phone: string;
  email: string;
  experienceYears: number;
  languages: string[];
  vehicleModel: string;
  vehicleType: string;
  vehicleCapacity: number;
  pricePerDayINR: number;
  avatarUrl: string;
}

export interface FoodItem {
  id: string;
  name: string;
  region: string;
  category: 'Vegetarian' | 'Non-Vegetarian' | 'Dessert' | 'Snack';
  priceINR: number;
  imageUrl: string;
  description: string;
  highlight: string;
}

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'shimla',
    name: 'Shimla',
    tagline: 'Queen of the Hills',
    state: 'Himachal Pradesh',
    region: 'Himalayas',
    description: 'Colonial charm, snow-dusted Himalayan peaks, the bustling Mall Road, and the historic Kalka-Shimla toy train.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Oct - Jun (Snow in Dec-Feb)',
    popularActivities: ['Trekking', 'Mall Road Stroll', 'Toy Train', 'Jakhoo Temple'],
    startingPriceINR: 7999,
    rating: 4.8,
  },
  {
    id: 'manali',
    name: 'Manali',
    tagline: 'The Valley of the Gods',
    state: 'Himachal Pradesh',
    region: 'Himalayas',
    description: 'Adventure hub nestled in the Pir Panjal range, famous for Solang Valley snow sports, Atal Tunnel, and Old Manali cafes.',
    imageUrl: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Sep - Jun',
    popularActivities: ['Skiing', 'Paragliding', 'River Rafting', 'Atal Tunnel'],
    startingPriceINR: 8999,
    rating: 4.9,
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    tagline: 'Yoga Capital & Adventure Gateway',
    state: 'Uttarakhand',
    region: 'Spiritual',
    description: 'Sacred Ganga waters, majestic Himalayan foothills, evening Triveni Aarti, thrilling whitewater rapids, and yoga ashrams.',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Sep - May',
    popularActivities: ['River Rafting', 'Bungee Jump', 'Riverside Camping', 'Ganga Aarti'],
    startingPriceINR: 5499,
    rating: 4.8,
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    tagline: 'Gateway to the Gods',
    state: 'Uttarakhand',
    region: 'Spiritual',
    description: 'Vibrant pilgrimage city on the banks of holy Ganga, famous for magical evening Aarti at Har Ki Pauri and historic temples.',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Oct - Apr',
    popularActivities: ['Har Ki Pauri', 'Mansa Devi Cable Car', 'Spiritual Walks', 'Street Food'],
    startingPriceINR: 4999,
    rating: 4.7,
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    tagline: 'The Middle Land of Cold Desert',
    state: 'Himachal Pradesh',
    region: 'Himalayas',
    description: 'High-altitude cold desert mountains, ancient Key Monastery, highest post office at Hikkim, and clear starry night skies.',
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'May - Oct',
    popularActivities: ['Monastery Trails', 'Stargazing', 'Chandar Taal Trek', 'Fossil Hunting'],
    startingPriceINR: 14999,
    rating: 4.9,
  },
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Sun, Sand, Waves & Portuguese Heritage',
    state: 'Goa',
    region: 'Beaches',
    description: 'Golden sandy beaches, vibrant shacks, water adventures, Portuguese architecture, and electric coastal nightlife.',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Nov - Mar',
    popularActivities: ['Scuba Diving', 'Sunset Cruise', 'Fort Aguada', 'Beach Parties'],
    startingPriceINR: 9499,
    rating: 4.7,
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    tagline: 'Paradise on Earth',
    state: 'Jammu & Kashmir',
    region: 'Himalayas',
    description: 'Dal Lake shikaras, Gulmarg snow meadows, Pahalgam pine valleys, and warm saffron-infused Kahwa tea.',
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'All Year (Snow in Dec-Feb)',
    popularActivities: ['Shikara Ride', 'Gulmarg Gondola', 'Betaab Valley', 'Mughal Gardens'],
    startingPriceINR: 16999,
    rating: 4.9,
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    tagline: 'The Royal Pink City',
    state: 'Rajasthan',
    region: 'Heritage',
    description: 'Majestic Amber Fort, Hawa Mahal, royal palaces, block-print handicrafts, and royal Rajasthani thalis.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Oct - Mar',
    popularActivities: ['Amer Fort Elephant Tour', 'City Palace', 'Chokhi Dhani', 'Bazaar Walk'],
    startingPriceINR: 6999,
    rating: 4.8,
  },
  {
    id: 'kerala',
    name: 'Kerala',
    tagline: "God's Own Country",
    state: 'Kerala',
    region: 'Backwaters',
    description: 'Tranquil Alleppey houseboats, misty Munnar tea plantations, Kovalam beaches, and authentic Ayurvedic wellness.',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    bestSeason: 'Sep - Mar',
    popularActivities: ['Houseboat Cruise', 'Tea Garden Walks', 'Kathakali Show', 'Ayurvedic Spa'],
    startingPriceINR: 11999,
    rating: 4.9,
  },
];

export const HOTELS: HotelItem[] = [
  {
    id: 'h-shimla-1',
    name: 'Mountain View Hotel',
    destination: 'Shimla',
    location: 'Mall Road, Shimla, Himachal Pradesh',
    stars: 4.5,
    rating: 4.5,
    reviewsCount: 384,
    pricePerNightINR: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Mountain View Balcony', 'Free High-speed Wi-Fi', '24/7 Room Service', 'Heated Rooms', 'Multi-cuisine Dining'],
    description: 'Enjoy a comfortable stay with panoramic mountain views in Shimla, located minutes from the historic Ridge.',
  },
  {
    id: 'h-shimla-2',
    name: 'Snow Valley Resort',
    destination: 'Shimla',
    location: 'Ghora Chowki, Shimla, Himachal Pradesh',
    stars: 4.3,
    rating: 4.3,
    reviewsCount: 512,
    pricePerNightINR: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Valley Terrace', 'Complimentary Buffet Breakfast', 'Bonfire Evenings', 'Indoor Games Room', 'Free Parking'],
    description: 'Relax in a peaceful resort surrounded by the picturesque pine hills and apple groves of Shimla.',
  },
  {
    id: 'h-shimla-3',
    name: 'Hilltop Residency',
    destination: 'Shimla',
    location: 'Chotta Shimla, Himachal Pradesh',
    stars: 4.2,
    rating: 4.2,
    reviewsCount: 290,
    pricePerNightINR: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Spacious Family Suites', 'In-house Cafe', 'Valley Sun Deck', 'Airport / Station Pickup', 'Doctor on Call'],
    description: 'A cozy, comfortable boutique hotel for families and couples visiting Shimla.',
  },
  {
    id: 'h-manali-1',
    name: 'Snow Peak Resort',
    destination: 'Manali',
    location: 'Naggar Road, Aleo, Manali, HP',
    stars: 4.6,
    rating: 4.6,
    reviewsCount: 640,
    pricePerNightINR: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    amenities: ['Snow Peak Balconies', 'Heated Wooden Flooring', 'Live Barbecue', 'Trek Guide Desk', 'Spa & Wellness'],
    description: 'Stay close to pine forests and wake up to breathtaking snow-capped Himalayan peaks.',
  },
  {
    id: 'h-manali-2',
    name: 'Valley View Resort',
    destination: 'Manali',
    location: 'Old Manali, Himachal Pradesh',
    stars: 4.4,
    rating: 4.4,
    reviewsCount: 420,
    pricePerNightINR: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    amenities: ['Riverside Garden', 'Organic Cafe', 'Acoustic Evenings', 'Bike Rental Station', 'Scenic Workstations'],
    description: 'Comfortable rooms with a scenic valley panorama, perfect for both adventure travelers and digital nomads.',
  },
  {
    id: 'h-rishikesh-1',
    name: 'Ganga View Hotel & Spa',
    destination: 'Rishikesh',
    location: 'Tapovan, Rishikesh, Uttarakhand',
    stars: 4.5,
    rating: 4.5,
    reviewsCount: 780,
    pricePerNightINR: 2700,
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
    amenities: ['Holy Ganga River View', 'Rooftop Yoga Shala', 'Pure Veg Ayurvedic Buffet', 'Rafting Booking Hub', 'Meditation Lawn'],
    description: 'Enjoy a peaceful stay near the sacred Ganga and immerse yourself in the spiritual calm of Rishikesh.',
  },
];

export const ADVENTURES: AdventureItem[] = [
  // Rishikesh
  {
    id: 'adv-rishi-1',
    title: 'River Rafting (16 KM Shivpuri)',
    destination: 'Rishikesh',
    category: 'Water',
    difficulty: 'Thrilling',
    duration: '3.5 Hours',
    priceINR: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
    description: 'Enjoy an adrenaline-pumping rafting experience through the famous Class III & IV rapids of the sacred Ganga (Roller Coaster, Golf Course).',
    safetyEquipment: 'Imported life jackets, helmets, safety kayaks, certified river guides',
  },
  {
    id: 'adv-rishi-2',
    title: 'Bungee Jumping (83m Jump Platform)',
    destination: 'Rishikesh',
    category: 'Air',
    difficulty: 'Challenging',
    duration: '2 Hours',
    priceINR: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Feel the ultimate adrenaline rush by jumping from India’s highest fixed cantilever platform amidst stunning cliffs.',
    safetyEquipment: 'Triple-check harness system operated by ex-NZ jump masters',
  },
  {
    id: 'adv-rishi-3',
    title: 'Riverside Luxury Camping & Bonfire',
    destination: 'Rishikesh',
    category: 'Camping',
    difficulty: 'Easy',
    duration: 'Overnight (2D/1N)',
    priceINR: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    description: 'Experience tranquil camping directly beside the river, surrounded by forested hills, stargazing, music, and volleyball.',
    safetyEquipment: 'Weatherproof Swiss alpine tents, 24/7 security, first-aid kits',
  },
  // Shimla
  {
    id: 'adv-shimla-1',
    title: 'Mountain Trekking (Shali Tibba Trail)',
    destination: 'Shimla',
    category: 'Trek',
    difficulty: 'Moderate',
    duration: '5 Hours',
    priceINR: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    description: 'Explore scenic trails through dense pine and deodar forests, reaching high vantage peaks overlooking the entire Shimla valley.',
    safetyEquipment: 'Trekking poles, GPS tracking, experienced mountain escort',
  },
  {
    id: 'adv-shimla-2',
    title: 'High-Altitude Paragliding',
    destination: 'Shimla',
    category: 'Air',
    difficulty: 'Thrilling',
    duration: '25 Mins Flight',
    priceINR: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80',
    description: 'Soar like a bird high above emerald mountain valleys and snow-touched ridges with a tandem certified pilot.',
    safetyEquipment: 'Reserve chute, certified tandem pilot, full-face protective helmet',
  },
  {
    id: 'adv-shimla-3',
    title: 'Mountain Cedar Camping & Barbecue',
    destination: 'Shimla',
    category: 'Camping',
    difficulty: 'Easy',
    duration: 'Overnight',
    priceINR: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    description: 'Camp beneath ancient cedar woods under a blanket of stars with live acoustic guitar and warm Himachali food.',
    safetyEquipment: 'Insulated sleeping bags, heated dining tent, camp warden',
  },
  // Manali
  {
    id: 'adv-manali-1',
    title: 'Skiing & Snowboarding at Solang Valley',
    destination: 'Manali',
    category: 'Snow',
    difficulty: 'Moderate',
    duration: '3 Hours',
    priceINR: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
    description: 'Glide effortlessly across sparkling snow slopes in Solang Valley with coaching and high-grade ski equipment.',
    safetyEquipment: 'Pro skis, safety bindings, goggles, knee/elbow pads, licensed trainer',
  },
  {
    id: 'adv-manali-2',
    title: 'Beas River Rafting',
    destination: 'Manali',
    category: 'Water',
    difficulty: 'Thrilling',
    duration: '2 Hours',
    priceINR: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    description: 'Raft along the roaring glacial waters of Beas River with scenic pine valley views on either side.',
    safetyEquipment: 'Life vests, safety rescue ropes, certified river steersman',
  },
  {
    id: 'adv-manali-3',
    title: 'Tandem Paragliding over Solang Slopes',
    destination: 'Manali',
    category: 'Air',
    difficulty: 'Moderate',
    duration: '20 Mins',
    priceINR: 2600,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'Catch mountain thermals and glide peacefully over the magnificent Himalayan panorama of Kullu-Manali.',
    safetyEquipment: 'Dual-harness parachute with GoPro video recording option',
  },
];

export const GUIDES: GuideItem[] = [
  {
    id: 'g-1',
    name: 'Rahul Sharma',
    destination: 'Rishikesh',
    location: 'Rishikesh, Uttarakhand',
    phone: '+91 90000 00001',
    email: 'rahul@smarttourism.com',
    experienceYears: 7,
    languages: ['Hindi', 'English', 'Garhwali'],
    vehicleModel: 'Maruti Swift Dzire',
    vehicleType: 'Sedan (AC)',
    vehicleCapacity: 4,
    pricePerDayINR: 2500,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-2',
    name: 'Aman Verma',
    destination: 'Rishikesh',
    location: 'Rishikesh, Uttarakhand',
    phone: '+91 90000 00002',
    email: 'aman@smarttourism.com',
    experienceYears: 6,
    languages: ['Hindi', 'English'],
    vehicleModel: 'Hyundai Creta',
    vehicleType: 'Compact SUV (AC)',
    vehicleCapacity: 5,
    pricePerDayINR: 3200,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-3',
    name: 'Neha Singh',
    destination: 'Rishikesh',
    location: 'Rishikesh, Uttarakhand',
    phone: '+91 90000 00003',
    email: 'neha@smarttourism.com',
    experienceYears: 9,
    languages: ['Hindi', 'English', 'Punjabi'],
    vehicleModel: 'Force Tempo Traveller',
    vehicleType: 'Mini Bus (AC)',
    vehicleCapacity: 12,
    pricePerDayINR: 5500,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-4',
    name: 'Arjun Thakur',
    destination: 'Manali',
    location: 'Manali, Himachal Pradesh',
    phone: '+91 90000 00004',
    email: 'arjun@smarttourism.com',
    experienceYears: 8,
    languages: ['Hindi', 'English', 'Himachali'],
    vehicleModel: 'Toyota Innova Crysta',
    vehicleType: 'Premium MPV',
    vehicleCapacity: 7,
    pricePerDayINR: 4000,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-5',
    name: 'Vikram Singh',
    destination: 'Manali',
    location: 'Manali, Himachal Pradesh',
    phone: '+91 90000 00005',
    email: 'vikram@smarttourism.com',
    experienceYears: 5,
    languages: ['Hindi', 'English'],
    vehicleModel: 'Mahindra Thar 4x4',
    vehicleType: 'Off-road 4WD',
    vehicleCapacity: 4,
    pricePerDayINR: 3500,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-6',
    name: 'Priya Sharma',
    destination: 'Manali',
    location: 'Manali, Himachal Pradesh',
    phone: '+91 90000 00006',
    email: 'priya@smarttourism.com',
    experienceYears: 10,
    languages: ['Hindi', 'English'],
    vehicleModel: 'Force Tempo Traveller',
    vehicleType: 'Group Traveller',
    vehicleCapacity: 12,
    pricePerDayINR: 6000,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-7',
    name: 'Rohit Kumar',
    destination: 'Shimla',
    location: 'Shimla, Himachal Pradesh',
    phone: '+91 90000 00007',
    email: 'rohit@smarttourism.com',
    experienceYears: 7,
    languages: ['Hindi', 'English', 'Himachali'],
    vehicleModel: 'Maruti Ertiga',
    vehicleType: 'Family MUV',
    vehicleCapacity: 6,
    pricePerDayINR: 3500,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-8',
    name: 'Karan Mehta',
    destination: 'Shimla',
    location: 'Shimla, Himachal Pradesh',
    phone: '+91 90000 00008',
    email: 'karan@smarttourism.com',
    experienceYears: 6,
    languages: ['Hindi', 'English'],
    vehicleModel: 'Hyundai Creta',
    vehicleType: 'Compact SUV',
    vehicleCapacity: 5,
    pricePerDayINR: 3200,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-9',
    name: 'Anjali Kapoor',
    destination: 'Shimla',
    location: 'Shimla, Himachal Pradesh',
    phone: '+91 90000 00009',
    email: 'anjali@smarttourism.com',
    experienceYears: 8,
    languages: ['Hindi', 'English'],
    vehicleModel: 'Force Tempo Traveller Luxury',
    vehicleType: 'Luxury Group Van',
    vehicleCapacity: 12,
    pricePerDayINR: 5800,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-10',
    name: 'Mohit Gupta',
    destination: 'Shimla',
    location: 'Shimla, Himachal Pradesh',
    phone: '+91 90000 00010',
    email: 'mohit@smarttourism.com',
    experienceYears: 11,
    languages: ['Hindi', 'English', 'Punjabi'],
    vehicleModel: 'Toyota Innova Crysta',
    vehicleType: 'Premium MPV',
    vehicleCapacity: 7,
    pricePerDayINR: 4200,
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-11',
    name: 'Deepak Rawat',
    destination: 'Rishikesh',
    location: 'Rishikesh, Uttarakhand',
    phone: '+91 90000 00011',
    email: 'deepak@smarttourism.com',
    experienceYears: 6,
    languages: ['Hindi', 'English', 'Garhwali'],
    vehicleModel: 'Maruti Ertiga',
    vehicleType: 'Family MPV',
    vehicleCapacity: 6,
    pricePerDayINR: 3000,
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'g-12',
    name: 'Ravi Negi',
    destination: 'Manali',
    location: 'Manali, Himachal Pradesh',
    phone: '+91 90000 00012',
    email: 'ravi@smarttourism.com',
    experienceYears: 9,
    languages: ['Hindi', 'English', 'Himachali'],
    vehicleModel: 'Mahindra XUV700 (AWD)',
    vehicleType: 'Luxury 7-seater SUV',
    vehicleCapacity: 7,
    pricePerDayINR: 4500,
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
  },
];

export const FOODS: FoodItem[] = [
  {
    id: 'f-1',
    name: 'Traditional Siddu',
    region: 'Shimla & Himachal Pradesh',
    category: 'Vegetarian',
    priceINR: 120,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    description: 'A traditional Himachali steamed wheat delicacy stuffed with walnuts, poppy seeds, spices, and dipped generously in warm clarified butter (pure desi ghee).',
    highlight: 'Himachali Signature Delicacy',
  },
  {
    id: 'f-2',
    name: 'Chana Madra',
    region: 'Himachal Pradesh',
    category: 'Vegetarian',
    priceINR: 180,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    description: 'A popular festival curry prepared with tender white chickpeas simmered slowly in rich spiced yogurt, raisins, and aromatic cardamom gravy.',
    highlight: 'Festive Classic',
  },
  {
    id: 'f-3',
    name: 'Himachali Royal Dham',
    region: 'Himachal Pradesh',
    category: 'Vegetarian',
    priceINR: 250,
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    description: 'A traditional royal feast served on leaves consisting of fragrant basmati rice, sepubari, mah ki dal, rajma madra, and kadi.',
    highlight: 'Complete Cultural Thali',
  },
  {
    id: 'f-4',
    name: 'Steamed Shimla Momos',
    region: 'Shimla & Hills',
    category: 'Snack',
    priceINR: 100,
    imageUrl: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80',
    description: 'Hot and succulent steamed mountain dumplings packed with fresh mountain vegetables and served with fiery red chili-garlic chutney.',
    highlight: 'Mountain Comfort Food',
  },
  {
    id: 'f-5',
    name: 'Chha Gosht (Mutton)',
    region: 'Himachal Pradesh',
    category: 'Non-Vegetarian',
    priceINR: 300,
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80',
    description: 'A traditional slow-cooked Himachali mutton curry marinated in gram flour and rich yogurt gravy with whole spices and ginger.',
    highlight: 'Rich Traditional Recipe',
  },
  {
    id: 'f-6',
    name: 'Sweet Mittha (Meetha Chawal)',
    region: 'Himachal Pradesh',
    category: 'Dessert',
    priceINR: 150,
    imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
    description: 'A celebratory sweet rice preparation infused with saffron, dry fruits, raisins, almonds, and aromatic spices.',
    highlight: 'Sweet Finale',
  },
];
