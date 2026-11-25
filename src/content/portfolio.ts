// Portfolio tiles + hero collage.
//
// TEMPORARY STOCK: every photo below is a free Unsplash photo (Unsplash License), hotlinked
// from images.unsplash.com and credited. Before launch, replace them with Trilochana's own work
// (drop files in /public/images/portfolio and use paths like "/images/portfolio/corporate-event-stage-delhi-ncr.jpg").
// Presenting stock photos as your own portfolio misleads clients.

export const categories = ["Corporate & Events", "Portraits", "Products", "Landscapes & Travel"] as const;
export type Category = (typeof categories)[number];

export type Credit = { name: string; url: string };
export type PortfolioItem = { src: string; alt: string; category: Category; caption: string; credit?: Credit };

/** Unsplash CDN URL. next/image adds width/format/quality params itself. */
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;
const by = (name: string, handle: string): Credit => ({ name, url: `https://unsplash.com/@${handle}` });

export const portfolio: PortfolioItem[] = [
  { src: unsplash("1762968274962-20c12e6e8ecd"), alt: "Speaker presenting on stage to a conference audience", category: "Corporate & Events", caption: "Conference keynote", credit: by("Carlos Gil", "carlosgil83") },
  { src: unsplash("1536766768598-e09213fdcf22"), alt: "Portrait of a woman wearing a brown headscarf", category: "Portraits", caption: "Natural-light portrait", credit: by("Danie Franco", "dani_franco") },
  { src: unsplash("1611930022073-b7a4ba5fcccd"), alt: "A bottle and two jars stacked against a neutral grey background", category: "Products", caption: "Catalogue product shot", credit: by("Alex Lvrs", "sud_studio") },
  { src: unsplash("1783442992867-6318308be6ec"), alt: "Vibrant sunset over mountains and the ocean", category: "Landscapes & Travel", caption: "Sunset over the hills", credit: by("Wojciech Wyszkowski", "fotodruk") },
  { src: unsplash("1768396855390-0728fa9c21e1"), alt: "Gala event with a lit stage and seated guests", category: "Corporate & Events", caption: "Gala & awards night", credit: by("Andy Wang", "space_launch_system") },
  { src: unsplash("1680459520309-189cf5b22212"), alt: "Two people holding sparklers during a Diwali celebration", category: "Corporate & Events", caption: "Diwali celebration", credit: by("Venkatesan P", "venkat19") },
  { src: unsplash("1782289819142-a4232301521a"), alt: "Close-up portrait of an elderly woman with a bindi, nose ring and headscarf", category: "Portraits", caption: "Character portrait", credit: by("Arsh.D.sonda", "arshxdxsonda") },
  { src: unsplash("1629198688000-71f23e745b6e"), alt: "Skincare products arranged on white pedestals against a blue backdrop", category: "Products", caption: "Brand still life", credit: by("Reuben Mansell", "reubenmansell") },
  { src: unsplash("1587825140708-dfaf72ae4b04"), alt: "Speaker on stage addressing a large audience", category: "Corporate & Events", caption: "Speaker on stage", credit: by("Alexandre Pellaes", "apellaes") },
  { src: unsplash("1772152609673-6be26114f76e"), alt: "Rows of lit diyas glowing in a dim interior", category: "Corporate & Events", caption: "Festive decor", credit: by("Senthil m", "slowdownyourworld") },
  { src: unsplash("1510218129079-74e00c5a90ea"), alt: "Silhouetted mountain ridges against an orange and purple sky", category: "Landscapes & Travel", caption: "Mountain ridges at dusk", credit: by("Kevin Ianeselli", "kevinianeselli") },
  { src: unsplash("1763987300634-7b0822cbf390"), alt: "Perfume bottle resting on a red flower floating on water", category: "Products", caption: "Lifestyle product shot", credit: by("majed swan", "majedswan") },
  { src: unsplash("1775902087078-ecee948a7c6a"), alt: "Crowd gathered at an indoor event in front of a large screen", category: "Corporate & Events", caption: "Corporate get-together", credit: by("Euronewsweek Media", "euronewsweek") },
  { src: unsplash("1561501900-3701fa6a0864"), alt: "Resort building with an infinity pool", category: "Landscapes & Travel", caption: "Resort & property shoot", credit: by("Roberto Nickson", "rpnickson") },
  { src: unsplash("1766899920668-3a2cba68be21"), alt: "Large group of people gathered with lit candles at a celebration", category: "Corporate & Events", caption: "Evening celebration", credit: by("Dibakar Roy", "dibakar16roy") },
];

// Hero collage: [tall, top-right, bottom-right]. The first one is the LCP image.
export const heroImages = [portfolio[0], portfolio[1], portfolio[3]];
