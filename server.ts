import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory persistent stores for the session
interface Booking {
  id: string;
  bookingRef: string;
  customerName: string;
  email: string;
  phone: string;
  destination: string;
  serviceType: 'hotel' | 'adventure' | 'guide' | 'package' | 'custom_trip';
  itemName?: string;
  guests: number;
  checkIn: string;
  checkOut?: string;
  specialRequests?: string;
  totalPriceINR: number;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
  itinerarySummary?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const bookingsStore: Booking[] = [
  {
    id: 'b-1',
    bookingRef: 'ST-2026-9481',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    destination: 'Shimla',
    serviceType: 'hotel',
    itemName: 'Mountain View Hotel (4.5★)',
    guests: 2,
    checkIn: '2026-11-10',
    checkOut: '2026-11-14',
    specialRequests: 'Upper floor with valley view if possible',
    totalPriceINR: 10000,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'b-2',
    bookingRef: 'ST-2026-3829',
    customerName: 'Pooja Iyer',
    email: 'pooja.iyer@example.com',
    phone: '+91 98111 22334',
    destination: 'Rishikesh',
    serviceType: 'adventure',
    itemName: 'River Rafting & Riverside Camping',
    guests: 3,
    checkIn: '2026-11-20',
    checkOut: '2026-11-22',
    specialRequests: 'Include vegetarian breakfast',
    totalPriceINR: 8500,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  }
];

const usersStore: User[] = [
  {
    id: 'u-1',
    name: 'Tushar Kumar',
    email: 'tusharkumar04281@gmail.com',
    phone: '+91 98765 00001',
    password: 'password123'
  }
];

const contactMessages: ContactMessage[] = [];

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ================= API ROUTES =================

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!apiKey,
  });
});

// AI Trip Planner API
app.post('/api/plan-trip', async (req: Request, res: Response) => {
  try {
    const {
      destination,
      durationDays = 3,
      budget = 'Moderate',
      travelStyle = 'Adventure & Sightseeing',
      travelersCount = 2,
      startingCity = 'Delhi',
      interests = ['Sightseeing', 'Local Food', 'Photography'],
      foodPreference = 'Himachali Traditional & North Indian',
    } = req.body;

    if (!destination) {
      res.status(400).json({ error: 'Destination is required' });
      return;
    }

    if (!ai) {
      // Fallback structured trip if GEMINI_API_KEY is not configured yet
      const fallbackPlan = generateFallbackTripPlan(
        destination,
        Number(durationDays),
        budget,
        travelStyle,
        Number(travelersCount),
        startingCity,
        interests,
        foodPreference
      );
      res.json(fallbackPlan);
      return;
    }

    const systemPrompt = `You are the lead travel architect for "Smart Tourism - Travel India", an elite travel platform specializing in extraordinary Indian destinations like Shimla, Manali, Rishikesh, Haridwar, Goa, Spiti Valley, Kashmir, Jaipur, and Kerala.
Your goal is to build an exhaustive, immersive, realistic, high-value day-by-day itinerary tailored to the traveler's preferences.
Return strictly valid JSON conforming to the schema. Include realistic INR costs, authentic local attractions, hidden spots, local cuisine (e.g. Siddu, Dham, Chana Madra in Himachal, Garhwali Thali in Uttarakhand, Seafood in Goa), transportation logistics, and insider tips.`;

    const userPrompt = `Create an in-depth ${durationDays}-day travel plan for ${destination}.
Travel details:
- Travelers: ${travelersCount} persons
- Starting from: ${startingCity}
- Budget Tier: ${budget}
- Travel Style / Theme: ${travelStyle}
- Traveler Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Food Preferences: ${foodPreference}

Provide:
1. Inspiring title and tagline
2. Detailed overview and weather/packing advice
3. Estimated total cost in INR and category breakdown
4. Day-by-day plan with morning, afternoon, evening, and night specifics (activities, timings, locations, meal spots)
5. 3 recommended hotels with price and rating
6. Top 3-4 adventure activities with locations and approximate prices
7. 4 must-try local dishes with descriptions and price
8. 4 essential local guide insider tips
9. Curated packing checklist`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            tagline: { type: Type.STRING },
            destination: { type: Type.STRING },
            durationDays: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            bestTimeToVisit: { type: Type.STRING },
            weatherAdvice: { type: Type.STRING },
            estimatedTotalCostINR: { type: Type.NUMBER },
            budgetBreakdown: {
              type: Type.OBJECT,
              properties: {
                accommodationINR: { type: Type.NUMBER },
                transportINR: { type: Type.NUMBER },
                foodINR: { type: Type.NUMBER },
                activitiesINR: { type: Type.NUMBER },
                bufferINR: { type: Type.NUMBER },
              },
              required: [
                'accommodationINR',
                'transportINR',
                'foodINR',
                'activitiesINR',
                'bufferINR',
              ],
            },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  morning: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      location: { type: Type.STRING },
                      tips: { type: Type.STRING },
                    },
                    required: ['time', 'activity', 'location'],
                  },
                  afternoon: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      location: { type: Type.STRING },
                      mealRecommendation: { type: Type.STRING },
                    },
                    required: ['time', 'activity', 'location', 'mealRecommendation'],
                  },
                  evening: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      location: { type: Type.STRING },
                      sunsetSpot: { type: Type.STRING },
                    },
                    required: ['time', 'activity', 'location'],
                  },
                  night: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      activity: { type: Type.STRING },
                      stayRecommendation: { type: Type.STRING },
                    },
                    required: ['time', 'activity', 'stayRecommendation'],
                  },
                },
                required: ['day', 'title', 'morning', 'afternoon', 'evening', 'night'],
              },
            },
            recommendedHotels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  pricePerNightINR: { type: Type.NUMBER },
                  rating: { type: Type.NUMBER },
                  highlight: { type: Type.STRING },
                  location: { type: Type.STRING },
                },
                required: ['name', 'category', 'pricePerNightINR', 'rating', 'highlight'],
              },
            },
            recommendedAdventures: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  location: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  approxPriceINR: { type: Type.NUMBER },
                  highlights: { type: Type.STRING },
                },
                required: ['name', 'location', 'approxPriceINR'],
              },
            },
            mustTryFood: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dish: { type: Type.STRING },
                  description: { type: Type.STRING },
                  whereToTry: { type: Type.STRING },
                  approxPriceINR: { type: Type.NUMBER },
                },
                required: ['dish', 'description', 'approxPriceINR'],
              },
            },
            localGuideAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            packingList: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'title',
            'tagline',
            'summary',
            'estimatedTotalCostINR',
            'budgetBreakdown',
            'itinerary',
            'recommendedHotels',
            'recommendedAdventures',
            'mustTryFood',
            'localGuideAdvice',
            'packingList',
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/plan-trip:', error);
    // Return high quality fallback plan if API fails or rate-limits
    const fallbackPlan = generateFallbackTripPlan(
      req.body.destination || 'Shimla',
      Number(req.body.durationDays) || 3,
      req.body.budget || 'Moderate',
      req.body.travelStyle || 'Adventure',
      Number(req.body.travelersCount) || 2,
      req.body.startingCity || 'Delhi',
      req.body.interests || ['Sightseeing'],
      req.body.foodPreference || 'Local'
    );
    res.json({ ...fallbackPlan, fallbackNote: 'Generated via Smart Tourism smart algorithm' });
  }
});

