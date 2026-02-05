import { motion } from "framer-motion";
import { MoreVertical, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Item {
  id: number;
  name: string;
  status: "available" | "in-use" | "with-owner";
  category: string;
  location: string;
  color: string;
}

interface ItemCardProps {
  item: Item;
  index: number;
}

export default function ItemCard({ item, index }: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    available: {
      label: "Available",
      color: "bg-green-100 text-green-700",
      icon: Check,
    },
    "in-use": {
      label: "In Use",
      color: "bg-amber-100 text-amber-700",
      icon: AlertCircle,
    },
    "with-owner": {
      label: "With Owner",
      color: "bg-blue-100 text-blue-700",
      icon: AlertCircle,
    },
  };

  const config = statusConfig[item.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="h-full"
      >
        <div
          className={`bg-white rounded-2xl border transition-all h-full flex flex-col ${
            isHovered
              ? "border-primary-300 shadow-lg-soft"
              : "border-slate-200 shadow-soft"
          }`}
        >
          {/* Card Header with Color Bar */}
          <div
            className={`${item.color} h-24 relative overflow-hidden flex items-center justify-center`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 + 0.15 }}
              className="text-6xl font-bold text-slate-300 opacity-40"
            >
              {item.name.charAt(0)}
            </motion.div>

            {/* Hover glow effect */}
            <motion.div
              animate={
                isHovered
                  ? { scale: 1.5, opacity: 0 }
                  : { scale: 1, opacity: 0.5 }
              }
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full blur-3xl opacity-0"
            />
          </div>

          {/* Card Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {item.name}
            </h3>

            {/* Status Badge with pulse effect */}
            <motion.div
              className={`inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 ${config.color}`}
              whileHover={{ scale: 1.08 }}
              animate={
                item.status === "available" ? {} : { opacity: [1, 0.8, 1] }
              }
              transition={
                item.status === "available"
                  ? {}
                  : { duration: 2, repeat: Infinity }
              }
            >
              <motion.div
                animate={
                  item.status === "available" ? { scale: [1, 1.2, 1] } : {}
                }
                transition={
                  item.status === "available"
                    ? { duration: 2, repeat: Infinity }
                    : {}
                }
              >
                <StatusIcon className="w-3 h-3" />
              </motion.div>
              <span>{config.label}</span>
            </motion.div>

            {/* Location */}
            <p className="text-sm text-slate-600 mb-4 flex items-center gap-1">
              <motion.span
                animate={isHovered ? { x: 2 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                📍
              </motion.span>
              {item.location}
            </p>

            {/* Action Icons */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors shadow-soft hover:shadow-medium"
              >
                View
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
