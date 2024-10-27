import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

type FAQItem = {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const faqItems: FAQItem[] = [
    {
      question: "ノーコード開発とは何ですか？",
      answer: "ノーコード開発とは、プログラミングの知識がなくても、視覚的なインターフェースを使ってアプリケーションを作成できる開発手法です。当社のサービスでは、Adalo、Bubble、FlutterFlowなどのプラットフォームを使用し、ドラッグ＆ドロップで簡単にアプリを作成できます。"
    },
    {
      question: "ノーコード開発は本当に従来の開発より速くて安いのですか？",
      answer: "はい、その通りです。ノーコード開発は従来の開発方法と比較して、約1/10のコストで実現可能です。また、開発期間も大幅に短縮され、従来1年以上かかるプロジェクトを2〜3ヶ月で完成させることができます。ただし、具体的な開発期間とコストは、プロジェクトの規模と複雑さによって異なります。"
    },
    {
      question: "人材コンサルティングサービスの流れを教えてください。",
      answer: "初回のヒアリングで企業の課題を把握し、現状分析を行います。その後、最適な人材戦略を提案し、実行のサポートを行います。定期的なフォローアップで、戦略の効果を測定し、必要に応じて調整を行います。"
    }
  ]

  return (
    <section id="FAQ" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          よくある質問
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-gray-900">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection
