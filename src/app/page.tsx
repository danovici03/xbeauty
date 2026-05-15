import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { CollaborationModels } from "@/components/sections/collaboration-models";
import { AudienceSegments } from "@/components/sections/audience-segments";
import { FeaturedDevices } from "@/components/sections/featured-devices";
import { Treatments } from "@/components/sections/treatments";
import { SmartDifference } from "@/components/sections/smart-difference";
import { RoiTeaser } from "@/components/sections/roi-teaser";
import { CatalogDownload } from "@/components/sections/catalog-download";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <Hero />
        <CollaborationModels />
        <AudienceSegments />
        <FeaturedDevices />
        <Treatments />
        <SmartDifference />
        <RoiTeaser />
        <CatalogDownload />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
