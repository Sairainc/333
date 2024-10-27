'use client'

import React,{ useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = ["サービス", "会社情報", "チーム", "お客様の声", "お問い合わせ", "ブログ", "FAQ"]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-gray-900">
          株式会社Saira
        </a>
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <ChevronDown className={`h-6 w-6 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-2 shadow-md">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navigation