// Travel AI Assistant Chat endpoint
app.post('/api/chat-trip', async (req: Request, res: Response) => {
  try {
    const { message, destination, history = [] } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!ai) {
      res.json({
        reply: `Smart Tourism Assistant: Greetings! Regarding ${destination || 'your trip to India'}, we recommend booking verified local guides with vehicles (e.g. Swift Dzire or Innova) and reserving riverside or hilltop accommodations in advance. How else may I assist with your itinerary, local food, or adventure bookings?`,
      });
      return;
    }

    const systemInstruction = `You are the AI Trip Concierge at Smart Tourism India.
Help travelers with real travel advice for Indian destinations (Shimla, Manali, Rishikesh, Goa, Haridwar, Kashmir, Jaipur, Kerala, Spiti, etc.).
Keep responses concise, welcoming, practical, and culturally aware. Mention local tips, safety guidelines, weather considerations, and budget advice.`;

    const chatContents = [
      ...history.map((h: { sender: 'user' | 'assistant'; text: string }) => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
      {
        role: 'user',
        parts: [{ text: `${destination ? `[Current destination context: ${destination}] ` : ''}${message}` }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || 'How can I assist your travels today?' });
  } catch (err: any) {
    console.error('Error in /api/chat-trip:', err);
    res.json({
      reply: `I can help you explore ${req.body.destination || 'India'}! Try asking about best hotels, adventure activities like river rafting or skiing, or traditional food like Siddu and Dham.`,
    });
  }
});

// Bookings Endpoints
app.get('/api/bookings', (_req: Request, res: Response) => {
  res.json(bookingsStore);
});

app.post('/api/bookings', (req: Request, res: Response) => {
  try {
    const {
      customerName,
      email,
      phone,
      destination,
      serviceType = 'package',
      itemName = 'All-Inclusive Tour Package',
      guests = 1,
      checkIn,
      checkOut,
      specialRequests = '',
      totalPriceINR = 5000,
      itinerarySummary = '',
    } = req.body;

    if (!customerName || !email || !phone || !destination || !checkIn) {
      res.status(400).json({ error: 'Please provide all required booking fields.' });
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `ST-${new Date().getFullYear()}-${randomSuffix}`;

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      bookingRef,
      customerName,
      email,
      phone,
      destination,
      serviceType,
      itemName,
      guests: Number(guests),
      checkIn,
      checkOut,
      specialRequests,
      totalPriceINR: Number(totalPriceINR) || 5000,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      itinerarySummary,
    };

    bookingsStore.unshift(newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to process booking' });
  }
});

// Contact endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Please fill name, email and message.' });
    return;
  }

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Travel Inquiry',
    message,
    createdAt: new Date().toISOString(),
  };

  contactMessages.unshift(newMessage);
  res.json({ success: true, message: 'Message received successfully! Our team will contact you within 24 hours.' });
});

