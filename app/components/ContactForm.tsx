'use client'

import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { submitContact } from "../actions"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: ''
  })
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // 電話番号フォーマット関数
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setIsSuccess(false)
    
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
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      const result = await submitContact(formDataToSend)
      if (result.error) {
        setMessage(result.error)
        setIsSuccess(false)
      } else if (result.success) {
        setIsSuccess(true)
        setMessage("お申し込みありがとうございます。\n担当者より2営業日以内にご連絡させていただきます。")
        setFormData({ name: '', email: '', phone: '', company: '', service: '' })
      }
    } catch (error) {
      setMessage("エラーが発生しました。時間をおいて再度お試しください。")
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
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
              className="w-full" 
              onChange={handleChange} 
              value={formData.name} 
            />
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
              className="w-full" 
              onChange={handleChange} 
              value={formData.email} 
            />
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
              className="w-full" 
              onChange={handleChange} 
              value={formData.phone}
              maxLength={13}
            />
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
              className="w-full" 
              onChange={handleChange} 
              value={formData.company} 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="service" className="block mb-2 font-semibold text-gray-900">
              興味のあるサービス <span className="text-red-500">*</span>
            </label>
            <select 
              id="service" 
              name="service" 
              className="w-full p-2 border rounded bg-white" 
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
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                送信中...
              </span>
            ) : "申し込む"}
          </Button>
          {message && (
            <div className={`mt-4 p-4 rounded ${isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message.split('\n').map((line, index) => (
                <p key={index} className="text-center">{line}</p>
              ))}
            </div>
          )}
          <p className="mt-4 text-sm text-gray-600 text-center">
            <span className="text-red-500">*</span> は必須項目です
          </p>
        </form>
      </div>
    </section>
  )
}

export default ContactForm