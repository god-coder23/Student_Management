import { Link } from 'react-router-dom'
import { Boxes } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <Boxes className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline text-slate-900">Inventory</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
          >
            Dashboard
          </Link>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}
