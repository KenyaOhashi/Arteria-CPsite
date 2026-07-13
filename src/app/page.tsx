import { Hero } from "@/components/home/Hero";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { PeopleGallery } from "@/components/home/PeopleGallery";
import { BusinessSection } from "@/components/home/BusinessSection";
import { CirculationDiagram } from "@/components/home/CirculationDiagram";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { RecruitPartnerSection } from "@/components/home/RecruitPartnerSection";
import { NewsSection } from "@/components/home/NewsSection";
import { CompanySection } from "@/components/home/CompanySection";
import { CTASection } from "@/components/ui/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophySection />
      <PeopleGallery />
      <BusinessSection />
      <CirculationDiagram />
      <FeaturesSection />
      <RecruitPartnerSection />
      <NewsSection />
      <CompanySection />
      <CTASection />
    </>
  );
}
