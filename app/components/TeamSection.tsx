"use client";

import React, { useEffect, useRef, useState } from 'react'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TeamMemberCard = ({ member, isVisible }: { member: TeamMember, isVisible: boolean }) => (
  <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
          <Avatar className="w-full h-full">
            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl font-bold text-center text-gray-900">{member.name}</CardTitle>
        <CardDescription className="text-center text-gray-600">{member.role}</CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-gray-600">{member.description}</p>
      </CardContent>
    </Card>
  </div>
)

const TeamSection = () => {
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

  const teamMembers: TeamMember[] = [
    { 
      name: "佐藤 遼河", 
      role: "代表取締役", 
      description: "ノーコード開発のパイオニア。15年以上のIT業界経験を持ち、ビジョナリーリーダーとして会社を牽引。",
      image: "/images/my_profile.png"
    },
    { 
      name: "咲山 蒼", 
      role: "営業リーダー", 
      description: "人材コンサルティングの専門家。革新的な人材戦略で企業の成長を支援。",
      image: "/images/sato-hanako.jpg"
    },
    { 
      name: "須郷 梓", 
      role: "人材コンサルタント", 
      description: "複数のノーコードプラットフォームに精通。AI連携機能の実装も得意。",
      image: "/images/suzuki-ichiro.jpg"
    }
  ]

  return (
    <section id="チーム" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-left text-gray-900 pl-32">
          チームメンバー
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} ref={(el) => { cardRefs.current[index] = el; }}>
              <TeamMemberCard member={member} isVisible={visibleCards[index]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection