import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ForStudentsSection from "@/components/ForStudentsSection";
import ForTeachersSection from "@/components/ForTeachersSection";
import PlatformOverview from "@/components/PlatformOverview";
import SecuritySection from "@/components/SecuritySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ForStudentsSection />
      <ForTeachersSection />
      <PlatformOverview />
      <SecuritySection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </main>
  );
};

export default Index;