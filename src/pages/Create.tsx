
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/animated-bg";
import { Music, Image as ImageIcon, MessageCircle, Sparkles } from "lucide-react";

const CreatePage = () => {
  const [activeTab, setActiveTab] = useState<"art" | "music" | "poetry">("art");
  
  return (
    <div className="min-h-screen bg-cosmic-dark">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold mb-2 glow-text">
                Create & Share
              </h2>
              <p className="text-white/70">
                Generate AI-powered peace art, music, and poetry that reflects your inner vision.
              </p>
            </div>
            
            {/* Creation Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-cosmic-medium/30">
                <button
                  onClick={() => setActiveTab("art")}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors duration-300 ${
                    activeTab === "art" 
                      ? "text-celestial-purple border-b-2 border-celestial-purple" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <ImageIcon size={18} />
                  <span>Art</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("music")}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors duration-300 ${
                    activeTab === "music" 
                      ? "text-celestial-purple border-b-2 border-celestial-purple" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Music size={18} />
                  <span>Music</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("poetry")}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors duration-300 ${
                    activeTab === "poetry" 
                      ? "text-celestial-purple border-b-2 border-celestial-purple" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <MessageCircle size={18} />
                  <span>Poetry</span>
                </button>
              </div>
            </div>
            
            {/* Content based on active tab */}
            <div className="cosmic-card">
              {activeTab === "art" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Create Visual Art</h3>
                  
                  <div className="mb-6">
                    <label className="block text-white/90 mb-2">Describe your vision</label>
                    <textarea
                      placeholder="A cosmic landscape representing the journey of consciousness, with flowing energy and sacred geometry..."
                      className="w-full h-32 px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-celestial-purple/50"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-white/90 mb-2">Style</label>
                      <select className="w-full px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-celestial-purple/50">
                        <option>Sacred Geometry</option>
                        <option>Ethereal Dreamscape</option>
                        <option>Cosmic Abstract</option>
                        <option>Mandala</option>
                        <option>Celestial</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/90 mb-2">Color Palette</label>
                      <select className="w-full px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-celestial-purple/50">
                        <option>Cosmic Purples & Blues</option>
                        <option>Golden Ethereal</option>
                        <option>Earth Tones</option>
                        <option>Vibrant Rainbow</option>
                        <option>Monochromatic</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <button className="cosmic-button flex items-center space-x-2">
                      <Sparkles size={18} />
                      <span>Generate Art</span>
                    </button>
                  </div>
                  
                  <div className="bg-cosmic-deep/50 border border-cosmic-medium/30 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-cosmic-medium/40">
                      <ImageIcon size={32} className="text-white/70" />
                    </div>
                    <h4 className="text-lg font-medium text-white/80 mb-2">Your Art Will Appear Here</h4>
                    <p className="text-white/60 max-w-md">
                      Describe your vision above and generate AI art that reflects your inner consciousness. 
                      You can save and share your creations with the global community.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === "music" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Generate Music</h3>
                  
                  <div className="mb-6">
                    <label className="block text-white/90 mb-2">Describe your sound</label>
                    <textarea
                      placeholder="A calming ambient piece with Tibetan singing bowls and gentle flowing water sounds..."
                      className="w-full h-32 px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-celestial-purple/50"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-white/90 mb-2">Genre</label>
                      <select className="w-full px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-celestial-purple/50">
                        <option>Ambient Meditation</option>
                        <option>Binaural Beats</option>
                        <option>World Fusion</option>
                        <option>Ethereal Electronic</option>
                        <option>Classical Minimalist</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/90 mb-2">Duration</label>
                      <select className="w-full px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-celestial-purple/50">
                        <option>1 minute</option>
                        <option>3 minutes</option>
                        <option>5 minutes</option>
                        <option>10 minutes</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <button className="cosmic-button flex items-center space-x-2">
                      <Sparkles size={18} />
                      <span>Generate Music</span>
                    </button>
                  </div>
                  
                  <div className="bg-cosmic-deep/50 border border-cosmic-medium/30 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-cosmic-medium/40">
                      <Music size={32} className="text-white/70" />
                    </div>
                    <h4 className="text-lg font-medium text-white/80 mb-2">Your Music Will Appear Here</h4>
                    <p className="text-white/60 max-w-md">
                      Describe the sounds you envision and generate unique music that resonates with your consciousness. 
                      Perfect for meditation, reflection, or sharing with others.
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === "poetry" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Create Poetry</h3>
                  
                  <div className="mb-6">
                    <label className="block text-white/90 mb-2">Theme or concept</label>
                    <textarea
                      placeholder="The interconnectedness of all consciousness, the dance between light and shadow..."
                      className="w-full h-32 px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-celestial-purple/50"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-white/90 mb-2">Style</label>
                      <select className="w-full px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-celestial-purple/50">
                        <option>Mystical</option>
                        <option>Philosophical</option>
                        <option>Haiku</option>
                        <option>Free Verse</option>
                        <option>Spiritual</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/90 mb-2">Inspiration</label>
                      <select className="w-full px-4 py-3 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-celestial-purple/50">
                        <option>Rumi</option>
                        <option>Lao Tzu</option>
                        <option>Mary Oliver</option>
                        <option>Khalil Gibran</option>
                        <option>Original</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <button className="cosmic-button flex items-center space-x-2">
                      <Sparkles size={18} />
                      <span>Generate Poetry</span>
                    </button>
                  </div>
                  
                  <div className="bg-cosmic-deep/50 border border-cosmic-medium/30 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <div className="h-16 w-16 mb-4 flex items-center justify-center rounded-full bg-cosmic-medium/40">
                      <MessageCircle size={32} className="text-white/70" />
                    </div>
                    <h4 className="text-lg font-medium text-white/80 mb-2">Your Poetry Will Appear Here</h4>
                    <p className="text-white/60 max-w-md">
                      Express your inner thoughts through AI-generated poetry inspired by your themes.
                      The words will reflect the consciousness you wish to manifest.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatePage;