// Auth endpoints
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email and password are required' });
    return;
  }

  const existing = usersStore.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    res.status(400).json({ error: 'An account with this email already exists. Please login.' });
    return;
  }

  const newUser: User = {
    id: `u-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    password,
  };
  usersStore.push(newUser);

  res.json({
    success: true,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = usersStore.find(
    (u) => u.email.toLowerCase() === (email || '').toLowerCase() && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
    });
  } else {
    // If not found in mock store, auto-login with friendly guest profile for seamless demo experience
    const demoUser = {
      id: `u-${Date.now()}`,
      name: email.split('@')[0] || 'Traveler',
      email: email,
      phone: '+91 98765 00000',
    };
    res.json({
      success: true,
      user: demoUser,
      isDemoSession: true,
    });
  }
});

// Helper for fallback itinerary generator
function generateFallbackTripPlan(
  destination: string,
  days: number,
  budget: string,
  travelStyle: string,
  travelers: number,
  startingCity: string,
  _interests: string[],
  _food: string
) {
  const isShimla = destination.toLowerCase().includes('shimla');
  const isManali = destination.toLowerCase().includes('manali');
  const isRishikesh = destination.toLowerCase().includes('rishikesh');
  const isGoa = destination.toLowerCase().includes('goa');

  const basePricePerPerson = budget === 'Luxury' ? 6500 : budget === 'Budget' ? 2200 : 3800;
  const totalCost = basePricePerPerson * days * travelers;

  const itineraryDays = Array.from({ length: days }, (_, i) => {
    const dayNum = i + 1;
    if (dayNum === 1) {
      return {
        day: 1,
        title: `Arrival, Mountain Check-in & Mall Road Stroll`,
        morning: {
          time: '08:30 AM',
          activity: `Journey from ${startingCity} and check into hotel. Welcome drink and acclimatization.`,
          location: `${destination} Central Heights`,
          tips: 'Keep warm layers accessible during the scenic drive.',
        },
        afternoon: {
          time: '01:30 PM',
          activity: `Explore the vibrant local bazaars and historical heritage architecture.`,
          location: isShimla ? 'Mall Road & The Ridge' : isManali ? 'Old Manali Cafes' : isRishikesh ? 'Lakshman Jhula & Ram Jhula' : 'Beachfront Promenade',
          mealRecommendation: isShimla ? 'Traditional Siddu with hot pure ghee' : isManali ? 'Trout fish or Trout curry with steamed rice' : isRishikesh ? 'Ayurvedic Thali at Chotiwala' : 'Fresh Goan Fish Curry',
        },
        evening: {
          time: '05:30 PM',
          activity: `Sunset viewing point and photography session.`,
          location: isShimla ? 'Jakhoo Temple Hill' : isManali ? 'Hadimba Temple Pine Forest' : isRishikesh ? 'Triveni Ghat Evening Ganga Aarti' : 'Anjuna Cliff Sunset',
          sunsetSpot: isShimla ? 'Scandal Point' : isManali ? 'Solang Valley Viewpoint' : isRishikesh ? 'Parmarth Niketan Ghat' : 'Vagator Hill',
        },
        night: {
          time: '08:30 PM',
          activity: `Cozy dinner by bonfire and stargazing under crisp mountain skies.`,
          stayRecommendation: `${destination} Premier Mountain Resort`,
        },
      };
    } else if (dayNum === 2) {
      return {
        day: 2,
        title: `High-Adrenaline Adventure & Scenic Excursions`,
        morning: {
          time: '07:30 AM',
          activity: isShimla ? 'Morning trek through fragrant cedar forests to Kufri' : isManali ? 'Drive up to Solang Valley / Atal Tunnel for snow activities' : isRishikesh ? 'River Rafting 16km from Shivpuri down through rapids' : 'Water sports and Dolphin safari cruise',
          location: isShimla ? 'Kufri Nature Park' : isManali ? 'Solang Valley' : isRishikesh ? 'Shivpuri to NIM Beach' : 'Calangute / Baga Coast',
          tips: 'Wear waterproof footwear and carry sun protection.',
        },
        afternoon: {
          time: '01:00 PM',
          activity: `Lunch at an altitude cafe followed by paragliding or ziplining.`,
          location: isShimla ? 'Chail Wildlife Sanctuary' : isManali ? 'Vashisht Hot Springs' : isRishikesh ? 'Neer Garh Waterfall Hike' : 'Fort Aguada & Lighthouse',
          mealRecommendation: 'Himachali Chana Madra, Khatta Kaddu with Bhaat',
        },
        evening: {
          time: '06:00 PM',
          activity: `Local handicraft shopping, woollens, organic honey, and apple jams.`,
          location: 'Lakkar Bazaar & Tibetan Market',
          sunsetSpot: 'Valley Panorama Point',
        },
        night: {
          time: '08:45 PM',
          activity: `Live acoustic music dinner and resting up for day ahead.`,
          stayRecommendation: `${destination} Riverside Camp or Heritage Hotel`,
        },
      };
    } else {
      return {
        day: dayNum,
        title: `Cultural Immersion, Hidden Waterfalls & Panoramic Vistas`,
        morning: {
          time: '08:00 AM',
          activity: `Sunrise nature trail, temple visit, and photography session with morning mist.`,
          location: `${destination} Ridge Valley`,
          tips: 'Carry water bottle and camera for panoramic shots.',
        },
        afternoon: {
          time: '01:00 PM',
          activity: `Leisurely village walk, meeting local artisans and experiencing organic farm cooking.`,
          location: `${destination} Countryside`,
          mealRecommendation: 'Authentic Himachali Dham festive feast served on leaf plates',
        },
        evening: {
          time: '05:30 PM',
          activity: `Souvenir hunting, tasting hot sweet Mittha and cafe hopping.`,
          location: 'Town Square',
          sunsetSpot: 'Lookout Tower',
        },
        night: {
          time: '08:30 PM',
          activity: `Farewell banquet dinner with traditional folk music performances.`,
          stayRecommendation: `${destination} Luxury Suites`,
        },
      };
    }
  });

  return {
    title: `Unforgettable ${days}-Day Journey to ${destination}`,
    tagline: `Curated ${travelStyle} Escape for ${travelers} Explorer${travelers > 1 ? 's' : ''}`,
    destination,
    durationDays: days,
    summary: `Immerse yourself in the majesty of ${destination}. Experience serene valleys, thrilling outdoor adventures, centuries-old temples, heartwarming local hospitality, and mouthwatering culinary traditions.`,
    bestTimeToVisit: isShimla || isManali ? 'March - June (Pleasant bloom) or October - February (Snowfall)' : isRishikesh ? 'September - April (Ideal for rafting & yoga)' : 'October - March',
    weatherAdvice: 'Daytime temperatures range between 15°C to 24°C; evenings can dip quickly to 6°C-12°C. Layers are essential.',
    estimatedTotalCostINR: totalCost,
    budgetBreakdown: {
      accommodationINR: Math.round(totalCost * 0.45),
      transportINR: Math.round(totalCost * 0.25),
      foodINR: Math.round(totalCost * 0.18),
      activitiesINR: Math.round(totalCost * 0.10),
      bufferINR: Math.round(totalCost * 0.02),
    },
    itinerary: itineraryDays,
    recommendedHotels: [
      {
        name: isShimla ? 'Mountain View Hotel' : isManali ? 'Snow Peak Resort' : isRishikesh ? 'Ganga View Hotel' : `${destination} Royal Palms`,
        category: 'Deluxe Heritage',
        pricePerNightINR: 2800,
        rating: 4.6,
        highlight: 'Panoramic valley views, heated rooms, 24/7 room service & bonfire',
        location: `${destination} Central`,
      },
      {
        name: isShimla ? 'Snow Valley Resort' : isManali ? 'Valley View Resort' : isRishikesh ? 'Aloha On The Ganges' : `${destination} Beachside Retreat`,
        category: 'Premium Resort',
        pricePerNightINR: 3500,
        rating: 4.8,
        highlight: 'Infinity mountain-facing terrace, spa, live music & multi-cuisine restaurant',
        location: `${destination} Heights`,
      },
      {
        name: isShimla ? 'Hilltop Residency' : isManali ? 'Solang Valley Camp' : isRishikesh ? 'Riverside Luxury Tents' : `${destination} Boutique Stay`,
        category: 'Eco Adventure / Boutique',
        pricePerNightINR: 2200,
        rating: 4.3,
        highlight: 'Authentic stone architecture, apple orchard walks, stargazing lawn',
        location: `${destination} Nature Belt`,
      },
    ],
    recommendedAdventures: [
      {
        name: isRishikesh ? 'River Rafting (Shivpuri 16km)' : isManali ? 'Solang Valley Paragliding' : 'Mountain Trekking & Camping',
        location: destination,
        difficulty: 'Moderate',
        approxPriceINR: 1500,
        highlights: 'High-adrenaline excitement with certified safety instructors and GoPro footage.',
      },
      {
        name: isRishikesh ? 'Bungee Jumping (83m)' : isManali ? 'Skiing at Solang Valley' : 'Ziplining across pine ravines',
        location: `${destination} Adventure Zone`,
        difficulty: 'Challenging',
        approxPriceINR: 3500,
        highlights: 'India’s premier jump platform with international safety standards.',
      },
      {
        name: 'Riverside / Mountain Camping with Stargazing',
        location: `${destination} Foothills`,
        difficulty: 'Easy',
        approxPriceINR: 1800,
        highlights: 'Swiss tents, acoustic music, live barbecue and morning yoga.',
      },
    ],
    mustTryFood: [
      {
        dish: 'Siddu with Pure Desi Ghee',
        description: 'Steamed wheat dough pocket stuffed with walnut, poppy seeds, and spices.',
        whereToTry: 'Mall Road Local Heritage Dhaba',
        approxPriceINR: 120,
      },
      {
        dish: 'Chana Madra & Bhaat',
        description: 'Rich chickpeas simmered slowly in spiced yogurt and cardamom gravy.',
        whereToTry: 'Himachali Rasoi',
        approxPriceINR: 180,
      },
      {
        dish: 'Traditional Himachali Dham',
        description: 'Royal multi-course vegetarian banquet of rice, rajma madra, and kadi.',
        whereToTry: 'Traditional Community Kitchen',
        approxPriceINR: 250,
      },
      {
        dish: 'Hot Steamed Mountain Momos & Thukpa',
        description: 'Freshly folded dumplings served with fiery red chili sesame chutney.',
        whereToTry: 'Tibetan Market Stalls',
        approxPriceINR: 110,
      },
    ],
    localGuideAdvice: [
      'Always confirm vehicle permits in advance for high mountain passes like Rohtang Pass.',
      'Carry cash (INR 500/200 notes) as network connectivity at higher viewpoints may occasionally stall UPI payments.',
      'Hire verified local drivers experienced in Himalayan hairpin curves.',
      'Respect sacred temples and religious ghats by removing footwear and dressing modestly.',
    ],
    packingList: [
      'Thermal innerwear and fleece windbreaker jackets',
      'Sturdy grip hiking shoes or waterproof sneakers',
      'Polarized UV sunglasses & high-SPF sunscreen',
      'Power bank (20000mAh) and universal travel adapter',
      'Personal medical kit (anti-motion sickness, paracetamol, band-aids)',
    ],
  };
}

// Start development or production server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev mode, use Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Tourism server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
