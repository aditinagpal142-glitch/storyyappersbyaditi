import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IngredientCard, ingredients } from "@/components/IngredientCard";
import PulsingDots from "@/components/PulsingDots";
import { toast } from "sonner";

const WEBHOOK_URL = "https://workflow.ccbp.in/webhook/4d1b7e01-ddf7-4f81-b94b-b477a4bde18b";

const StoryYappers = () => {
  const [topic, setTopic] = useState("");
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (label: string, value: string) => {
    setSelections((prev) => ({ ...prev, [label]: value }));
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast("Please enter a story topic first!");
      return;
    }
    setIsLoading(true);
    setAudioUrl(null);
    setError(null);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: topic }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (data.audioFile) {
        setAudioUrl(data.audioFile);
        setTopic("");
      } else {
        throw new Error("No audio returned");
      }
    } catch {
      setError("Oops! Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
          >
            ✨ Story Yappers
          </motion.h1>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6 pb-24 space-y-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] text-foreground">
            Where will we go today?
          </h2>
          <p className="font-body text-muted-foreground text-base">
            Spark a story. Choose your ingredients. Let the magic begin.
          </p>
        </motion.div>

        {/* Topic Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="A brave squirrel finding a golden acorn in a neon city..."
            className="w-full h-32 p-6 rounded-4xl bg-card/70 backdrop-blur-sm border-2 border-dashed border-primary/20 ring-4 ring-muted focus:ring-primary/20 focus:border-primary/40 transition-all duration-500 placeholder:text-muted-foreground/50 text-foreground text-lg font-body resize-none outline-none shadow-warm"
          />
          <div className="absolute -bottom-2 -right-2 text-4xl opacity-20 group-focus-within:opacity-80 transition-opacity duration-500">
            ✨
          </div>
        </motion.div>

        {/* Story Ingredients */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            🧪 Story Ingredients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <IngredientCard
                  ingredient={ing}
                  selected={selections[ing.label] || null}
                  onSelect={handleSelect}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "hsl(45, 91%, 72%)" }}
            whileTap={{ scale: 0.98, rotate: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-5 bg-primary text-primary-foreground rounded-full font-body font-bold text-lg shadow-warm hover:shadow-glow flex items-center justify-center gap-3 transition-shadow duration-300 disabled:opacity-70"
          >
            Generate Storytelling 🔊
          </motion.button>
        </motion.div>

        {/* Audio Player Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="rounded-4xl bg-card/60 backdrop-blur-sm p-8 shadow-warm border border-border/50 min-h-[120px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PulsingDots />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-2"
              >
                <span className="text-4xl">😔</span>
                <p className="font-display text-lg font-semibold text-destructive">
                  {error}
                </p>
              </motion.div>
            ) : audioUrl ? (
              <motion.div
                key="audio"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 w-full"
              >
                <span className="text-4xl">🎧</span>
                <p className="font-display text-lg font-semibold text-foreground">
                  Story is ready! Click play to listen ✨
                </p>
                <audio controls className="w-full rounded-full" src={audioUrl}>
                  Your browser does not support audio.
                </audio>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-muted-foreground text-center"
              >
                🎙️ Story will appear here.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-8 pb-4 space-y-1"
        >
          <p className="font-body text-sm text-muted-foreground">
            Made with ✨ by <span className="font-semibold text-foreground">Aditi Nagpal</span>
          </p>
          <p className="font-display text-xs text-muted-foreground/60">
            Story Yappers © 2026
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default StoryYappers;
