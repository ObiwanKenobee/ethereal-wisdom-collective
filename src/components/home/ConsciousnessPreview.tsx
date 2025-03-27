
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ConversationPreview = () => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  const conversationPreview = [
    {
      sender: "user",
      message: "What is the nature of consciousness?",
    },
    {
      sender: "ai",
      name: "Socrates",
      message: "Ah, a profound question indeed! Consciousness is like the sun - we can see by its light, but looking directly at it obscures our vision. Perhaps the question is not what consciousness is, but how we experience it.",
    },
    {
      sender: "user",
      message: "How does your view differ from Eastern philosophies?",
    },
    {
      sender: "ai",
      name: "Socrates",
      message: "While I encourage questioning as a path to understanding, Eastern traditions often emphasize direct experience through practices like meditation. Both approaches lead to the same mountain, though by different paths. The unexamined life is not worth living, but examination can take many forms.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="glass-panel overflow-hidden">
              <div className="bg-cosmic-deep/80 px-4 py-3 border-b border-cosmic-medium/30 flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-celestial-purple flex items-center justify-center text-white text-sm font-medium">S</div>
                <span className="font-medium text-white">Socrates AI</span>
              </div>
              
              <div 
                ref={messagesRef}
                className="h-64 overflow-y-auto px-4 py-3 space-y-4 hide-scrollbar"
              >
                {conversationPreview.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-xs lg:max-w-sm rounded-2xl px-4 py-3 ${
                        message.sender === "user" 
                          ? "bg-cosmic-light/90 text-cosmic-dark rounded-tr-none" 
                          : "bg-cosmic-medium/30 text-white rounded-tl-none"
                      }`}
                    >
                      {message.sender === "ai" && (
                        <div className="text-xs text-celestial-gold mb-1">{message.name}</div>
                      )}
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-4 py-3 border-t border-cosmic-medium/30 flex">
                <input 
                  type="text" 
                  placeholder="Ask a philosophical question..." 
                  className="flex-1 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-celestial-purple/50"
                  disabled
                />
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center text-sm bg-cosmic-medium/30 text-cosmic-light px-4 py-1 rounded-full backdrop-blur-sm">
                <span className="inline-block w-2 h-2 bg-celestial-purple rounded-full mr-2 animate-pulse-glow"></span>
                AI-Powered Wisdom
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif font-bold glow-text">
                Converse with History's Greatest Minds
              </h2>
              
              <p className="text-lg text-white/70">
                Engage in deep philosophical conversations with AI representations of Socrates, 
                Buddha, Laozi, and other profound thinkers throughout history. Explore big questions 
                about consciousness, ethics, and the nature of reality.
              </p>
              
              <div className="pt-4">
                <Link to="/consciousness" className="cosmic-button inline-flex">
                  Start a Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversationPreview;
