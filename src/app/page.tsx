import type { Metadata } from "next";
import { site } from "@/content/site";
import { seo } from "@/content/seo";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Portfolio } from "@/components/home/Portfolio";
import { Rates } from "@/components/home/Rates";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  description: seo.home.description,
  alternates: { canonical: seo.home.path },
  openGraph: { title: seo.home.title, description: seo.home.description, url: seo.home.path },
  twitter: { title: seo.home.title, description: seo.home.description },
};

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ServicesGrid />
        <Portfolio />
        {site.showRates && <Rates />}
        <Process />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
