'use client'

import { Button } from "../components/ui/button"
import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[8rem] md:text-[12rem] lg:text-[20rem] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative transform -skew-y-6"
        >
          Saira
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold -mt-4 md:-mt-6 lg:-mt-8 mb-8 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative transform -skew-y-6"
        >
          Webアプリケーション×生成AI
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl mb-8 max-w-2xl mx-auto text-gray-600"
        >
          テクノロジーと人材戦略で、企業の可能性を無限大に
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link href="/#お申し込み">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 px-6 py-3 text-lg">
              無料相談を申し込む
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection