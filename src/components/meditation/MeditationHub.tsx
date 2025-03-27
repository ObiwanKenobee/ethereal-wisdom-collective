
import { useState, useEffect, useRef } from "react";
import { Globe, Play, Pause, Clock, Users } from "lucide-react";

const MeditationHub = () => {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [globalMeditators, setGlobalMeditators] = useState(1432);
  const intervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Handle timer functionality
  useEffect(() => {
    if (isActive && timer > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(intervalRef.current as number);
      setIsActive(false);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timer]);
  
  // Format timer to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Randomly adjust global meditator count
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalMeditators(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        return Math.max(1000, prev + change);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Canvas animation for meditation visualization
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
    
    // Ripple effect
    const ripples: { radius: number; maxRadius: number; opacity: number }[] = [];
    
    const addRipple = () => {
      if (isActive) {
        ripples.push({
          radius: 0,
          maxRadius: Math.min(canvas.width, canvas.height) * 0.4,
          opacity: 0.8,
        });
      }
    };
    
    // Add initial ripple
    addRipple();
    
    // Add new ripple every 3 seconds if meditation is active
    const rippleInterval = setInterval(() => {
      if (isActive) {
        addRipple();
      }
    }, 3000);
    
    const drawRipples = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.3)';
      ctx.fill();
      
      // Draw pulsing glow around center
      const pulseSize = 10 + Math.sin(Date.now() * 0.003) * 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50 + pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.fill();
      
      // Draw ripples
      for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update ripple
        ripple.radius += 1;
        ripple.opacity -= 0.005;
        
        // Remove ripple if it's too large or too transparent
        if (ripple.radius > ripple.maxRadius || ripple.opacity <= 0) {
          ripples.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(drawRipples);
    };
    
    drawRipples();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(rippleInterval);
    };
  }, [isActive]);
  
  // Handle timer controls
  const handleToggleMeditation = () => {
    setIsActive(!isActive);
  };
  
  const handleResetTimer = () => {
    setIsActive(false);
    setTimer(600); // Reset to 10 minutes
  };
  
  // Timer length options
  const timerOptions = [
    { label: "5 min", value: 300 },
    { label: "10 min", value: 600 },
    { label: "15 min", value: 900 },
    { label: "20 min", value: 1200 },
    { label: "30 min", value: 1800 },
  ];
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2 glow-text">Global Meditation Hub</h2>
        <p className="text-white/70">
          Join thousands in meditation, contributing to the global field of consciousness.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
        {/* Left Side - Meditation Visualization */}
        <div className="flex flex-col">
          <div className="cosmic-card flex-1 flex flex-col items-center justify-center relative overflow-hidden mb-4">
            <canvas ref={canvasRef} className="absolute inset-0"></canvas>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-5xl font-semibold mb-2 text-white">{formatTime(timer)}</div>
              <div className="text-lg text-white/70 mb-8">
                {isActive ? "Meditation in progress" : "Ready to begin"}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleToggleMeditation}
                  className={`flex items-center justify-center h-14 w-14 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-cosmic-medium/50 hover:bg-cosmic-medium/70" 
                      : "bg-celestial-purple hover:bg-celestial-purple/80"
                  }`}
                >
                  {isActive ? <Pause size={24} /> : <Play size={24} />}
                </button>
                
                <button
                  onClick={handleResetTimer}
                  className="flex items-center justify-center h-14 w-14 rounded-full bg-cosmic-medium/30 hover:bg-cosmic-medium/50 transition-all duration-300"
                  disabled={isActive}
                >
                  <Clock size={24} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Timer Controls */}
          <div className="cosmic-card">
            <h3 className="text-lg font-medium mb-4 text-white">Meditation Duration</h3>
            <div className="grid grid-cols-5 gap-2">
              {timerOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => !isActive && setTimer(option.value)}
                  className={`px-3 py-2 rounded-lg text-center ${
                    timer === option.value
                      ? "bg-celestial-purple text-white"
                      : "bg-cosmic-medium/30 text-white/70 hover:bg-cosmic-medium/50 hover:text-white"
                  } transition-all duration-300`}
                  disabled={isActive}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Side - Global Statistics */}
        <div className="flex flex-col space-y-6">
          <div className="cosmic-card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-cosmic-medium/40 flex items-center justify-center">
                  <Globe size={24} className="text-celestial-blue" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-white">Global Meditation Network</h3>
                <p className="text-white/70 mb-4">
                  Join meditators worldwide to amplify collective consciousness. 
                  Our network visualizes real-time meditation activity across the globe.
                </p>
                
                <div className="flex items-center space-x-2 mb-1">
                  <Users size={16} className="text-celestial-gold" />
                  <span className="text-white/70 text-sm">Active Meditators</span>
                </div>
                <div className="text-3xl font-semibold text-white mb-4">{globalMeditators.toLocaleString()}</div>
                
                <div className="glass-panel p-4">
                  <div className="text-sm text-white/70 mb-2">Current Hotspots</div>
                  <div className="flex flex-wrap gap-2">
                    {["Asia", "Europe", "North America", "Australia", "South America"].map(region => (
                      <div key={region} className="text-xs px-3 py-1 bg-cosmic-medium/40 rounded-full text-white/90">
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cosmic-card">
            <h3 className="text-lg font-medium mb-4 text-white">Meditation Guidance</h3>
            <ol className="space-y-4 text-white/70">
              <li className="flex space-x-3">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cosmic-medium/40 text-white text-sm">1</span>
                <span>Find a comfortable seated position and gently close your eyes</span>
              </li>
              <li className="flex space-x-3">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cosmic-medium/40 text-white text-sm">2</span>
                <span>Take deep breaths, focusing on the sensation of air entering and leaving your body</span>
              </li>
              <li className="flex space-x-3">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cosmic-medium/40 text-white text-sm">3</span>
                <span>When thoughts arise, acknowledge them without judgment and return to your breath</span>
              </li>
              <li className="flex space-x-3">
                <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cosmic-medium/40 text-white text-sm">4</span>
                <span>Set an intention to connect with the collective consciousness of all meditators</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationHub;
