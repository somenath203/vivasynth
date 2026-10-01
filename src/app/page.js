import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import HighlightSection from "./_components/HighlightSection";
import FeatureSection from "./_components/FeatureSection";
import HowItWorks from "./_components/HowItWorks";
import ProductPreviewSection from "./_components/ProductPreviewSection";
import FAQSection from "./_components/FAQSection";
import CTASection from "./_components/CTASection";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <Navbar />

      <main>
        <HeroSection />
        <HighlightSection />
        <FeatureSection />
        <HowItWorks />
        <ProductPreviewSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />

    </div>
  );
}