import { connectDB } from "./db";
import { Vehicle } from "@/models/Vehicle";

const vehicles = [
  // ── SEDAN ──
  {
    name: "Toyota Camry",
    type: "sedan",
    description:
      "Comfortable and reliable sedan perfect for city and highway driving.",
    pricePerDay: 150,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    available: true,
    features: ["Bluetooth", "Backup Camera", "Apple CarPlay", "Cruise Control"],
  },
  {
    name: "Honda Accord",
    type: "sedan",
    description:
      "Refined sedan with sporty handling and a premium interior finish.",
    pricePerDay: 160,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    available: true,
    features: ["Lane Assist", "Heated Seats", "Wireless Charging", "Sunroof"],
  },
  {
    name: "Mercedes C-Class",
    type: "sedan",
    description: "Executive sedan blending performance with refined elegance.",
    pricePerDay: 320,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    available: true,
    features: [
      "MBUX Infotainment",
      "Ambient Lighting",
      "Burmester Audio",
      "Parking Assist",
    ],
  },
  {
    name: "Tesla Model 3",
    type: "sedan",
    description: "All-electric sedan with autopilot and zero emissions.",
    pricePerDay: 350,
    seats: 5,
    transmission: "automatic",
    fuel: "electric",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
    available: true,
    features: [
      "Autopilot",
      "Over-the-air Updates",
      '15" Touchscreen',
      "Supercharging",
    ],
  },

  // ── SUV ──
  {
    name: "Honda CR-V",
    type: "suv",
    description:
      "Spacious SUV with advanced safety features and premium comfort.",
    pricePerDay: 200,
    seats: 7,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
    available: true,
    features: ["Sunroof", "Lane Assist", "360 Camera", "Heated Seats"],
  },
  {
    name: "Toyota Fortuner",
    type: "suv",
    description: "Rugged and powerful SUV built for all terrains.",
    pricePerDay: 280,
    seats: 7,
    transmission: "automatic",
    fuel: "diesel",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
    available: true,
    features: ["4WD", "Roof Rails", "Tow Hook", "Multi-terrain Select"],
  },
  {
    name: "Nissan Patrol",
    type: "suv",
    description:
      "The ultimate full-size SUV — powerful, commanding, and capable.",
    pricePerDay: 380,
    seats: 8,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
    available: true,
    features: [
      "4x4",
      "Third Row Seating",
      "Bose Audio",
      "Hydraulic Body Motion Control",
    ],
  },
  {
    name: "Range Rover Sport",
    type: "suv",
    description:
      "Luxury SUV with exceptional off-road capability and on-road refinement.",
    pricePerDay: 550,
    seats: 5,
    transmission: "automatic",
    fuel: "hybrid",
    image: "https://images.unsplash.com/photo-1625231338895-ac13e2ab8b41?w=800",
    available: true,
    features: [
      "Terrain Response",
      "Meridian Audio",
      "Panoramic Roof",
      "Air Suspension",
    ],
  },

  // ── HATCHBACK ──
  {
    name: "Hyundai i20",
    type: "hatchback",
    description: "Nimble and fuel-efficient hatchback ideal for city commutes.",
    pricePerDay: 90,
    seats: 5,
    transmission: "manual",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800",
    available: true,
    features: ["Touchscreen", "Rear Sensors", "USB Charging", "ABS"],
  },
  {
    name: "Volkswagen Golf",
    type: "hatchback",
    description:
      "The benchmark hatchback — polished, practical, and fun to drive.",
    pricePerDay: 120,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800",
    available: true,
    features: [
      "Digital Cockpit",
      "Adaptive Cruise",
      "Lane Keep Assist",
      "Wireless CarPlay",
    ],
  },
  {
    name: "Mini Cooper",
    type: "hatchback",
    description:
      "Iconic and stylish — the most fun you can have in a compact car.",
    pricePerDay: 140,
    seats: 4,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800",
    available: true,
    features: [
      "Sport Mode",
      "Panoramic Roof",
      "Harman Kardon Audio",
      "Ambient Lighting",
    ],
  },

  // ── LUXURY ──
  {
    name: "BMW 5 Series",
    type: "luxury",
    description:
      "Premium luxury sedan with cutting-edge technology and performance.",
    pricePerDay: 450,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    available: true,
    features: [
      "Leather Seats",
      "Harman Kardon Audio",
      "Heads-up Display",
      "Massaging Seats",
    ],
  },
  {
    name: "Mercedes S-Class",
    type: "luxury",
    description:
      "The pinnacle of automotive luxury — unmatched in comfort and technology.",
    pricePerDay: 850,
    seats: 5,
    transmission: "automatic",
    fuel: "hybrid",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
    available: true,
    features: [
      "4D Burmester Audio",
      "Executive Rear Seats",
      "Night Vision",
      "AR Navigation",
    ],
  },
  {
    name: "Rolls-Royce Ghost",
    type: "luxury",
    description:
      "The whisper-quiet icon of prestige — for those who demand the very best.",
    pricePerDay: 2500,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800",
    available: true,
    features: [
      "Starlight Headliner",
      "Bespoke Audio",
      "Lambswool Floor Mats",
      "Champagne Cooler",
    ],
  },
  {
    name: "Lamborghini Urus",
    type: "luxury",
    description:
      "Super SUV delivering supercar performance with everyday usability.",
    pricePerDay: 3200,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?w=800",
    available: true,
    features: [
      "640hp V8",
      "Sport Exhaust",
      "Carbon Ceramic Brakes",
      "Alcantara Interior",
    ],
  },

  // ── VAN ──
  {
    name: "Toyota HiAce",
    type: "van",
    description:
      "The most trusted people mover — spacious, reliable, and versatile.",
    pricePerDay: 180,
    seats: 12,
    transmission: "manual",
    fuel: "diesel",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
    available: true,
    features: ["12 Seats", "AC", "Roof Ventilation", "Large Boot"],
  },
  {
    name: "Mercedes Sprinter",
    type: "van",
    description:
      "Premium cargo and passenger van for business and group travel.",
    pricePerDay: 250,
    seats: 9,
    transmission: "automatic",
    fuel: "diesel",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    available: true,
    features: ["Navigation", "Rear AC", "Luggage Partition", "USB Ports"],
  },
  {
    name: "Ford Transit",
    type: "van",
    description:
      "Versatile workhorse van suited for cargo runs and group transport.",
    pricePerDay: 200,
    seats: 8,
    transmission: "manual",
    fuel: "diesel",
    image: "https://images.unsplash.com/photo-1609618486112-0d3f04a4e010?w=800",
    available: true,
    features: ["High Roof", "Sliding Doors", "Rear Shelving", "Tow Bar"],
  },

  // ── TRUCK ──
  {
    name: "Toyota Hilux",
    type: "truck",
    description:
      "The legendary pickup — unstoppable on any terrain, built to last.",
    pricePerDay: 220,
    seats: 5,
    transmission: "manual",
    fuel: "diesel",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    available: true,
    features: ["4WD", "Tow Package", "Bed Liner", "Diff Lock"],
  },
  {
    name: "Ford F-150",
    type: "truck",
    description:
      "America's best-selling truck — powerful, capable, and tech-loaded.",
    pricePerDay: 280,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=800",
    available: true,
    features: ["Pro Power Onboard", "SYNC 4", "360 Camera", "Trailer Assist"],
  },
  {
    name: "RAM 1500",
    type: "truck",
    description:
      "Premium pickup with car-like comfort and serious towing capability.",
    pricePerDay: 300,
    seats: 5,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1609752452485-7d5b5f8c08c3?w=800",
    available: true,
    features: [
      "Air Suspension",
      'Uconnect 12"',
      "Multifunction Tailgate",
      "Harman Kardon",
    ],
  },

  // ── BIKE ──
  {
    name: "Yamaha MT-07",
    type: "bike",
    description:
      "Naked streetfighter with a torquey twin engine — urban and agile.",
    pricePerDay: 120,
    seats: 2,
    transmission: "manual",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
    available: true,
    features: [
      "Quick Shifter",
      "Traction Control",
      "LED Lighting",
      "Digital Display",
    ],
  },
  {
    name: "Harley-Davidson Iron 883",
    type: "bike",
    description: "Raw, stripped-back cruiser with iconic American character.",
    pricePerDay: 200,
    seats: 2,
    transmission: "manual",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
    available: true,
    features: [
      "V-Twin Engine",
      "Custom Exhaust",
      "Blacked-out Parts",
      "USB Charging",
    ],
  },
  {
    name: "BMW R 1250 GS",
    type: "bike",
    description:
      "The adventure tourer benchmark — equally at home on road and trail.",
    pricePerDay: 280,
    seats: 2,
    transmission: "automatic",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800",
    available: true,
    features: ["Dynamic ESA", "Heated Grips", "TFT Display", "Keyless Ride"],
  },
  {
    name: "Ducati Panigale V4",
    type: "bike",
    description:
      "Italian superbike delivering MotoGP-derived performance on the road.",
    pricePerDay: 450,
    seats: 2,
    transmission: "manual",
    fuel: "petrol",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
    available: true,
    features: [
      "214hp V4",
      "Cornering ABS",
      "Launch Control",
      "Öhlins Suspension",
    ],
  },
];

export async function seedVehicles() {
  await connectDB();
  await Vehicle.deleteMany({});
  await Vehicle.insertMany(vehicles);
  console.log(`✅ ${vehicles.length} vehicles seeded successfully`);
}
