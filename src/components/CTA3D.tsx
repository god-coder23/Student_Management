import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

export default function CTA3D() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 0.95])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Background 3D elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-96"
          animate={prefersReducedMotion ? {} : {
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <motion.div
          className="absolute inset-0"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(94, 234, 212, 0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          viewport={{ once: true, margin: '-100px' }}
          style={{
            y: prefersReducedMotion ? 0 : y,
            opacity: opacity,
            scale: scale,
            transformStyle: 'preserve-3d' as any,
          }}
          className="bg-gradient-to-br from-primary-600 via-primary-650 to-primary-700 rounded-3xl p-12 sm:p-20 text-center text-white shadow-lg-soft relative overflow-hidden backdrop-blur-xl border border-primary-500/20"
        >
          {/* Animated background elements with 3D depth */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              transform: prefersReducedMotion ? 'none' : 'translateZ(50px)',
            }}
          />

          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"
            animate={prefersReducedMotion ? {} : {
              scale: [1.2, 0.8, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
            style={{
              transform: prefersReducedMotion ? 'none' : 'translateZ(30px)',
            }}
          />

          {/* Content */}
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-6 relative z-10"
            style={{
              transform: prefersReducedMotion ? 'none' : 'translateZ(40px)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to organize?
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl mb-10 text-primary-100 relative z-10 max-w-xl mx-auto leading-relaxed"
            style={{
              transform: prefersReducedMotion ? 'none' : 'translateZ(30px)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of students who manage their inventory with ease. Start organizing today.
          </motion.p>

          <motion.div
            className="relative z-10 inline-block"
            style={{
              transform: prefersReducedMotion ? 'none' : 'translateZ(50px)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{
                scale: prefersReducedMotion ? 1 : 1.08,
                translateZ: prefersReducedMotion ? 0 : 30,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg-soft hover:shadow-lg"
              >
                Get Started Free
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
