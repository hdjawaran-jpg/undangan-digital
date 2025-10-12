import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Menu, X, User } from 'lucide-react'

const Header = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">UndanganKu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium ${location.pathname === '/' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}>
              Beranda
            </Link>
            <Link to="/templates" className="text-gray-700 hover:text-indigo-600 font-medium">Template</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 font-medium">Harga</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">Masuk</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-gray-700 hover:text-indigo-600">Beranda</Link>
              <Link to="/templates" className="text-gray-700 hover:text-indigo-600">Template</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-indigo-600">Harga</Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
                  <button 
                    onClick={logout}
                    className="text-left text-gray-700 hover:text-indigo-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-indigo-600">Masuk</Link>
                  <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-indigo-700">
                    Daftar Gratis
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header