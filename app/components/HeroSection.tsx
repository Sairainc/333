'use client'

import { Button } from "../components/ui/button"
import React from "react"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[20rem] font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
        >
          Saira
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl mb-8 max-w-2xl mx-auto text-gray-600"
        >
          ビジネスの成長を加速するノーコードソリューションと人材戦略
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 px-6 py-3 text-lg">無料相談を申し込む</Button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection