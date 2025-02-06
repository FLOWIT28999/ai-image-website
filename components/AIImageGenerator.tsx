"use client";

/**
 * AI 이미지 생성 화면의 메인 컴포넌트
 * 프롬프트 입력, 스타일 선택, 해상도 선택, 이미지 생성 및 관리 기능을 제공
 */

import { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Card } from './ui/card'
import { Loader2, History, RefreshCw } from 'lucide-react'
import { useToast } from './ui/toast'

// 스타일 옵션 목업 데이터
const STYLE_OPTIONS = [
  { id: 'basic', name: '기본', description: '기본 스타일' },
  { id: 'oil', name: '유화', description: '유화 스타일' },
  { id: 'pixel', name: '픽셀아트', description: '픽셀아트 스타일' },
  { id: 'photo', name: '포토리얼', description: '사진과 같은 스타일' }
]

// 해상도 옵션 목업 데이터
const RESOLUTIONS = [
  { size: '512x512', label: '기본', isDefault: true },
  { size: '1024x1024', label: '고화질' }
]

// 랜덤 프롬프트 목업 데이터
const RANDOM_PROMPTS = [
  '우주를 여행하는 고양이',
  '사이버펑크 도시의 일몰',
  '환상적인 수중 도시',
  '미래의 flying car',
  '마법의 숲속 오두막'
]

// 프롬프트 제안 데이터
const PROMPT_SUGGESTIONS = [
  '판타지 세계의',
  '미래 도시의',
  '신비로운',
  '아름다운',
  '귀여운'
]

// 테스트용 이미지 URL 배열 추가
const TEST_IMAGES = [
  'https://picsum.photos/seed/1/512/512',
  'https://picsum.photos/seed/2/512/512',
  'https://picsum.photos/seed/3/512/512',
  'https://picsum.photos/seed/4/512/512',
  'https://picsum.photos/seed/5/512/512'
]

interface GeneratedImage {
  url: string;
  prompt: string;
  style: string;
  resolution: string;
  timestamp: number;
}

// 이미지 다운로드 함수 추가
const downloadImage = async (url: string, prompt: string) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${prompt.slice(0, 30)}_${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
    
    return true
  } catch (error) {
    console.error('Download failed:', error)
    return false
  }
}

interface AIImageGeneratorProps {
  onAddToFeed?: (imageUrl: string, prompt: string) => void;
}

