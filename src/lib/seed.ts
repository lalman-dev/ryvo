import { connectDB } from "./db";
import { Vehicle } from "@/models/Vehicle";

const vehicles = [
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
];

export async function seedVehicles() {
  await connectDB();
  await Vehicle.deleteMany({});
  await Vehicle.insertMany(vehicles);
  console.log("✅ Vehicles seeded successfully");
}
