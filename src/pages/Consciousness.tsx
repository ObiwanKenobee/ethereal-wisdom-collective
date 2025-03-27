
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsciousnessChat from "@/components/consciousness/ConsciousnessChat";
import { AnimatedBackground } from "@/components/ui/animated-bg";

const Consciousness = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)]">
            <ConsciousnessChat />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consciousness;
