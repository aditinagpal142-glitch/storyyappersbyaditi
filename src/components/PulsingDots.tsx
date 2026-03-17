import { motion } from "framer-motion";

const PulsingDots = () => (
  <div className="flex items-center justify-center gap-2 py-4">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-3 h-3 rounded-full"
        animate={{
          scale: [0.6, 1, 0.6],
          opacity: [0.4, 1, 0.4],
          backgroundColor: [
            "hsl(0, 100%, 77%)",
            "hsl(186, 38%, 75%)",
            "hsl(45, 91%, 72%)",
          ],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    ))}
    <span className="ml-2 text-sm font-body text-muted-foreground">
      Your tale is being woven from starlight...
    </span>
  </div>
);

export default PulsingDots;
