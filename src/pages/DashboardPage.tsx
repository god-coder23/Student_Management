import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter } from 'lucide-react'
import CategoryTabs from '../components/CategoryTabs'
import ItemCard from '../components/ItemCard'
import Dashboard3D from '../components/Dashboard3D'

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState<'personal' | 'shared' | 'borrowed'>('personal')
  const [searchTerm, setSearchTerm] = useState('')

  const mockItems = {
    personal: [
      { id: 1, name: 'Laptop', status: 'available', category: 'personal', location: 'Desk', color: 'bg-blue-100' },
      { id: 2, name: 'Headphones', status: 'available', category: 'personal', location: 'Locker', color: 'bg-purple-100' },
      { id: 3, name: 'Phone Charger', status: 'available', category: 'personal', location: 'Bedside', color: 'bg-amber-100' },
      { id: 4, name: 'Books', status: 'in-use', category: 'personal', location: 'Study Table', color: 'bg-green-100' },
    ],
    shared: [
      { id: 5, name: 'Mini Fridge', status: 'available', category: 'shared', location: 'Common Room', color: 'bg-cyan-100' },
      { id: 6, name: 'Gaming Console', status: 'in-use', category: 'shared', location: 'Lounge', color: 'bg-pink-100' },
      { id: 7, name: 'Microwave', status: 'available', category: 'shared', location: 'Kitchen', color: 'bg-red-100' },
    ],
    borrowed: [
      { id: 8, name: 'Camera', status: 'with-owner', category: 'borrowed', location: 'Friend\'s Room', color: 'bg-indigo-100' },
      { id: 9, name: 'Projector', status: 'available', category: 'borrowed', location: 'Common Room', color: 'bg-emerald-100' },
    ],
  }

  const currentItems = mockItems[activeCategory].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
            Your Inventory
          </h1>
          <p className="text-lg text-slate-600">
            Manage and organize all your items in one place
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <motion.input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-primary-300 transition-colors font-medium text-sm"
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium text-sm shadow-soft hover:shadow-medium"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Item</span>
          </motion.button>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </motion.div>

        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentItems.length > 0 ? (
              currentItems.map((item, idx) => (
                <ItemCard key={item.id} item={item} index={idx} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 text-lg">No items found</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
        >
          {[
            { label: 'Total Items', value: '13', color: 'from-blue-500 to-blue-600' },
            { label: 'Available', value: '10', color: 'from-green-500 to-green-600' },
            { label: 'In Use', value: '3', color: 'from-primary-500 to-primary-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-medium hover:shadow-lg-soft transition-shadow`}
            >
              <motion.p
                className="text-sm font-medium opacity-90"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.label}
              </motion.p>
              <motion.p
                className="text-3xl font-bold mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12 + 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
