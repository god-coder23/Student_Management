import { motion } from 'framer-motion'
import { MoreVertical, Check, AlertCircle } from 'lucide-react'

interface Item {
  id: number
  name: string
  status: 'available' | 'in-use' | 'with-owner'
  category: string
  location: string
  color: string
}

interface ItemCardProps {
  item: Item
  index: number
}

export default function ItemCard({ item, index }: ItemCardProps) {
  const statusConfig = {
    available: { label: 'Available', color: 'bg-green-100 text-green-700', icon: Check },
    'in-use': { label: 'In Use', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
    'with-owner': { label: 'With Owner', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  }

  const config = statusConfig[item.status]
  const StatusIcon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="h-full"
      >
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-medium transition-shadow h-full flex flex-col">
          {/* Card Header with Color Bar */}
          <div className={`${item.color} h-24 relative overflow-hidden`}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-5xl">{item.name.charAt(0)}</div>
            </motion.div>
          </div>

          {/* Card Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
            
            {/* Status Badge */}
            <motion.div
              className={`inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 ${config.color}`}
              whileHover={{ scale: 1.05 }}
            >
              <StatusIcon className="w-3 h-3" />
              <span>{config.label}</span>
            </motion.div>

            {/* Location */}
            <p className="text-sm text-slate-600 mb-4">
              📍 {item.location}
            </p>

            {/* Action Icons */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
              >
                View
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
