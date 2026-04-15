export type NavLink = { name: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { name: "Acasă", href: "/" },
  { name: "Catalog", href: "/echipamente" },
  { name: "Epilare", href: "/epilare" },
  { name: "Bronzare", href: "/bronzare" },
  { name: "Calculator", href: "/calculator" },
  { name: "Contact", href: "/contact" },
];

export type FallbackDevice = {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  slug: string;
};

export const FALLBACK_DEVICES: FallbackDevice[] = [
  {
    id: 1,
    name: "SMARTDiode",
    slug: "smartdiode",
    category: "Epilare Laser",
    description: "Cel mai bun laser cu diodă din clasa sa.",
    image:
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "SkinXcell",
    slug: "skinxcell",
    category: "Microneedling RF",
    description: "Tratament Anti-Aging pentru Față și Corp.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Mezotix",
    slug: "mezotix",
    category: "Rejuvenare Fracționată",
    description: "Tehnologie Unică pe piață.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  },
];

export type Treatment = { name: string; image: string };

export const TREATMENTS: Treatment[] = [
  {
    name: "Epilare Definitivă",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rejuvenare Facială",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Remodelare Corporală",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tratamente Anti-Aging",
    image:
      "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tratamentul Acneei",
    image:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lifting Fără Bisturiu",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80",
  },
];

export type Testimonial = {
  id: number;
  name: string;
  clinic: string;
  text: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    clinic: "Lumina Skin Clinic",
    text: "Achiziționarea SMARTDiode a fost cea mai bună decizie luată în 2025. Rezultatele clinice sunt uimitoare, iar suportul oferit de echipă este inegalabil. Ne-am recuperat investiția în doar 3 luni.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Michael Thorne",
    clinic: "Thorne Aesthetics",
    text: "Echipamentul SkinXcell a transformat complet portofoliul nostru anti-aging. Calitatea construcției este excepțională, iar clienții noștri adoră faptul că nu necesită timp de recuperare.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Davies",
    clinic: "Radiance Beauty Hub",
    text: "De la demonstrația inițială până la instalare și suport de marketing, întreaga experiență a fost perfectă. Nu vând doar echipamente, ci devin partenerii tăi pentru succesul clinicii.",
    rating: 5,
  },
];

export const PRESS_LOGOS = ["VOGUE", "Aesthetics", "HARPERS BAZAAR", "ELLE", "Tatler"];
