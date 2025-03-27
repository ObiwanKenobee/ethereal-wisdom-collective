
import { useState } from "react";
import { Book, BookOpen, Search, Star } from "lucide-react";

type KnowledgeCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
};

type KnowledgeItem = {
  id: string;
  title: string;
  excerpt: string;
  categories: string[];
  source: string;
  featured?: boolean;
};

const categories: KnowledgeCategory[] = [
  { id: "philosophy", name: "Philosophy", icon: <Book size={18} />, color: "border-purple-500" },
  { id: "religion", name: "Religion", icon: <BookOpen size={18} />, color: "border-blue-500" },
  { id: "science", name: "Science", icon: <Search size={18} />, color: "border-green-500" },
  { id: "wisdom", name: "Wisdom", icon: <Star size={18} />, color: "border-amber-500" },
];

const knowledgeItems: KnowledgeItem[] = [
  {
    id: "republic",
    title: "The Republic",
    excerpt: "In the allegory of the cave, Plato explores how our perception of reality is shaped by our experiences and education.",
    categories: ["philosophy"],
    source: "Plato, 380 BCE",
    featured: true,
  },
  {
    id: "dhammapada",
    title: "Dhammapada",
    excerpt: "Mind precedes all mental states. Mind is their chief; they are all mind-wrought. If with a pure mind a person speaks or acts, happiness follows.",
    categories: ["religion", "wisdom"],
    source: "Buddhist Scripture, 5th Century BCE",
  },
  {
    id: "tao-te-ching",
    title: "Tao Te Ching",
    excerpt: "The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.",
    categories: ["philosophy", "religion"],
    source: "Lao Tzu, 6th Century BCE",
    featured: true,
  },
  {
    id: "meditations",
    title: "Meditations",
    excerpt: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    categories: ["philosophy", "wisdom"],
    source: "Marcus Aurelius, 2nd Century CE",
  },
  {
    id: "consciousness-intro",
    title: "The Nature of Consciousness",
    excerpt: "Consciousness remains one of the greatest mysteries in science, bridging philosophy, neuroscience, and quantum physics.",
    categories: ["science", "philosophy"],
    source: "Modern Research Compilation",
    featured: true,
  },
];

const KnowledgeVault = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  const filteredItems = knowledgeItems.filter(item => {
    // Filter by category if any are selected
    const matchesCategory = selectedCategories.length === 0 || 
      item.categories.some(cat => selectedCategories.includes(cat));
    
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const featuredItems = knowledgeItems.filter(item => item.featured);
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold mb-2 glow-text">Knowledge Vault</h2>
        <p className="text-white/70">
          Explore the decentralized repository of wisdom, stored immutably on the blockchain.
        </p>
      </div>
      
      {/* Featured Scrolls */}
      <div className="mb-10">
        <h3 className="text-lg font-medium mb-4 text-white/90">Featured Wisdom</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredItems.map(item => (
            <div key={item.id} className="cosmic-card hover:border-celestial-purple/40 transition-all duration-300 group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="text-sm px-3 py-1 bg-cosmic-medium/40 rounded-full text-white/70">
                  {categories.find(cat => cat.id === item.categories[0])?.name}
                </div>
                <Star size={16} className="text-celestial-gold" />
              </div>
              <h4 className="text-xl font-medium mb-2 text-white group-hover:text-celestial-gold transition-colors duration-300">{item.title}</h4>
              <p className="text-white/70 mb-4">{item.excerpt}</p>
              <div className="text-sm text-white/50">{item.source}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search the knowledge vault..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-celestial-purple/50"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`px-3 py-2 rounded-lg flex items-center space-x-2 border transition-colors duration-300 ${
                selectedCategories.includes(category.id)
                  ? `bg-cosmic-medium/40 ${category.color} border-opacity-70`
                  : 'bg-cosmic-medium/20 border-cosmic-medium/30'
              }`}
            >
              <span className={selectedCategories.includes(category.id) ? 'text-white' : 'text-white/70'}>
                {category.icon}
              </span>
              <span className={selectedCategories.includes(category.id) ? 'text-white' : 'text-white/70'}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Knowledge Scrolls */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="cosmic-card hover:border-celestial-purple/40 transition-all duration-300 group cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    {item.categories.map(catId => (
                      <span key={catId} className="text-sm px-3 py-1 bg-cosmic-medium/40 rounded-full text-white/70">
                        {categories.find(cat => cat.id === catId)?.name}
                      </span>
                    ))}
                  </div>
                  {item.featured && <Star size={16} className="text-celestial-gold" />}
                </div>
                <h4 className="text-xl font-medium mb-2 text-white group-hover:text-celestial-gold transition-colors duration-300">{item.title}</h4>
                <p className="text-white/70 mb-4">{item.excerpt}</p>
                <div className="text-sm text-white/50">{item.source}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-white/50">
              <p>No knowledge scrolls found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeVault;