export default function AIImageGenerator({ onAddToFeed }: AIImageGeneratorProps) {
  // 상태 관리
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('basic')
  const [resolution, setResolution] = useState('512x512')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [history, setHistory] = useState<GeneratedImage[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const toast = useToast()

  // 프롬프트 입력 시 제안어 표시
  useEffect(() => {
    if (prompt.length > 0) {
      const filtered = PROMPT_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().includes(prompt.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [prompt])

  // 랜덤 프롬프트 생성
  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_PROMPTS.length)
    setPrompt(RANDOM_PROMPTS[randomIndex])
  }

  // 이미지 생성 처리 (목업)
  const handleGenerate = async () => {
    if (!prompt) {
      toast.show('프롬프트를 입력해주세요.', 'error')
      return
    }

    try {
      setError(null)
      setIsLoading(true)
      setProgress(0)
      setGeneratedImage(null)

      // 목업: 진행률 애니메이션
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 500)

      // 목업: 3초 후 이미지 생성 완료
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // 랜덤한 테스트 이미지 선택
      const randomIndex = Math.floor(Math.random() * TEST_IMAGES.length)
      const imageUrl = TEST_IMAGES[randomIndex]
      
      // 이미지 프리로딩
      const img = new Image()
      img.src = imageUrl
      
      img.onload = () => {
        setGeneratedImage(imageUrl)
        toast.show('이미지가 성공적으로 생성되었습니다.', 'success')
        
        // 히스토리에 추가
        const newImage: GeneratedImage = {
          url: imageUrl,
          prompt,
          style: selectedStyle,
          resolution,
          timestamp: Date.now()
        }
        setHistory(prev => [newImage, ...prev].slice(0, 10))
      }

      img.onerror = () => {
        throw new Error('이미지 로딩 실패')
      }

    } catch (err) {
      setError('이미지 생성에 실패했습니다. 다시 시도해주세요.')
      toast.show('이미지 생성에 실패했습니다.', 'error')
    } finally {
      setIsLoading(false)
      setProgress(100)
    }
  }

  // 이미지 관리 기능 (목업)
  const handleSaveToGallery = async () => {
    if (!generatedImage) return

    try {
      // 여기에 실제 갤러리 저장 API 호출 로직이 들어갈 예정
      // 목업 데이터로 성공 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.show('갤러리에 저장되었습니다.', 'success')
    } catch (error) {
      toast.show('갤러리 저장에 실패했습니다.', 'error')
    }
  }

  const handleShareToFeed = async () => {
    if (!generatedImage) return

    try {
      // 피드에 추가
      if (onAddToFeed) {
        onAddToFeed(generatedImage, prompt)
      }
      
      // 목업 데이터로 성공 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.show('커뮤니티 피드에 공유되었습니다.', 'success')
    } catch (error) {
      toast.show('피드 공유에 실패했습니다.', 'error')
    }
  }

  const handleDownload = async () => {
    if (!generatedImage || !prompt) return

    try {
      const success = await downloadImage(generatedImage, prompt)
      if (success) {
        toast.show('이미지가 다운로드되었습니다.', 'success')
      } else {
        throw new Error('다운로드 실패')
      }
    } catch (error) {
      toast.show('다운로드에 실패했습니다.', 'error')
    }
  }

  // 히스토리에서 이미지 재생성
  const handleRegenerateFromHistory = (historyItem: GeneratedImage) => {
    setPrompt(historyItem.prompt)
    setSelectedStyle(historyItem.style)
    setResolution(historyItem.resolution)
    handleGenerate()
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* 프롬프트 입력 영역 */}
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="무엇을 그리고 싶나요?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            className="text-lg"
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setPrompt(prompt + suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateRandomPrompt}>
            🎲 랜덤 프롬프트
          </Button>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                생성 중... {progress}%
              </>
            ) : (
              '🎨 생성하기'
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
            title="생성 히스토리"
          >
            <History className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 스타일 및 해상도 선택 */}
      <div className="flex gap-4">
        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="스타일 선택" />
          </SelectTrigger>
          <SelectContent>
            {STYLE_OPTIONS.map((style) => (
              <SelectItem key={style.id} value={style.id}>
                {style.name} - {style.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={resolution} onValueChange={setResolution}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="해상도 선택" />
          </SelectTrigger>
          <SelectContent>
            {RESOLUTIONS.map((res) => (
              <SelectItem key={res.size} value={res.size}>
                {res.label} ({res.size})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="flex items-center justify-between text-red-500 text-sm p-2 bg-red-50 rounded">
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerate}
            className="text-red-500 hover:text-red-600"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            재시도
          </Button>
        </div>
      )}

      {/* 로딩 스켈레톤 수정 */}
      {isLoading && (
        <Card className="p-4">
          <div className="relative w-full aspect-square bg-gray-200 animate-pulse rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500 flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <span>이미지 생성 중... {progress}%</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* 생성된 이미지 결과 */}
      {generatedImage && !isLoading && (
        <Card className="p-4 space-y-4">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <img
              src={generatedImage}
              alt={prompt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSaveToGallery} 
              className="flex-1"
              disabled={!generatedImage}
            >
              💾 갤러리에 저장
            </Button>
            <Button 
              onClick={handleShareToFeed} 
              className="flex-1"
              disabled={!generatedImage}
            >
              📤 피드에 공유
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownload} 
              className="flex-1"
              disabled={!generatedImage}
            >
              ⬇️ 다운로드
            </Button>
          </div>
        </Card>
      )}

      {/* 히스토리 */}
      {showHistory && history.length > 0 && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">최근 생성 기록</h3>
          <div className="grid grid-cols-2 gap-4">
            {history.map((item, index) => (
              <div key={index} className="relative group">
                <img
                  src={item.url}
                  alt={item.prompt}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleRegenerateFromHistory(item)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    재생성
                  </Button>
                </div>
                <p className="mt-2 text-sm truncate">{item.prompt}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
} 