"use client";

/**
 * 메인 페이지
 * AI 이미지 생성과 커뮤니티 피드를 포함
 */
import { useState } from "react";
import Header from "@/components/Header";
import AIImageGenerator from "@/components/AIImageGenerator";
import CommunityFeed from "@/components/CommunityFeed";
import { MOCK_USERS } from "@/lib/mock-data";
import { Post } from "@/lib/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  // 새 게시물 추가
  const handleAddToFeed = (imageUrl: string, prompt: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      imageUrl,
      title: prompt,
      user: MOCK_USERS[0], // 현재 사용자로 가정
      tags: ['#AI아트'],
      likes: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
      comments: [],
    };

    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 헤더 */}
      <Header />

      {/* AI 이미지 생성 섹션 */}
      <section className="py-8 border-b">
        <AIImageGenerator onAddToFeed={handleAddToFeed} />
      </section>

      {/* 커뮤니티 피드 섹션 */}
      <section className="py-8">
        <CommunityFeed additionalPosts={posts} />
      </section>
    </main>
  );
}
