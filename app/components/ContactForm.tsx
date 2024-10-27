'use client'

import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { submitContact } from "../actions"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })

    const result = await submitContact(formDataToSend)
    if (result.error) {
      setMessage(result.error)
    } else if (result.success) {
      setMessage(result.success)
      setFormData({ name: '', email: '', service: '', message: '' })
    }
  }

  return (
    <section id="お問い合わせ" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          お問い合わせ
        </h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-semibold text-gray-900">お名前</label>
            <Input type="text" id="name" name="name" required className="w-full" onChange={handleChange} value={formData.name} />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-900">メールアドレス</label>
            <Input type="email" id="email" name="email" required className="w-full" onChange={handleChange} value={formData.email} />
          </div>
          <div className="mb-6">
            <label htmlFor="service" className="block mb-2 font-semibold text-gray-900">興味のあるサービス</label>
            <select id="service" name="service" className="w-full p-2 border rounded bg-white" onChange={handleChange} value={formData.service} required>
              <option value="">選択してください</option>
              <option value="nocode-app">ノーコードウェブアプリ開発</option>
              <option value="hr-consulting">人材コンサルティング</option>
              <option value="sns-consulting">SNS運用コンサル</option>
              <option value="other">その他</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 font-semibold text-gray-900">メッセージ</label>
            <Textarea id="message" name="message" required className="w-full" onChange={handleChange} value={formData.message} />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300">送信</Button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </section>
  )
}

export default ContactForm