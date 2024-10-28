import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

type BlogPost = {
  title: string;
  content: string;
}

const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="bg-gradient-to-r from-blue-100 to-green-100">
      <CardTitle className="text-xl font-bold text-gray-900">{post.title}</CardTitle>
    </CardHeader>
    <CardContent className="mt-4">
      <p className="text-gray-600">{post.content}</p>
      <Link 
        href="/blogpage" 
        className="text-blue-600 hover:text-blue-800 mt-4 inline-block transition-colors"
      >
        続きを読む
      </Link>
    </CardContent>
  </Card>
)

const BlogSection = () => {
  const blogPosts: BlogPost[] = [
    { title: "ノーコード開発で実現する超高速アプリ開発", content: "従来の開発方法と比較して、ノーコード開発がいかに迅速かつ低コストでアプリケーションを提供できるかを解説します。" },
    { title: "効果的な人材戦略の立て方", content: "急変する経済環境下で、企業が取るべき人材戦略について解説します。" },
    { title: "ノーコードで実現する業務改革事例", content: "ノーコードアプリケーションを活用して業務プロセスを改善し、大幅なコスト削減を実現した企業の最新事例をご紹介します。" }
  ]

  return (
    <section id="ブログ" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          ブログ/ニュース
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection