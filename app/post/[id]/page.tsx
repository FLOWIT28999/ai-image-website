"use client";

/**
 * 피드 상세 페이지
 * 개별 AI 작품의 상세 정보와 댓글을 표시
 */
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Post } from "@/lib/types";
import { MOCK_POSTS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  // 게시물 데이터 로드
  useEffect(() => {
    const foundPost = MOCK_POSTS.find(p => p.id === params.id);
    if (foundPost) {
      setPost(foundPost);
      setIsLiked(foundPost.isLiked || false);
    }
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // 좋아요 토글
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setPost(prev => {
      if (!prev) return null;
      return {
        ...prev,
        likes: isLiked ? prev.likes - 1 : prev.likes + 1,
      };
    });
  };

  // 댓글 추가
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: `${post.id}-${Date.now()}`,
      content: newComment,
      user: {
        id: 'current-user',
        name: '현재 사용자',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current-user'
      },
      createdAt: new Date().toISOString(),
    };

    setPost(prev => {
      if (!prev) return null;
      return {
        ...prev,
        comments: [...(prev.comments || []), comment],
        commentsCount: prev.commentsCount + 1,
      };
    });
    setNewComment("");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold">게시물</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 이미지 */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* 상세 정보 */}
          <div className="space-y-6">
            {/* 작성자 정보 */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </p>
              </div>
            </div>

            {/* 제목 및 태그 */}
            <div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 좋아요 & 댓글 수 */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLikeToggle}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isLiked && "fill-primary text-primary"
                  )}
                />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-5 w-5" />
                <span>{post.commentsCount}</span>
              </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="space-y-4">
              <h3 className="font-medium">댓글</h3>
              
              {/* 댓글 목록 */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {post.comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                            locale: ko,
                          })}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 댓글 입력 */}
              <div className="flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1 resize-none"
                  rows={2}
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  작성
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 