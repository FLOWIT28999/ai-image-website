/**
 * 사용자 정보 타입 정의
 */
export interface User {
  id: string;
  name: string;
  avatar: string;
}

/**
 * 댓글 타입 정의
 */
export interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}

/**
 * 커뮤니티 포스트 타입 정의
 */
export interface Post {
  id: string;
  imageUrl: string;
  user: User;
  title: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
  comments?: Comment[];
}

/**
 * AI 이미지 생성 요청 타입 정의
 */
export interface GenerateImageRequest {
  prompt: string;
  style?: string;
  resolution?: string;
}

/**
 * AI 이미지 생성 응답 타입 정의
 */
export interface GenerateImageResponse {
  imageUrl: string;
  prompt: string;
} 