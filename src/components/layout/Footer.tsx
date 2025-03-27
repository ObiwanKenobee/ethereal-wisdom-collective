
import { Link } from "react-router-dom";
import { Heart, Globe, Book, MessageCircle, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-cosmic-medium/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-celestial-purple/20 rounded-full"></div>
                <div className="absolute inset-1 border border-celestial-purple/40 rounded-full"></div>
                <div className="absolute inset-2.5 bg-celestial-purple rounded-full"></div>
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-celestial-purple">G</span>CI
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs">
              The Global Consciousness Initiative connects minds across the world through wisdom, 
              meditation, and the creative expression of human potential.
            </p>
            <div className="text-sm text-white/60">
              Made with <Heart size={14} className="inline text-celestial-purple" /> for humanity
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/80">Explore</h4>
            <ul className="space-y-2">
              {[
                { name: "Consciousness AI", path: "/consciousness", icon: MessageCircle },
                { name: "Knowledge Vault", path: "/knowledge", icon: Book },
                { name: "Global Meditation", path: "/meditation", icon: Globe },
                { name: "Create & Share", path: "/create", icon: Music },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <link.icon size={16} className="group-hover:text-celestial-purple transition-colors duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/80">Resources</h4>
            <ul className="space-y-2">
              {["Philosophy Library", "Meditation Guide", "Art Gallery", "About Us"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/80">Join Our Community</h4>
            <p className="text-sm text-white/60 mb-4">
              Subscribe to receive updates on new features, meditations, and wisdom.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-cosmic-deep border border-cosmic-medium/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-celestial-purple/50"
              />
              <button className="cosmic-button-secondary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cosmic-medium/20 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} Global Consciousness Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
