
import { QuoteDisplay } from "../ui/quote-display";

const quotes = [
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates"
  },
  {
    text: "Sell your cleverness and buy bewilderment.",
    author: "Rumi"
  },
  {
    text: "The flame that burns twice as bright burns half as long.",
    author: "Laozi"
  },
  {
    text: "Between stimulus and response there is a space. In that space is our power to choose our response.",
    author: "Viktor Frankl"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.",
    author: "Pierre Teilhard de Chardin"
  }
];

const Quotes = () => {
  return (
    <section className="py-20 px-6 bg-cosmic-deep/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 glow-text">
              Timeless Wisdom
            </h2>
            <p className="text-lg text-white/70 mb-10">
              The greatest minds throughout history have illuminated the path to consciousness.
            </p>
          </div>
          
          <div className="cosmic-card min-h-[200px] flex items-center justify-center">
            <QuoteDisplay quotes={quotes} interval={8000} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
