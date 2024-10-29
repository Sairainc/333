import React from 'react';
import Image from 'next/image';

type Testimonial = {
  content: string;
  author: string;
}

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardContent className="p-6">
      <p className="mb-4 text-gray-600">{testimonial.content}</p>
      <p className="font-semibold text-gray-900">{testimonial.author}</p>
    </CardContent>
  </Card>
)

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      content: "「ノーコードWebアプリケーション開発を通じて、市場に導入するまでのスピードが格段に早くなりました。従来の開発方法と比べて、時間とコストを大幅に削減できました。」",
      author: "- A社 新規事業部"
    },
    {
      content: "「新卒採用の支援を受け、Z世代の人材の確保や社内教育で社内のモチベーションが大幅に上がりました。」",
      author: "- B社 人事部長"
    },
    {
      content: "「SNS運用コンサルによってゼロから始めたアカウントがフォロワー1000人突破、早期にマネタイズを達成しました。実際に足を運んでいただけるお客様も増えました。」",
      author: "- A店 マーケティング部長"
    }
  ]

  const portfolioItems = [
    {
      image: "/images/iPhone 15 Pro Max Front.png",
      title: "旅行計画アプリ",
      description: "生成AIを活用したチャットボットの開発"
    },
    {
      image: "/images/Macbook Front View Mockup.png",
      title: "自動車整備工場の予約システム",
      description: "ノーコードで構築した予約管理システム"
    },
    {
      image: "/images/Macbook Front View Mockup (1).png",
      title: "シフト表作成システム",
      description: "バイトのシフト表を自動で作成するシステム"
    }
  ];

  return (
    <section id="お客様の声" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          お客様の声と開発実績
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        <p className="text-center mt-8 mb-12 text-gray-600 max-w-2xl mx-auto">
          ノーコードウェブ開発、人材コンサルティング、SNS運用コンサルなど、
          多岐にわたるサービスで、様々な業界のお客様にご満足いただいています。
        </p>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">開発実績</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative w-full h-64">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-4"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials