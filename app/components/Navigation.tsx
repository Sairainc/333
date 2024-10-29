'use client'

import React,{ useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "サービス", path: "/#サービス" },
    { name: "会社情報", path: "/#会社情報" },
    { name: "チーム", path: "/#チーム" },
    { name: "お客様の声", path: "/#お客様の声" },
    { name: "ブログ", path: "/#ブログ" },
    { name: "お申し込み", path: "/#お申し込み" },
    { name: "FAQ", path: "/#FAQ" }
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          <Image
            src="/images/Saira logo high-res.png"
            alt="株式会社Saira"
            width={150}
            height={40}
            priority
          />
        </Link>
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </Link>
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
            <Link
              key={item.name}
              href={item.path}
              className="block text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navigation