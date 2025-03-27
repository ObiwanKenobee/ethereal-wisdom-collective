
import { useState, useRef, useEffect } from "react";
import { Send, User, Lightbulb, Book } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  philosopher?: string;
  timestamp: Date;
};

type Philosopher = {
  id: string;
  name: string;
  era: string;
  tradition: string;
  icon: React.ReactNode;
};

const PHILOSOPHERS: Philosopher[] = [
  { 
    id: "socrates", 
    name: "Socrates", 
    era: "Classical Greece, 470-399 BCE",
    tradition: "Western Philosophy", 
    icon: <Lightbulb className="text-celestial-gold" />
  },
  { 
    id: "buddha", 
    name: "Buddha", 
    era: "Ancient India, c. 563-483 BCE",
    tradition: "Buddhism", 
    icon: <Book className="text-celestial-gold" />
  },
  { 
    id: "lao-tzu", 
    name: "Lao Tzu", 
    era: "Ancient China, 6th Century BCE",
    tradition: "Taoism", 
    icon: <Book className="text-celestial-gold" />
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    content: "Welcome to the Consciousness AI Chat. Choose a philosopher to begin your conversation about consciousness, wisdom, and the nature of reality.",
    sender: "ai",
    timestamp: new Date(),
  },
];

const ConsciousnessChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSelectPhilosopher = (philosopher: Philosopher) => {
    setSelectedPhilosopher(philosopher);
    
    // Add introduction message from selected philosopher
    const introMessages: { [key: string]: string } = {
      "socrates": "Greetings, I am Socrates. I know that I know nothing, and in this lies wisdom. What philosophical questions shall we explore today?",
      "buddha": "I am a digital representation of Buddha's teachings. Remember that all things are impermanent, and attachment leads to suffering. How may I guide your contemplation?",
      "lao-tzu": "The Tao that can be told is not the eternal Tao. I am here to discuss the way of nature and non-action. What wisdom do you seek?",
    };
    
    const newMessage: Message = {
      id: `intro-${philosopher.id}`,
      content: introMessages[philosopher.id] || "Greetings, I am ready to engage in philosophical discourse.",
      sender: "ai",
      philosopher: philosopher.name,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  
  const handleSendMessage = () => {
    if (!input.trim() || !selectedPhilosopher) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      // Generate mock philosophical response based on selected philosopher
      const responses: { [key: string]: string[] } = {
        "socrates": [
          "That is a profound question. Let us examine it together by questioning our assumptions. What do you believe to be true about this matter?",
          "The unexamined life is not worth living. Your question touches on this principle. Let us dissect it through dialogue.",
          "I cannot give you wisdom, but I can help you discover it within yourself. Let us examine this question further.",
        ],
        "buddha": [
          "Your question touches on the nature of suffering and impermanence. Consider that attachment to certainty may itself be causing confusion.",
          "The middle path suggests avoiding extremes of thought. Perhaps the answer lies neither in total acceptance nor rejection, but mindful awareness.",
          "All phenomena are empty of inherent existence. When we recognize this, we can approach your question with greater clarity.",
        ],
        "lao-tzu": [
          "The Tao flows like water, finding the path of least resistance. Perhaps the answer you seek requires not striving, but allowing.",
          "The wise person acts without effort and teaches without words. Consider what natural wisdom already exists in your experience.",
          "True wisdom comes in recognizing that opposites contain each other. Light contains darkness; knowledge contains ignorance.",
        ],
      };
      
      const philosopherResponses = responses[selectedPhilosopher.id] || ["Interesting question. Let us explore this further."];
      const randomResponse = philosopherResponses[Math.floor(Math.random() * philosopherResponses.length)];
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: randomResponse,
        sender: "ai",
        philosopher: selectedPhilosopher.name,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="h-full flex flex-col bg-cosmic-dark rounded-2xl overflow-hidden border border-cosmic-medium/20">
      {/* Header */}
      <div className="p-4 border-b border-cosmic-medium/20 bg-cosmic-deep flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {selectedPhilosopher ? (
            <>
              <div className="h-10 w-10 rounded-full bg-cosmic-medium/40 flex items-center justify-center">
                {selectedPhilosopher.icon}
              </div>
              <div>
                <h3 className="font-medium text-white">{selectedPhilosopher.name}</h3>
                <p className="text-xs text-white/60">{selectedPhilosopher.tradition}</p>
              </div>
            </>
          ) : (
            <h3 className="font-medium text-white">Consciousness AI Chat</h3>
          )}
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "user" ? (
              <div className="flex items-end space-x-2">
                <div className="max-w-[80%] bg-cosmic-light/90 text-cosmic-dark rounded-2xl rounded-br-none px-4 py-3">
                  <p>{message.content}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-cosmic-light/90 flex items-center justify-center text-cosmic-dark">
                  <User size={16} />
                </div>
              </div>
            ) : (
              <div className="flex items-end space-x-2">
                {message.philosopher ? (
                  <div className="h-8 w-8 rounded-full bg-cosmic-medium/40 flex items-center justify-center">
                    {PHILOSOPHERS.find(p => p.name === message.philosopher)?.icon || <Book className="text-celestial-gold" size={16} />}
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-celestial-purple flex items-center justify-center text-white">
                    AI
                  </div>
                )}
                <div className="max-w-[80%] bg-cosmic-medium/30 text-white rounded-2xl rounded-bl-none px-4 py-3">
                  {message.philosopher && (
                    <div className="text-xs text-celestial-gold mb-1">{message.philosopher}</div>
                  )}
                  <p>{message.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <div className="h-8 w-8 rounded-full bg-cosmic-medium/40 flex items-center justify-center">
                {selectedPhilosopher?.icon || <Book className="text-celestial-gold" size={16} />}
              </div>
              <div className="bg-cosmic-medium/30 text-white rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Philosopher Selection or Input Area */}
      {!selectedPhilosopher ? (
        <div className="p-4 border-t border-cosmic-medium/20 bg-cosmic-deep">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PHILOSOPHERS.map((philosopher) => (
              <button
                key={philosopher.id}
                className="cosmic-card flex flex-col items-center text-center p-4 hover:border-celestial-purple/50 transition-all duration-300"
                onClick={() => handleSelectPhilosopher(philosopher)}
              >
                <div className="h-12 w-12 rounded-full bg-cosmic-medium/40 flex items-center justify-center mb-3">
                  {philosopher.icon}
                </div>
                <h4 className="font-medium text-white mb-1">{philosopher.name}</h4>
                <p className="text-xs text-white/60">{philosopher.era}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-cosmic-medium/20">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={`Ask ${selectedPhilosopher.name} about consciousness, wisdom, or reality...`}
              className="flex-1 bg-cosmic-medium/20 border border-cosmic-medium/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-celestial-purple/50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className={`p-3 rounded-lg ${
                input.trim() 
                  ? "bg-celestial-purple text-white" 
                  : "bg-cosmic-medium/20 text-white/50"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsciousnessChat;
