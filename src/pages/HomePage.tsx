import { motion } from 'framer-motion'
import AnimatedBlob from '../components/AnimatedBlob'
import Hero3D from '../components/Hero3D'
import FeaturesSection3D from '../components/FeaturesSection3D'
import CTA3D from '../components/CTA3D'

export default function HomePage() {

  return (
    <div className="relative overflow-hidden">
      <AnimatedBlob />

      {/* 3D Hero Section */}
      <Hero3D />

      {/* 3D Features Section */}
      <FeaturesSection3D />

      {/* 3D CTA Section */}
      <CTA3D />

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2024 Student Inventory. Built for hostel life.</p>
        </div>
      </footer>
    </div>
  )
}
