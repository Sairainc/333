import React from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import CompanyInfo from './components/CompanyInfo'
import TeamSection from './components/TeamSection'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import BlogSection from './components/BlogSection'
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CompanyInfo />
      <TeamSection />
      <Testimonials />
      <ContactForm />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
