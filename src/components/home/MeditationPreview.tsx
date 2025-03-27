
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const MeditationPreview = () => {
  const [activeCount, setActiveCount] = useState(1432);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Randomly adjust active meditation count to simulate real-time changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        return Math.max(1000, prev + change);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Canvas animation for the global meditation visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
    
    // Create points distributed around the globe
    const points: {x: number, y: number, size: number, pulse: number, speed: number}[] = [];
    const pointCount = 50;
    
    for (let i = 0; i < pointCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * maxRadius;
      
      points.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: Math.random() * 3 + 1,
        pulse: Math.random(),
        speed: 0.02 + Math.random() * 0.03
      });
    }
    
    const drawCircle = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw main circle (globe)
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(155, 135, 245, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw meridian lines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * (0.4 + i * 0.3), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(155, 135, 245, 0.1)';
        ctx.stroke();
      }
      
      // Draw points
      points.forEach(point => {
        point.pulse += point.speed;
        if (point.pulse > 1) point.pulse = 0;
        
        const glowSize = Math.sin(point.pulse * Math.PI) * 8;
        
        // Glow
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, glowSize + point.size
        );
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.6)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, glowSize + point.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.fill();
      });
      
      // Connection lines between close points
      points.forEach((point, i) => {
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const distance = Math.sqrt(
            Math.pow(point.x - p2.x, 2) + Math.pow(point.y - p2.y, 2)
          );
          
          if (distance < maxRadius * 0.4) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / (maxRadius * 0.4))})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      requestAnimationFrame(drawCircle);
    };
    
    drawCircle();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <section className="py-20 px-6 bg-cosmic-deep/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="inline-flex items-center text-sm bg-cosmic-medium/30 text-cosmic-light px-4 py-1 rounded-full backdrop-blur-sm">
                <span className="inline-block w-2 h-2 bg-celestial-gold rounded-full mr-2 animate-pulse-glow"></span>
                Global Meditation Network
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-bold glow-text">
                Join Thousands in Collective Meditation
              </h2>
              
              <p className="text-lg text-white/70">
                Visualize and connect with meditators worldwide in real-time. Our consciousness 
                network tracks global meditation patterns and facilitates collective awareness experiences.
              </p>
              
              <div className="glass-panel px-6 py-4 inline-block">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-3 w-3 bg-celestial-gold rounded-full"></div>
                    <div className="absolute inset-0 bg-celestial-gold rounded-full animate-ripple"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">{activeCount.toLocaleString()}</div>
                    <div className="text-sm text-white/70">Currently Meditating</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/meditation" className="cosmic-button inline-flex">
                  Join Meditation
                </Link>
              </div>
            </div>
          </div>
          
          <div className="h-80 lg:h-96">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeditationPreview;
