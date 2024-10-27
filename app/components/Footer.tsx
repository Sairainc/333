import React from 'react'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">株式会社Saira</h3>
            <p className="text-gray-600">ノーコードウェブアプリ開発と人材コンサルティングで、ビジネスの革新を支援します。</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">お問い合わせ</h3>
            <p className="flex items-center"><Phone className="mr-3 h-5 w-5 text-gray-600" /> 03-1234-5678</p>
            <p className="flex items-center"><Mail className="mr-3 h-5 w-5 text-gray-600" /> info@saira.co.jp</p>
            <p className="flex items-center"><MapPin className="mr-3 h-5 w-5 text-gray-600" /> 東京都渋谷区...</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">リンク</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">利用規約</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">サイトマップ</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">フォローする</h3>
            <div className="flex space-x-4">
              <a href="#twitter" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#facebook" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#instagram" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#linkedin" className="text-gray-600 hover:text-blue-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500">&copy; 2024 株式会社Saira. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer