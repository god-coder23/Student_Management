import { useEffect, useRef, useState } from 'react'

export default function AnimatedBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollYRef = useRef(0)
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth) * 2 - 1
      mouseYRef.current = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    let time = 0
    const colors = [
      { r: 20, g: 184, b: 166 },   // primary-500
      { r: 13, g: 148, b: 136 },   // primary-600
      { r: 94, g: 234, b: 212 },   // primary-300
    ]

    const animate = () => {
      time += 0.0005

      // Clear canvas with subtle trail effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = Math.max(0, data[i + 3] - 1.5)
      }
      ctx.putImageData(imageData, 0, 0)

      const centerX = canvas.width / 2 + mouseXRef.current * 30
      const centerY = canvas.height / 2 - scrollYRef.current * 0.4 + mouseYRef.current * 30
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.12

      // Calculate scroll progress for color shifting
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollYRef.current / docHeight : 0

      // Draw animated blobs with 3D depth perception
      for (let i = 0; i < 3; i++) {
        // Rotation based on scroll and mouse
        const angle = (time + i * (Math.PI * 2 / 3)) * 0.2 + scrollProgress * Math.PI
        const mouseInfluence = (mouseXRef.current * 0.3)
        const offsetX = (Math.cos(angle + mouseInfluence) * baseRadius * 0.4) + (mouseXRef.current * 20)
        const offsetY = (Math.sin(angle) * baseRadius * 0.4) + (mouseYRef.current * 20)

        ctx.beginPath()

        // Create smooth blob shape with multi-layer noise
        for (let j = 0; j < Math.PI * 2; j += 0.04) {
          const noise1 = Math.sin(j * 3 + time * 1.5) * 0.12
          const noise2 = Math.cos(j * 5 + time * 0.8) * 0.08
          // Add scroll-based depth distortion
          const scrollDistortion = Math.sin(j + scrollProgress * Math.PI * 2) * 0.08
          const r = baseRadius * (0.85 + noise1 + noise2 + scrollDistortion)
          const x = centerX + offsetX + Math.cos(j) * r
          const y = centerY + offsetY + Math.sin(j) * r

          if (j === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        // Create enhanced gradient with scroll-based color shift
        const gradient = ctx.createRadialGradient(
          centerX + offsetX,
          centerY + offsetY,
          0,
          centerX + offsetX,
          centerY + offsetY,
          baseRadius * 1.3
        )

        const color = colors[i]
        // Adjust opacity based on scroll progress for depth effect
        const baseOpacity = 0.35 - scrollProgress * 0.15
        const midOpacity = 0.15 - scrollProgress * 0.08

        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.max(0.1, baseOpacity)})`)
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.max(0.05, midOpacity)})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fill()

        // Add subtle lighting effect
        const lightGradient = ctx.createLinearGradient(
          centerX - baseRadius,
          centerY - baseRadius,
          centerX + baseRadius,
          centerY + baseRadius
        )
        lightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.1 * (1 - scrollProgress)})`)
        lightGradient.addColorStop(1, `rgba(0, 0, 0, ${0.1 * scrollProgress})`)

        ctx.fillStyle = lightGradient
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}
