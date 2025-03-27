
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KnowledgeVault from "@/components/knowledge/KnowledgeVault";
import { AnimatedBackground } from "@/components/ui/animated-bg";

const Knowledge = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <KnowledgeVault />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Knowledge;
