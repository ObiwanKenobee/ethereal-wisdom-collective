
import { MessageCircle, Book, Globe, Music } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MessageCircle,
    title: "Consciousness AI Chat",
    description: "Engage with digital recreations of history's greatest philosophers and thought leaders.",
    link: "/consciousness",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Book,
    title: "Knowledge Vault",
    description: "Access the decentralized repository of philosophical wisdom, religious texts, and timeless art.",
    link: "/knowledge",
    color: "from-blue-500/20 to-teal-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Globe,
    title: "Global Meditation Hub",
    description: "Visualize and join thousands meditating worldwide in real-time, contributing to collective consciousness.",
    link: "/meditation",
    color: "from-teal-500/20 to-green-500/20",
    borderColor: "border-teal-500/30",
  },
  {
    icon: Music,
    title: "Create & Share Art",
    description: "Generate AI-powered art, music, and poetry that reflects your inner vision and share it globally.",
    link: "/create",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  }
];

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 glow-text">
            Explore Dimensions of Consciousness
          </h2>
          <p className="text-lg text-white/70">
            Discover the four pillars of our global initiative, designed to expand awareness 
            and connect human consciousness across the planet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Link 
              key={feature.title} 
              to={feature.link}
              className="group"
            >
              <div className={`cosmic-card h-full border-opacity-30 ${feature.borderColor} hover:border-opacity-60 group-hover:translate-y-[-5px] group-hover:shadow-xl`}>
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} backdrop-blur-sm`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-celestial-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
