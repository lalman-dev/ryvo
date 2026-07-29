export interface Vehicle {
  _id: string;
  name: string;
  type: "sedan" | "suv" | "hatchback" | "luxury";
  description: string;
  pricePerDay: number;
  seats: number;
  transmission: "manual" | "automatic";
  fuel: "petrol" | "diesel" | "electric";
  image: string;
  available: boolean;
  features: string[];
}

export interface Booking {
  _id: string;
  userId: string;
  vehicleId: Vehicle;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  pickupLocation: string;
  createdAt: string;
}
