import { motion } from "framer-motion";

const ingredients = [
  { label: "Genre", emoji: "📚", options: ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Adventure", "Horror"], color: "bg-primary/10" },
  { label: "Setting / World", emoji: "🌍", options: ["Enchanted Forest", "Space Station", "Underwater City", "Medieval Kingdom"], color: "bg-secondary/20" },
  { label: "Main Character", emoji: "🦊", options: ["Brave Hero", "Curious Child", "Wise Elder", "Mischievous Animal"], color: "bg-accent/20" },
  { label: "Goal / Mission", emoji: "🎯", options: ["Find a Treasure", "Save Someone", "Solve a Mystery", "Learn a Lesson"], color: "bg-primary/10" },
  { label: "Conflict", emoji: "⚡", options: ["A Villain", "Nature's Fury", "Inner Fear", "A Riddle"], color: "bg-secondary/20" },
  { label: "Supporting Characters", emoji: "🧚", options: ["A Talking Pet", "A Wise Mentor", "A Funny Sidekick", "A Rival"], color: "bg-accent/20" },
  { label: "Tone / Mood", emoji: "🎭", options: ["Whimsical", "Suspenseful", "Heartwarming", "Dark"], color: "bg-primary/10" },
  { label: "Plot Twist", emoji: "🔮", options: ["Betrayal", "Hidden Identity", "Time Loop", "Dream Within Dream"], color: "bg-secondary/20" },
  { label: "Ending Type", emoji: "🌈", options: ["Happy", "Bittersweet", "Cliffhanger", "Open-Ended"], color: "bg-accent/20" },
  { label: "Audience", emoji: "👶", options: ["Kids (3-7)", "Tweens (8-12)", "Teens", "Adults"], color: "bg-primary/10" },
  { label: "Story Length", emoji: "📏", options: ["Short (2 min)", "Medium (5 min)", "Long (10 min)"], color: "bg-secondary/20" },
];

interface IngredientCardProps {
  ingredient: typeof ingredients[0];
  selected: string | null;
  onSelect: (label: string, value: string) => void;
}

const IngredientCard = ({ ingredient, selected, onSelect }: IngredientCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${ingredient.color} rounded-4xl p-4 shadow-warm backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{ingredient.emoji}</span>
        <h3 className="font-display text-sm font-semibold text-foreground">{ingredient.label}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ingredient.options.map((option) => (
          <motion.button
            key={option}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(ingredient.label, option)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-300 ${
              selected === option
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-background/80 text-foreground/70 hover:bg-accent/50"
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export { ingredients, IngredientCard };
export type { IngredientCardProps };
