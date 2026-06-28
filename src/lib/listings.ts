export type Listing = {
  id: string;
  title: string;
  address: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  neighborhoodScore: number;
  image: string;
  description: string;
  highlights: string[];
};

export const VAULTED_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Tribeca Sky Residence",
    address: "56 Leonard St, New York, NY 10013",
    location: "Tribeca, New York",
    price: 12800000,
    beds: 4,
    baths: 4.5,
    sqft: 4180,
    propertyType: "Penthouse",
    neighborhoodScore: 9.7,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    description:
      "A private full-floor residence with skyline exposures, gallery-scaled entertaining rooms, a chef's kitchen, and a keyed elevator arrival moments from Tribeca's best dining.",
    highlights: ["Private elevator landing", "Hudson River views", "Wine room", "Doorman building"],
  },
  {
    id: "2",
    title: "Malibu Carbon Beach Villa",
    address: "22108 Pacific Coast Hwy, Malibu, CA 90265",
    location: "Malibu, California",
    price: 22950000,
    beds: 5,
    baths: 6,
    sqft: 6120,
    propertyType: "Beachfront estate",
    neighborhoodScore: 9.8,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85",
    description:
      "A warm modern oceanfront retreat with retractable glass walls, direct beach access, a resort-grade pool terrace, and Pacific views from nearly every room.",
    highlights: ["Direct beach access", "Infinity pool", "Outdoor kitchen", "Primary ocean suite"],
  },
  {
    id: "3",
    title: "Austin Glass Ridge House",
    address: "4401 Toro Canyon Rd, Austin, TX 78746",
    location: "West Lake Hills, Austin",
    price: 7350000,
    beds: 4,
    baths: 4,
    sqft: 4890,
    propertyType: "Architectural home",
    neighborhoodScore: 9.2,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
    description:
      "A glass-wrapped hillside home designed for indoor-outdoor living, with limestone terraces, smart home controls, a rooftop lounge, and Hill Country sunset views.",
    highlights: ["Rooftop terrace", "Smart home", "Heated lap pool", "Three-car garage"],
  },
  {
    id: "4",
    title: "Pacific Heights Renovated Classic",
    address: "2820 Broadway, San Francisco, CA 94115",
    location: "Pacific Heights, San Francisco",
    price: 16400000,
    beds: 6,
    baths: 5.5,
    sqft: 7210,
    propertyType: "Townhouse",
    neighborhoodScore: 9.5,
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
    description:
      "A restored classic with contemporary interiors, layered city views, formal entertaining rooms, landscaped gardens, and a private wellness level.",
    highlights: ["Bay outlooks", "Garden terrace", "Wellness suite", "Library"],
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatBaths(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export function getListing(id: string) {
  return VAULTED_LISTINGS.find((listing) => listing.id === id) ?? VAULTED_LISTINGS[0];
}
