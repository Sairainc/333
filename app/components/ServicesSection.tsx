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
      title: "ノーコードウェブ開発",
      description: "最新のノーコード技術を活用し、迅速かつ低コストでウェブアプリケーションやウェブサイトを開発します。",
      items: [
        "ウェブアプリケーション開発",
        "ウェブサイト構築・運営",
        "従来の開発と比較して約1/10のコストで実現",
        "開発期間を大幅に短縮（1年以上かかるプロジェクトを2〜3ヶ月で完成）",
        "ビジネスプロセスの自動化",
        "カスタムダッシュボードの作成",
        "AIチャットボットの開発"
      ]
    },
    {
      title: "人材コンサルティング",
      description: "企業の成長を支える最適な人材戦略を提案し、実行をサポートします。",
      items: [
        "人材採用戦略立案",
        "組織構造最適化",
        "人材育成プログラム",
        "パフォーマンス評価システム構築"
      ]
    },
    {
      title: "SNS運用コンサル",
      description: "効果的なSNS戦略の立案から実施まで、包括的なサポートを提供します。",
      items: [
        "SNS戦略の策定",
        "コンテンツ企画・制作支援",
        "アカウント運用最適化",
        "広告運用サポート",
        "効果測定・分析"
      ]
    }
  ]

  return (
    <section id="サービス" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-left text-gray-900 pl-32">
          サービス内容
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} ref={(el) => { cardRefs.current[index] = el; }}>
              <ServiceCard {...service} isVisible={visibleCards[index]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection