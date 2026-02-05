import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Users } from 'lucide-react'
import AnimatedBlob from '../components/AnimatedBlob'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <AnimatedBlob />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={item} className="inline-block mb-6">
              <div className="px-4 py-2 bg-primary-100 rounded-full border border-primary-300">
                <p className="text-sm font-medium text-primary-700">✨ Modern inventory management</p>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              Never Lose Track of Your
              <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 bg-clip-text text-transparent"> Items Again</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            >
              Organize your personal, shared, and borrowed items with a premium, intuitive interface. Built for hostel life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-soft hover:shadow-medium"
              >
                Start Managing Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-900 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed for your lifestyle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Secure Organization',
                description: 'Keep track of personal, shared, and borrowed items with clear categorization.',
              },
              {
                icon: Zap,
                title: 'Instant Insights',
                description: 'Quick status overview and real-time updates on all your inventory.',
              },
              {
                icon: Users,
                title: 'Shared Access',
                description: 'Coordinate with roommates and manage shared items effortlessly.',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-medium transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 sm:p-16 text-center text-white shadow-lg-soft"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to organize?
            </h2>
            <p className="text-lg mb-8 text-primary-100">
              Join thousands of students who manage their inventory with ease.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
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
