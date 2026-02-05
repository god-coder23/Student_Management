import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AnimatedBlob from '../components/AnimatedBlob'
import Hero3D from '../components/Hero3D'
import FeaturesSection3D from '../components/FeaturesSection3D'

export default function HomePage() {

  return (
    <div className="relative overflow-hidden">
      <AnimatedBlob />

      {/* 3D Hero Section */}
      <Hero3D />

      {/* 3D Features Section */}
      <FeaturesSection3D />

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 sm:p-16 text-center text-white shadow-lg-soft relative overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"
            />

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10">
              Ready to organize?
            </h2>
            <p className="text-lg mb-8 text-primary-100 relative z-10">
              Join thousands of students who manage their inventory with ease.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10 inline-block"
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-soft"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-600">
          <p>© 2024 Student Inventory. Built for hostel life.</p>
        </div>
      </footer>
    </div>
  )
}
