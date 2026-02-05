import { useEffect, useRef } from 'react'

export default function AnimatedBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    let time = 0
    const colors = [
      '#14b8a6', // primary-500
      '#0d9488', // primary-600
      '#5eead4', // primary-300
    ]

    const animate = () => {
      time += 0.001

      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.15

      // Draw animated blobs with gradient
      for (let i = 0; i < 3; i++) {
        const angle = (time + i * (Math.PI * 2 / 3)) * 0.3
        const offsetX = Math.cos(angle) * baseRadius * 0.3
        const offsetY = Math.sin(angle) * baseRadius * 0.3

        ctx.beginPath()
        
        // Create blob shape with noise
        for (let j = 0; j < Math.PI * 2; j += 0.05) {
          const noise = Math.sin(j * 3 + time * 2) * 0.15
          const r = baseRadius * (0.8 + noise)
          const x = centerX + offsetX + Math.cos(j) * r
          const y = centerY + offsetY + Math.sin(j) * r
          
          if (j === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        // Create gradient
        const gradient = ctx.createRadialGradient(
          centerX + offsetX,
          centerY + offsetY,
          0,
          centerX + offsetX,
          centerY + offsetY,
          baseRadius * 1.2
        )
        
        gradient.addColorStop(0, colors[i] + '40')
        gradient.addColorStop(1, colors[i] + '10')
        
        ctx.fillStyle = gradient
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  )
}
