"use client";

/**
 * AI 이미지 생성 컴포넌트
 * 프롬프트 입력 및 이미지 생성 기능 제공
 */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2, Share2 } from "lucide-react";
import { RANDOM_PROMPTS, mockGenerateImage, MOCK_USERS } from "@/lib/mock-data";
import Image from "next/image";

interface AIImageGeneratorProps {
  onAddToFeed?: (imageUrl: string, prompt: string) => void;
}

export default function AIImageGenerator({ onAddToFeed }: AIImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // 랜덤 프롬프트 선택
  const handleRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_PROMPTS.length);
    setPrompt(RANDOM_PROMPTS[randomIndex]);
  };

  // 이미지 생성
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const imageUrl = await mockGenerateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("이미지 생성 중 오류 발생:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 피드에 추가
  const handleAddToFeed = () => {
    if (generatedImage && onAddToFeed) {
      onAddToFeed(generatedImage, prompt);
      // 생성된 이미지와 프롬프트 초기화
      setGeneratedImage(null);
      setPrompt("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      {/* 프롬프트 입력 영역 */}
      <div className="flex gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="무엇을 그리고 싶나요?"
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        <Button variant="outline" onClick={handleRandomPrompt}>
          🎲 랜덤
        </Button>
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              생성하기
            </>
          )}
        </Button>
      </div>

      {/* 생성된 이미지 표시 영역 */}
      {isGenerating && (
        <div className="w-full aspect-square bg-muted animate-pulse rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">이미지 생성 중...</p>
        </div>
      )}

      {generatedImage && !isGenerating && (
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image
              src={generatedImage}
              alt="생성된 이미지"
              fill
              className="object-cover"
            />
          </div>
          <Button 
            onClick={handleAddToFeed} 
            className="w-full"
            variant="secondary"
          >
            <Share2 className="mr-2 h-4 w-4" />
            피드에 공유하기
          </Button>
        </div>
      )}
    </div>
  );
} 