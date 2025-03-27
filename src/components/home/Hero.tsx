
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const layers = container.querySelectorAll('.parallax-layer');
      
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;
      
      const mouseX = (e.clientX - centerX) / (containerRect.width / 2);
      const mouseY = (e.clientY - centerY) / (containerRect.height / 2);
      
      layers.forEach((layer, index) => {
        const htmlLayer = layer as HTMLElement;
        const depth = index + 1;
        const moveX = mouseX * depth * -10;
        const moveY = mouseY * depth * -10;
        
        htmlLayer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden" 
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute w-64 h-64 top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-celestial-purple/10 rounded-full blur-3xl parallax-layer"></div>
      <div className="absolute w-96 h-96 bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-celestial-blue/10 rounded-full blur-3xl parallax-layer"></div>
      
      {/* Sacred Geometry Pattern */}
      <div className="absolute inset-0 sacred-pattern opacity-20 parallax-layer"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center space-y-8 animate-fade-in">
        <div className="space-y-2">
          <div className="text-sm sm:text-base inline-flex items-center bg-cosmic-medium/30 text-cosmic-light px-4 py-1 rounded-full backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-celestial-gold rounded-full mr-2 animate-pulse-glow"></span>
            Global Consciousness Initiative
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight glow-text">
            Uniting Wisdom <br className="hidden sm:block" />
            Through Consciousness
          </h1>
        </div>
        
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          Explore ancient wisdom amplified by AI, connect with global meditation, 
          and contribute to humanity's evolving consciousness.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-2">
          <Link to="/consciousness" className="cosmic-button flex items-center w-full sm:w-auto justify-center">
            Begin the Journey
          </Link>
          <Link to="/meditation" className="cosmic-button-secondary flex items-center w-full sm:w-auto justify-center">
            Join Meditation
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-float">
        <p className="text-sm text-white/60">Explore More</p>
        <ArrowDown size={20} className="text-white/60" />
      </div>
    </div>
  );
};

export default Hero;
