import React from 'react'
import { Card } from "./ui/card"

const BlogPreparingPage = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-6">準備中です。</h1>
            <p className="text-xl mb-8">公開までもうしばらくお待ち下さい。</p>
            
            <div className="text-8xl mb-4">
              🙇
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default BlogPreparingPage