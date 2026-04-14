import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { FeaturedDevices } from "@/components/sections/featured-devices";
import { Treatments } from "@/components/sections/treatments";
import { SmartDifference } from "@/components/sections/smart-difference";
import { CatalogDownload } from "@/components/sections/catalog-download";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <FeaturedDevices />
        <Treatments />
        <SmartDifference />
        <CatalogDownload />
        <Testimonials />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
