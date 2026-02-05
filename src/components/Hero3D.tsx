import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useScrollTransform, useParallax } from '../hooks/useScrollTransform'

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const transform = useScrollTransform()
  const { ref: parallaxRef, offset } = useParallax(0.8)
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [])

  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])
  const scale = useTransform(scrollY, [0, 500], [1, 0.95])

  const rotX = prefersReducedMotion ? 0 : transform.rotationX * 0.5
  const rotY = prefersReducedMotion ? 0 : (transform.scrollProgress * 10)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden perspective bg-slate-950"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Perspective container */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`,
          transformStyle: 'preserve-3d' as any,
          transition: 'transform 0.1s linear',
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary-600/10 via-transparent to-transparent" />
      </div>

      {/* Parallax layers */}
      <motion.div
        ref={parallaxRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96"
        style={{
          y: prefersReducedMotion ? 0 : y,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent rounded-full blur-3xl scale-150" />
      </motion.div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{
            opacity: opacity,
            scale: scale,
          }}
        >
          {/* Animated badge with 3D depth */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, z: -50 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              transform: prefersReducedMotion
                ? 'none'
                : `translateZ(${Math.max(0, 50 - transform.scrollProgress * 100)}px) rotateX(${rotX * 0.3}deg)`,
            }}
          >
            <motion.div
              className="px-4 py-2 bg-primary-600/20 rounded-full border border-primary-500/40 backdrop-blur-sm"
              whileHover={{ scale: 1.08, translateZ: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <p className="text-sm font-medium text-primary-300">✨ Modern inventory management</p>
            </motion.div>
          </motion.div>

          {/* Main heading with 3D text effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-50 tracking-tight leading-tight">
              Never Lose Track of Your
              <motion.span
                className="block bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 bg-clip-text text-transparent"
                style={{
                  backgroundPosition: prefersReducedMotion
                    ? '0% 0%'
                    : `${transform.scrollProgress * 100}% 0%`,
                  backgroundSize: '200% 100%',
                }}
              >
                Items Again
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheading with parallax */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
            style={{
              y: prefersReducedMotion ? 0 : offset * 0.5,
            }}
          >
            Organize your personal, shared, and borrowed items with a premium, intuitive interface. Built for hostel life.
          </motion.p>

          {/* CTA Buttons with depth */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{
                scale: prefersReducedMotion ? 1 : 1.05,
                translateZ: prefersReducedMotion ? 0 : 20,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-slate-950 rounded-xl font-semibold hover:bg-primary-500 transition-colors shadow-soft hover:shadow-lg-soft"
              >
                Start Managing Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{
                scale: prefersReducedMotion ? 1 : 1.05,
                translateZ: prefersReducedMotion ? 0 : 15,
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-slate-700 text-slate-200 rounded-xl font-semibold hover:border-primary-500 hover:bg-primary-500/10 transition-colors"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating accent elements for depth */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-primary-500/15 rounded-full blur-3xl pointer-events-none"
        animate={prefersReducedMotion ? {} : {
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translateZ(${Math.max(0, 100 - transform.scrollProgress * 200)}px)`,
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-56 h-56 bg-primary-400/12 rounded-full blur-3xl pointer-events-none"
        animate={prefersReducedMotion ? {} : {
          y: [0, -40, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `translateZ(${Math.max(0, 50 - transform.scrollProgress * 150)}px)`,
        }}
      />
    </section>
  )
}
