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
      content: "「株式会社Sairaのノーコードウェブアプリ開発サービスを利用して、わずか2ヶ月で社内の業務効率化アプリを構築できました。従来の開発方法と比べて、時間とコストを大幅に削減できました。」",
      author: "- A社 IT部門長"
    },
    {
      content: "「株式会社Sairaの人材コンサルティングサービスのおかげで、最適な組織構造を実現し、社員のモチベーションが大幅に向上しました。結果として、生産性が30%以上アップしています。」",
      author: "- B社 人事部長"
    },
    {
      content: "「株式会社SairaのSNS運用コンサルティングサービスを利用して、わずか3ヶ月でフォロワー数が2倍に増加し、エンゲージメント率も50%向上しました。戦略的なアプローチと的確なアドバイスに感謝しています。」",
      author: "- C社 マーケティング部長"
    }
  ]

  const clientLogos = [
    "/images/client-logo1.png",
    "/images/client-logo2.png",
    "/images/client-logo3.png",
    "/images/client-logo4.png",
    "/images/client-logo5.png",
    "/images/client-logo6.png",
    // 必要に応じてさらにロゴを追加
  ];

  return (
    <section id="お客様の声" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-left text-gray-900 pl-32">
          お客様の声と実績
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
        <div className="text-left">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 pl-32">実績</h3>
          <div className="overflow-hidden">
            <div className="flex animate-scroll">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <Image key={index} src={logo} alt={`導入企業のロゴ${index + 1}`} width={160} height={80} className="mx-8" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials