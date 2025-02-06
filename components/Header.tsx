"use client";

/**
 * 메인 헤더 컴포넌트
 * 검색, 알림, 프로필 기능을 포함
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <div className="text-xl font-bold">AI Art Gallery</div>

        {/* 검색창 */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <Input
            type="search"
            placeholder="작품 검색하기..."
            className="w-full"
          />
        </div>

        {/* 알림 & 프로필 */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>사용자</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
} 