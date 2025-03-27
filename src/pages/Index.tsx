
import { AnimatedBackground } from "@/components/ui/animated-bg";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Quotes from "@/components/home/Quotes";
import ConsciousnessPreview from "@/components/home/ConsciousnessPreview";
import MeditationPreview from "@/components/home/MeditationPreview";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark">
      <AnimatedBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <Quotes />
        <ConsciousnessPreview />
        <MeditationPreview />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
