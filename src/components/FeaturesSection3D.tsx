import { motion, useScroll } from 'framer-motion'
import { Shield, Zap, Users } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useParallax } from '../hooks/useScrollTransform'

const features = [
  {
    icon: Shield,
    title: 'Secure Organization',
    description: 'Keep track of personal, shared, and borrowed items with clear categorization.',
    color: 'from-blue-500 to-blue-600',
    delay: 0,
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Quick status overview and real-time updates on all your inventory.',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.1,
  },
  {
    icon: Users,
    title: 'Shared Access',
    description: 'Coordinate with roommates and manage shared items effortlessly.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2,
  },
]

export default function FeaturesSection3D() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-primary-50 to-white overflow-hidden"
    >
      {/* Background 3D layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            transform: `translateY(${(1 - scrollYProgress) * 100}px)`,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{
            transform: `translateY(${scrollYProgress * 150}px)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
          style={{
            transform: `perspective(1000px) rotateX(${(1 - scrollYProgress) * 5}deg)`,
          }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Everything you need
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Powerful features designed for your lifestyle with dimensional depth
          </p>
        </motion.div>

        {/* Feature cards with 3D depth */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <FeatureCard3D
                key={idx}
                feature={feature}
                index={idx}
                scrollProgress={scrollYProgress}
                prefersReducedMotion={prefersReducedMotion}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface FeatureCard3DProps {
  feature: typeof features[0]
  index: number
  scrollProgress: any
  prefersReducedMotion: boolean
}

function FeatureCard3D({ feature, index, scrollProgress, prefersReducedMotion }: FeatureCard3DProps) {
  const Icon = feature.icon
  const cardRef = useRef<HTMLDivElement>(null)
  const { ref: parallaxRef, offset } = useParallax(0.3 + index * 0.1)

  return (
    <motion.div
      ref={parallaxRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: feature.delay,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      viewport={{ once: true, margin: '-100px' }}
      className="group perspective"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        whileHover={{
          scale: prefersReducedMotion ? 1 : 1.08,
          y: -12,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          y: offset,
          transformStyle: 'preserve-3d' as any,
        }}
        className="h-full"
      >
        <div
          className="relative p-8 bg-white rounded-3xl border border-slate-200 hover:border-primary-300 shadow-soft hover:shadow-lg-soft transition-all h-full flex flex-col overflow-hidden"
          style={{
            transformStyle: 'preserve-3d' as any,
          }}
        >
          {/* Gradient background */}
          <motion.div
            className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
          />

          {/* Content */}
          <motion.div
            className="relative z-10"
            style={{
              transform: prefersReducedMotion ? 'none' : 'translateZ(20px)',
            }}
          >
            <motion.div
              className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-md`}
              whileHover={{
                scale: 1.15,
                rotate: 10,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>

            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {feature.title}
            </h3>

            <p className="text-slate-600 text-base leading-relaxed flex-1">
              {feature.description}
            </p>
          </motion.div>

          {/* Interactive border effect */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-3xl pointer-events-none group-hover:border-primary-400 transition-colors duration-300"
            style={{
              boxShadow: `inset 0 0 20px rgba(20, 184, 166, 0)`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
