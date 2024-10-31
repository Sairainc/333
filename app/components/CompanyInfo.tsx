"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

const InfoCard = ({ title, content, isVisible }: { title: string, content: React.ReactNode, isVisible: boolean }) => (
  <div className={`h-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className={`bg-gradient-to-r ${title === '会社概要' ? 'from-blue-100 to-green-100' : 'from-green-100 to-yellow-100'}`}>
        <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        {content}
      </CardContent>
    </Card>
  </div>
)

const CompanyInfo = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false]);
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

  const companyDetails = [
    { label: "社名", value: "株式会社Saira" },
    { label: "設立", value: "2024年10月24日" },
    { label: "所在地", value: "神奈川県相模原市..." },
    { label: "事業内容", value: "ノーコードウェブアプリ・ウェブサイト開発、人材コンサルティング、SNS運用コンサル" },
  ]

  const companyOverview = (
    <table className="w-full">
      <tbody>
        {companyDetails.map((detail, index) => (
          <tr key={index}>
            <td className="font-semibold pr-4 py-2 text-gray-600">{detail.label}</td>
            <td className="text-gray-900">{detail.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  const missionVision = (
    <>
      <p className="mb-8 text-gray-600 text-lg leading-relaxed">
        <span className="font-semibold text-gray-900 text-xl block mb-2">ミッション：</span>
        ノーコード開発と人材戦略を融合し、企業のデジタル変革と持続的成長を支援する。
      </p>
      <p className="text-gray-600 text-lg leading-relaxed">
        <span className="font-semibold text-gray-900 text-xl block mb-2">ビジョン：</span>
        テクノロジーの民主化を通じて、誰もが自由にアイデアを形にできる世界を創造する。
      </p>
    </>
  )

  return (
    <section id="会社情報" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          会社情報
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: '会社概要', content: companyOverview },
            { title: 'ミッション & ビジョン', content: missionVision }
          ].map((card, index) => (
            <div key={index} ref={(el) => { cardRefs.current[index] = el; }}>
              <InfoCard {...card} isVisible={visibleCards[index]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyInfo