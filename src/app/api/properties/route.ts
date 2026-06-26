export async function GET() {
  const properties = [
    {
      id: "1",
      title: "Modern Loft in SoHo",
      price: 4200,
      beds: 2,
      sqft: 1200,
      location: "SoHo, New York",
      description:
        "A stunning open-plan loft with exposed brick walls, floor-to-ceiling windows, and designer finishes throughout. Polished concrete floors and 14-foot ceilings create an airy, gallery-like atmosphere.",
      thumbnail: null,
    },
    {
      id: "2",
      title: "Beachfront Villa, Malibu",
      price: 12500,
      beds: 4,
      sqft: 3800,
      location: "Malibu, California",
      description:
        "Breathtaking Pacific Ocean views from every room. Features a chef's kitchen, infinity pool, and direct beach access. Contemporary architecture blends indoor and outdoor living seamlessly.",
      thumbnail: null,
    },
    {
      id: "3",
      title: "Glass House, Austin",
      price: 5800,
      beds: 3,
      sqft: 2400,
      location: "West Lake Hills, Austin",
      description:
        "Architecturally iconic home with walls of glass overlooking the Texas Hill Country. Smart home automation, a rooftop terrace, and heated lap pool set this property apart.",
      thumbnail: null,
    },
  ];

  return Response.json(properties);
}
