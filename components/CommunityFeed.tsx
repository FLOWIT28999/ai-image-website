/**
 * 커뮤니티 피드 컴포넌트
 * 인기 작품과 최신 업로드를 보여주는 그리드 레이아웃
 */
import { MOCK_POSTS } from "@/lib/mock-data";
import { Post } from "@/lib/types";
import FeedCard from "./FeedCard";

interface CommunityFeedProps {
  additionalPosts?: Post[];
}

export default function CommunityFeed({ additionalPosts = [] }: CommunityFeedProps) {
  // 모든 게시물 (목업 + 새로 추가된 게시물)
  const allPosts = [...additionalPosts, ...MOCK_POSTS];
  
  // 인기 작품과 최신 작품을 분리
  const popularPosts = [...allPosts].sort((a, b) => b.likes - a.likes);
  const recentPosts = [...allPosts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-8">
      {/* 인기 작품 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🔥 인기 AI 작품</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularPosts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 최신 업로드 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🆕 최신 업로드</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentPosts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
} 