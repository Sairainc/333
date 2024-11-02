'use client'

import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { submitContact } from "../actions"

interface ValidationErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 電話番号のフォーマット関数
  const formatPhoneNumber = (value: string) => {
    // 数字以外を削除
    const numbers = value.replace(/[^\d]/g, '')
    
    // 11桁以上は入力させない
    if (numbers.length > 11) return formData.phone
    
    // 番号の長さに応じてフォーマット
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // 電話番号の場合は特別な処理
    if (name === 'phone') {
      setFormData(prevState => ({
        ...prevState,
        [name]: formatPhoneNumber(value)
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    
    // エラーをクリア
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setMessage("")

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })

    const result = await submitContact(formDataToSend)
    if (result.error) {
      setMessage(result.error)
      if (result.validationErrors) {
        setErrors(result.validationErrors)
      }
    } else if (result.success) {
      setMessage(result.success)
      setFormData({ name: '', email: '', phone: '', company: '', service: '' })
    }
    setIsSubmitting(false)
  }

  return (
    <section id="お申し込み" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          無料相談はこちら
        </h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-semibold text-gray-900">
              お名前 <span className="text-red-500">*</span>
            </label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="山田 太郎"
              required 
              className={`w-full ${errors.name ? 'border-2 border-red-500' : ''}`}
              onChange={handleChange} 
              value={formData.name} 
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-900">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="example@example.com"
              required 
              className={`w-full ${errors.email ? 'border-2 border-red-500' : ''}`}
              onChange={handleChange} 
              value={formData.email} 
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 font-semibold text-gray-900">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <Input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="090-1234-5678"
              required 
              pattern="^(0[0-9]{1,4}-[0-9]{1,4}-[0-9]{3,4}|0[0-9]{9,10})$"
              className={`w-full ${errors.phone ? 'border-2 border-red-500' : ''}`}
              onChange={handleChange} 
              value={formData.phone} 
            />
            {errors.phone ? (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
               
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="company" className="block mb-2 font-semibold text-gray-900">
              会社名 <span className="text-red-500">*</span>
            </label>
            <Input 
              type="text" 
              id="company" 
              name="company" 
              placeholder="株式会社〇〇"
              required 
              className={`w-full ${errors.company ? 'border-2 border-red-500' : ''}`}
              onChange={handleChange} 
              value={formData.company} 
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-500">{errors.company}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="service" className="block mb-2 font-semibold text-gray-900">
              興味のあるサービス <span className="text-red-500">*</span>
            </label>
            <select 
              id="service" 
              name="service" 
              className={`w-full p-2 border rounded bg-white ${errors.service ? 'border-2 border-red-500' : ''}`}
              onChange={handleChange} 
              value={formData.service} 
              required
            >
              <option value="">選択してください</option>
              <option value="nocode-app">ノーコードウェブアプリ開発</option>
              <option value="hr-consulting">人材コンサルティング</option>
              <option value="sns-consulting">SNS運用コンサル</option>
              <option value="other">その他</option>
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-500">{errors.service}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? '送信中...' : '申し込む'}
          </Button>
          
          {message && (
            <p className={`mt-4 text-center ${
              message.includes('ありがとう') ? 'text-green-600' : 'text-red-500'
            }`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default ContactForm