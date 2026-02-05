import { motion } from "framer-motion";

interface CategoryTabsProps {
  activeCategory: "personal" | "shared" | "borrowed";
  setActiveCategory: (category: "personal" | "shared" | "borrowed") => void;
}

export default function CategoryTabs({
  activeCategory,
  setActiveCategory,
}: CategoryTabsProps) {
  const categories = [
    {
      id: "personal",
      label: "👤 Personal",
      description: "Your personal items",
    },
    {
      id: "shared",
      label: "🤝 Shared",
      description: "Items shared with roommates",
    },
    {
      id: "borrowed",
      label: "🤲 Borrowed",
      description: "Items borrowed from others",
    },
  ] as const;

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
      {categories.map((category, idx) => (
        <motion.button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className="relative flex-shrink-0 px-6 py-3 rounded-xl font-medium text-sm transition-colors snap-center group"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: idx * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <motion.div
            layoutId="activeTab"
            className={`absolute inset-0 rounded-xl transition-all ${
              activeCategory === category.id
                ? "bg-primary-600 shadow-medium"
                : "bg-white border border-slate-200 group-hover:border-primary-300"
            }`}
            initial={false}
            animate={{
              backgroundColor:
                activeCategory === category.id ? "rgb(13, 148, 136)" : "white",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.span
            className={`relative block transition-colors ${
              activeCategory === category.id
                ? "text-white"
                : "text-slate-700 group-hover:text-primary-600"
            }`}
            initial={false}
            animate={{
              color:
                activeCategory === category.id ? "white" : "rgb(55, 65, 81)",
            }}
          >
            {category.label}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}
