import { Link } from 'react-router-dom'
import { Boxes } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Boxes className="w-5 h-5 text-white" />
          </motion.div>
          <motion.span
            className="hidden sm:inline text-slate-900 group-hover:text-primary-600 transition-colors"
            whileHover={{ x: 2 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Inventory
          </motion.span>
        </Link>

        <div className="flex items-center gap-6">
          <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link
              to="/"
              className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors relative group"
            >
              Home
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary-600 w-0 group-hover:w-full"
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors relative group"
            >
              Dashboard
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary-600 w-0 group-hover:w-full"
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors shadow-soft hover:shadow-medium"
          >
            Sign In
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
