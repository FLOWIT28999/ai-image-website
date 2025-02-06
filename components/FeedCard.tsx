"use client";

/**
 * 피드 카드 컴포넌트
 * 개별 AI 작품을 카드 형태로 표시
 */
import { useState } from "react";
import { Post } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import CommentModal from "./CommentModal";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FeedCardProps {
  post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(post);

  // 좋아요 토글
  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // 댓글 모달 열기
  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsCommentModalOpen(true);
  };

  // 새 댓글 추가
  const handleAddComment = (content: string) => {
    const newComment = {
      id: `${post.id}-${Date.now()}`,
      content,
      user: {
        id: 'current-user',
        name: '현재 사용자',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current-user'
      },
      createdAt: new Date().toISOString(),
    };

    setCurrentPost(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newComment],
    }));
    setCommentsCount(prev => prev + 1);
  };

  return (
    <>
      <Card 
        className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => router.push(`/post/${post.id}`)}
      >
        {/* 이미지 */}
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </CardContent>

        {/* 작성자 정보 */}
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.title}</p>
              <p className="text-sm text-muted-foreground">{post.user.name}</p>
            </div>
          </div>
        </CardHeader>

        {/* 좋아요 & 댓글 */}
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLikeToggle}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isLiked && "fill-primary text-primary"
                )}
              />
              <span className="text-sm">{likesCount}</span>
            </button>
            <button
              onClick={handleCommentClick}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{commentsCount}</span>
            </button>
          </div>
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground hover:text-primary cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* 댓글 모달 */}
      <CommentModal
        post={currentPost}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onAddComment={handleAddComment}
      />
    </>
  );
} 