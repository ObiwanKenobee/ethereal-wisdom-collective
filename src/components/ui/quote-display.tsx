
import { useState, useEffect } from "react";

interface QuoteDisplayProps {
  quotes: { text: string; author: string }[];
  interval?: number;
  className?: string;
}

export function QuoteDisplay({ quotes, interval = 10000, className = "" }: QuoteDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsAnimating(false);
      }, 600); // Match this with the animation duration
    }, interval);

    return () => clearInterval(timer);
  }, [quotes.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <blockquote
        className={`transition-all duration-600 ease-in-out ${
          isAnimating ? "opacity-0 transform -translate-y-4" : "opacity-100 transform translate-y-0"
        }`}
      >
        <p className="quote-text mb-2">"{quotes[currentIndex].text}"</p>
        <footer className="text-white/70 font-serif text-sm">— {quotes[currentIndex].author}</footer>
      </blockquote>
    </div>
  );
}
