import { motion } from 'framer-motion'

interface CategoryTabsProps {
  activeCategory: 'personal' | 'shared' | 'borrowed'
  setActiveCategory: (category: 'personal' | 'shared' | 'borrowed') => void
}

export default function CategoryTabs({ activeCategory, setActiveCategory }: CategoryTabsProps) {
  const categories = [
    { id: 'personal', label: '👤 Personal', description: 'Your personal items' },
    { id: 'shared', label: '🤝 Shared', description: 'Items shared with roommates' },
    { id: 'borrowed', label: '🤲 Borrowed', description: 'Items borrowed from others' },
  ] as const

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className="relative flex-shrink-0 px-6 py-3 rounded-xl font-medium text-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={`absolute inset-0 rounded-xl transition-all ${
              activeCategory === category.id
                ? 'bg-primary-600 shadow-medium'
                : 'bg-white border border-slate-200'
            }`}
          />
          <motion.span
            className={`relative block ${
              activeCategory === category.id ? 'text-white' : 'text-slate-700'
            }`}
            initial={false}
            animate={{
              x: 0,
              transition: { type: 'spring', stiffness: 300, damping: 30 },
            }}
          >
            {category.label}
          </motion.span>
        </motion.button>
      ))}
    </div>
  )
}
