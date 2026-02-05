import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Dashboard3DProps {
  children: React.ReactNode
}

export default function Dashboard3D({ children }: Dashboard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.05, 0.98]
  )

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1, 0.8, 0.5]
  )

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 pt-24 pb-12 relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Animated background layers */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          scale: prefersReducedMotion ? 1 : backgroundScale,
          opacity: prefersReducedMotion ? 1 : backgroundOpacity,
        }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl" />
      </motion.div>

      {/* 3D perspective container */}
      <motion.div
        style={{
          transformStyle: 'preserve-3d' as any,
        }}
        animate={prefersReducedMotion ? {} : {
          rotateX: [0, 2, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        {children}
      </motion.div>
    </div>
  )
}
