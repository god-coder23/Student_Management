import { useEffect, useRef, useState } from 'react'

interface ScrollTransform {
  scrollY: number
  scrollProgress: number
  rotationX: number
  rotationY: number
  scale: number
  depth: number
}

export function useScrollTransform(elementRef?: React.RefObject<HTMLElement>) {
  const [transform, setTransform] = useState<ScrollTransform>({
    scrollY: 0,
    scrollProgress: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    depth: 0,
  })

  const rafRef = useRef<number>()
  const prevScrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const scrollDelta = scrollY - prevScrollRef.current
        prevScrollRef.current = scrollY

        // Calculate scroll progress (0 to 1)
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0

        // 3D rotations based on scroll (subtle, premium feel)
        const rotationX = Math.min(scrollProgress * 15, 15) // Max 15 degrees
        const rotationY = (scrollDelta * 0.5) % 360 // Gentle Y rotation from scroll velocity

        // Scale effect
        const scale = 1 + scrollProgress * 0.1

        // Depth effect
        const depth = scrollProgress * 100

        setTransform({
          scrollY,
          scrollProgress,
          rotationX,
          rotationY,
          scale,
          depth,
        })
      })
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return transform
}

export function useParallax(depth: number = 0.5) {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const elementTop = ref.current?.getBoundingClientRect().top || 0
      const elementOffset = window.innerHeight - elementTop
      
      // Parallax offset based on element position and depth
      const parallaxOffset = (elementOffset - window.innerHeight / 2) * depth * 0.1
      setOffset(parallaxOffset)
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [depth])

  return { ref, offset }
}
