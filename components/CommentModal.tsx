"use client";

/**
 * 댓글 모달 컴포넌트
 * 게시물의 댓글 목록을 보여주고 새 댓글을 작성할 수 있는 모달
 */
import { useState } from "react";
import { Comment, Post } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface CommentModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (content: string) => void;
}

export default function CommentModal({
  post,
  isOpen,
  onClose,
  onAddComment,
}: CommentModalProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>댓글</DialogTitle>
        </DialogHeader>

        {/* 댓글 목록 */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {post.comments?.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.user.name}</span>
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

        {/* 댓글 입력 영역 */}
        <div className="flex gap-2 pt-4 border-t">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 resize-none"
            rows={2}
          />
          <Button onClick={handleSubmit} disabled={!newComment.trim()}>
            작성
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 