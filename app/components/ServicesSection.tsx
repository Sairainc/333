"use client";

import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

const ServiceCard = ({ title, description, items, isVisible }: { title: string, description: string, items: string[], isVisible: boolean }) => (
  <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
        <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="mb-4 text-gray-600">{description}</p>
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-600">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </div>
)

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // スムーズスクロール用の関数
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const services = [
    {
      id: "web-development",
      title: "Webアプリケーション開発",
      description: "ノーコードを活用し、迅速かつ低コストでWebアプリケーションやWebサイトを開発します。",
      items: [
        "Webアプリケーション開発",
        "Webサイト構築・運営",
        "多言語対応",
        "開発期間を大幅に短縮（1年以上かかるプロジェクトを2〜3ヶ月で完成）",
        "ビジネスプロセスの自動化",
        "カスタムダッシュボードの作成",
        "AIチャットボットの開発"
      ]
    },
    {
      id: "hr-consulting",
      title: "人材コンサル",
      description: "企業の成長を支える最適な人材戦略を提案し、実行をサポートします。",
      items: [
        "人材採用戦略立案",
        "組織構造最適化",
        "人材育成プログラム",
        "パフォーマンス評価システム構築",
        "新卒採用支援"
      ]
    },
    {
      id: "sns-consulting",
      title: "SNS運用コンサル",
      description: "効果的なSNS戦略の立案から実施まで、包括的なサポートを提供します。",
      items: [
        "SNS戦略の策定",
        "コンテンツ企画・制作支援",
        "アカウント運用最適化",
        "広告運用サポート",
        "効果測定・分析",
        "コンテンツ制作"
      ]
    }
  ]

  const platforms = [
    { name: "Bubble", logo: "/images/Logo_with_clearspace.png" },
    { name: "FlutterFlow", logo: "/images/Flutterflow_logo_primary_color.png" },
    { name: "Adalo", logo: "/images/adalo_logo_black.png" },
    { name: "Glide", logo: "/images/png-transparent-glide-logo-tech-companies.png" },
  ];

  const aiPlatforms = [
    { name: "ChatGPT", logo: "/images/openai-lockup.png" },
    { name: "Claude", logo: "/images/Claude_AI_logo.png" },
    { name: "Dify", logo: "/images/Dify_logo_dark.png" },
    { name: "V0", logo: "/images/V0 logo.png" },
  ];

  return (
    <section id="サービス" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          サービス内容
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              id={service.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              onClick={() => scrollToSection(service.id)}
              className="cursor-pointer"
            >
              <ServiceCard {...service} isVisible={visibleCards[index]} />
            </div>
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto mt-20">
          <div className="relative">
            <h3 className="text-2xl font-bold mb-12 text-center text-gray-900">
              テクノロジースタック
            </h3>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20"></div>

            <div className="relative grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-blue-600 text-center mb-8">
                  ノーコードプラットフォーム
                </h4>
                <div className="flex flex-wrap justify-center gap-6">
                  {platforms.map((platform) => (
                    <div 
                      key={platform.name} 
                      className="w-24 h-24 flex items-center justify-center p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100"
                    >
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-pink-600 text-center mb-8">
                  生成AI
                </h4>
                <div className="flex flex-wrap justify-center gap-6">
                  {aiPlatforms.map((platform) => (
                    <div 
                      key={platform.name} 
                      className="w-24 h-24 flex items-center justify-center p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-pink-100"
                    >
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg border-4 border-purple-300 flex items-center justify-center">
              <span className="text-2xl">×</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection