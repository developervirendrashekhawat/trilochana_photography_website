// Edit freely: order here = order on the site. `slug` becomes the #anchor on /services
// (and the URL for future /services/[slug] landing pages), so keep it stable once live.
// Images: /public paths or Unsplash URLs (see portfolio.ts: stock photos are TEMPORARY).
import { unsplash } from "./portfolio";

export type Pricing =
  | { type: "perDay"; items: { label: string; price: number; note?: string; featured?: boolean }[] }
  | { type: "custom"; label: string };

export type Service = {
  slug: string;
  title: string;
  keyword: string; // used in the H2 on /services: keep the search phrase in it
  seoTitle: string; // <title> of /services/<slug>
  seoDescription: string; // meta description of /services/<slug>, 140–160 chars
  icon: "briefcase" | "user" | "package" | "mountain";
  tags: string[];
  blurb: string;
  description: string[]; // paragraphs, 80–150 words total
  included: string[];
  pricing: Pricing;
  images: { src: string; alt: string }[];
};

export const services: Service[] = [
  {
    slug: "corporate-events",
    title: "Corporate & Events",
    keyword: "Corporate Event Photography & Videography",
    seoTitle: "Corporate Event Photographer in Delhi NCR | Trilochana Photography",
    seoDescription:
      "Corporate event, party and celebration photography with cinematic video across Delhi, Noida and Gurugram from ₹5,000/day. All raw data included. Get a quote.",
    icon: "briefcase",
    tags: ["Corporate", "Parties", "Celebrations"],
    blurb: "Conferences, award nights, office parties and festive celebrations, covered end to end.",
    description: [
      "From annual town halls and award nights to Diwali get-togethers and private parties, we cover your event so that nothing important is missed: the keynote, the handshake on stage, the team photo and the candid laughter in between.",
      "For larger events we bring a coordinated team of photographers and videographers, with cinematic gimbal video for highlight films. We work quietly around your schedule, across Delhi, Noida, Gurugram and the rest of the NCR, and hand over every raw file along with the edited selection.",
    ],
    included: [
      "Stage, speakers & award moments",
      "Backdrop & welcome photos",
      "Multi-photographer & video teams",
      "Event highlight collages for social media",
      "All raw data included",
    ],
    pricing: {
      type: "perDay",
      items: [
        { label: "Photographer", price: 5000 },
        { label: "Videographer", price: 6000 },
        { label: "Cinematic video (gimbal)", price: 10000, featured: true },
      ],
    },
    images: [
      { src: unsplash("1762968274962-20c12e6e8ecd"), alt: "Speaker presenting on stage at a corporate conference" },
      { src: unsplash("1768396855390-0728fa9c21e1"), alt: "Gala event with a stage and seated guests" },
      { src: unsplash("1680459520309-189cf5b22212"), alt: "Guests holding sparklers at a Diwali celebration" },
    ],
  },
  {
    slug: "portraits",
    title: "Portraits",
    keyword: "Portrait & Headshot Photography",
    seoTitle: "Portrait & Headshot Photographer in Delhi NCR | Trilochana",
    seoDescription:
      "Natural, candid portraits and professional headshots in Delhi NCR, indoors or outdoors, with edited hi-res photos. Based in Mayur Vihar. Book a session today.",
    icon: "user",
    tags: ["Natural", "Candid", "Professional"],
    blurb: "Individual and family portraits and professional headshots, indoors or outdoors.",
    description: [
      "Good portraits look like you on your best day, relaxed and natural rather than stiff. We guide you through simple poses, find flattering light and keep the session easy-going, whether it's a family portrait at home, a festive-outfit shoot or a LinkedIn-ready headshot.",
      "Sessions can be indoors, in a studio-style setup at your office, or outdoors at a park or monument in Delhi. You receive carefully edited, high-resolution photos ready for print, profiles and social media.",
    ],
    included: [
      "Individual & family portraits",
      "Professional headshots",
      "Indoor or outdoor locations",
      "Edited hi-res photos",
    ],
    // TODO(client): portrait price
    pricing: { type: "custom", label: "Custom quote" },
    images: [
      { src: unsplash("1536766768598-e09213fdcf22"), alt: "Natural-light portrait of a woman wearing a headscarf" },
      { src: unsplash("1782289819142-a4232301521a"), alt: "Close-up character portrait of an elderly woman" },
    ],
  },
  {
    slug: "products",
    title: "Products",
    keyword: "Product & E-commerce Photography",
    seoTitle: "Product & E-commerce Photographer in Delhi NCR | Trilochana",
    seoDescription:
      "Marketplace-ready catalogue images, lifestyle shots and ad creatives for brands across Delhi NCR, from Mayur Vihar, Delhi. Send your product list for a quote.",
    icon: "package",
    tags: ["Commercial", "E-commerce", "Branding"],
    blurb: "Catalogue, lifestyle and brand images that help your products sell online.",
    description: [
      "Clean, consistent product images make a real difference to how a listing performs. We shoot marketplace-ready catalogue photos that meet Amazon, Flipkart and Meesho guidelines, along with lifestyle and brand shots that show your product in use.",
      "Need content for campaigns? We also create social media and ad creatives sized for Instagram, Facebook and your website. Shoots can happen at your workspace or ours, for small and growing brands across Delhi NCR.",
    ],
    included: [
      "Marketplace-ready catalogue images",
      "Lifestyle & brand shots",
      "Social media & ad creatives",
    ],
    // TODO(client): product price
    pricing: { type: "custom", label: "Custom quote" },
    images: [
      { src: unsplash("1611930022073-b7a4ba5fcccd"), alt: "Catalogue product shot of a bottle and jars on a grey background" },
      { src: unsplash("1629198688000-71f23e745b6e"), alt: "Skincare products styled on pedestals for a brand shoot" },
      { src: unsplash("1763987300634-7b0822cbf390"), alt: "Lifestyle shot of a perfume bottle on a flower in water" },
    ],
  },
  {
    slug: "landscapes-travel",
    title: "Landscapes & Travel",
    keyword: "Landscape, Travel & Property Photography",
    seoTitle: "Landscape, Travel & Property Photographer in Delhi | Trilochana",
    seoDescription:
      "Fine-art landscape prints, hotel and resort property shoots and travel content from a Delhi NCR photographer in Mayur Vihar. Tell us your location for a quote.",
    icon: "mountain",
    tags: ["Nature", "Travel", "Scenic"],
    blurb: "Fine-art prints, hotel and resort shoots, and travel content.",
    description: [
      "Some of our favourite work happens far from a stage, in the hills at first light or by the water at sunset. We offer fine-art landscape prints for homes and offices, and we photograph hotels, resorts and properties so guests can see the space before they book.",
      "For travel brands and creators, we produce scenic photo and video content for websites and social media. Tell us where you're going and what you need, and we'll plan the shoot around the best light.",
    ],
    included: [
      "Fine-art landscape prints",
      "Hotel, resort & property shoots",
      "Travel photo & video content",
    ],
    pricing: { type: "custom", label: "On request" },
    images: [
      { src: unsplash("1783442992867-6318308be6ec"), alt: "Sunset over mountains and the ocean" },
      { src: unsplash("1561501900-3701fa6a0864"), alt: "Resort with an infinity pool, photographed for a property shoot" },
      { src: unsplash("1510218129079-74e00c5a90ea"), alt: "Mountain ridges silhouetted at dusk" },
    ],
  },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
