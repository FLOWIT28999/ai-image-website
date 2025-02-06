## **🎨 이미지 생성 화면 기능 명세서**

---

## **1. 프론트엔드 기능명세서**

### **1.1 UI 레이아웃 및 구조**
- **ShadcnUI 컴포넌트 활용**: `Input`, `Button`, `Select`, `Card` 사용
- **반응형 디자인 적용**: 모바일, 태블릿, 데스크탑 환경 최적화
- **직관적인 단일 페이지 구성**: 프롬프트 입력부터 결과 확인까지 한 화면에서 처리

---

### **1.2 주요 기능 및 UI 구성**

#### **🔹 1) 프롬프트 입력 영역**
✅ **텍스트 입력 필드와 생성 버튼**
✅ **랜덤 프롬프트 제안 기능**
✅ **프롬프트 자동 완성 기능**

- **구성 요소:**
  ```typescript
  // 프롬프트 제안 데이터
  const PROMPT_SUGGESTIONS = [
    '판타지 세계의',
    '미래 도시의',
    '신비로운',
    '아름다운',
    '귀여운'
  ]

  // 랜덤 프롬프트 데이터
  const RANDOM_PROMPTS = [
    '우주를 여행하는 고양이',
    '사이버펑크 도시의 일몰',
    '환상적인 수중 도시',
    '미래의 flying car',
    '마법의 숲속 오두막'
  ]
  ```

- **UX 개선 요소:**
  - Enter 키로 즉시 생성 가능
  - 입력 중 실시간 자동 완성 제안
  - 랜덤 프롬프트 생성 기능
  - 프롬프트 히스토리 연동

---

#### **🔹 2) 스타일 선택 드롭다운**
✅ **다양한 이미지 스타일 옵션 제공**
✅ **드롭다운 방식으로 UI 간소화**

- **스타일 옵션:**
  ```typescript
  const STYLE_OPTIONS = [
    { id: 'basic', name: '기본', description: '기본 스타일' },
    { id: 'oil', name: '유화', description: '유화 스타일' },
    { id: 'pixel', name: '픽셀아트', description: '픽셀아트 스타일' },
    { id: 'photo', name: '포토리얼', description: '사진과 같은 스타일' }
  ]
  ```

---

#### **🔹 3) 해상도 선택 영역**
✅ **이미지 크기 옵션 제공**
✅ **Select 컴포넌트 활용**

- **해상도 옵션:**
  ```typescript
  const RESOLUTIONS = [
    { size: '512x512', label: '기본', isDefault: true },
    { size: '1024x1024', label: '고화질' }
  ]
  ```

---

#### **🔹 4) 이미지 생성 프로세스**
✅ **로딩 상태 표시**
✅ **진행률 표시**
✅ **에러 처리 및 재시도**

- **상태 관리:**
  ```typescript
  interface GenerationState {
    isLoading: boolean;
    progress: number;
    error?: string;
    result?: {
      url: string;
      prompt: string;
      style: string;
      resolution: string;
      timestamp: number;
    }
  }
  ```

- **로딩 애니메이션:**
  - 중앙 배치된 스켈레톤 UI
  - 진행률 퍼센트 표시
  - 취소 가능한 생성 프로세스
  - 에러 발생 시 재시도 버튼

---

#### **🔹 5) 결과 이미지 관리**
✅ **저장 및 공유 기능**
✅ **히스토리 관리**
✅ **이미지 다운로드**

- **이미지 관리 기능:**
  ```typescript
  interface ImageActions {
    saveToGallery: () => Promise<void>;
    shareToFeed: (imageUrl: string, prompt: string) => void;
    downloadImage: (url: string, prompt: string) => Promise<boolean>;
    regenerateFromHistory: (historyItem: GeneratedImage) => void;
  }
  ```

- **히스토리 기능:**
  - 최근 생성 이미지 10개 저장
  - 이미지 재생성 기능
  - 호버 시 재생성 버튼 표시
  - 프롬프트 정보 표시

---

### **1.3 에러 처리 및 알림**

#### **🔹 토스트 알림 시스템:**
```typescript
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

// 토스트 표시 함수
const showToast = (message: string, type: Toast['type']) => {
  // 성공: 초록색
  // 에러: 빨간색
  // 정보: 파란색
}
```

- **알림 트리거 상황:**
  - 이미지 생성 성공/실패
  - 갤러리 저장 성공/실패
  - 피드 공유 성공/실패
  - 다운로드 성공/실패

---

## **2. 백엔드 API 명세**

### **2.1 이미지 생성 API**

#### **🔹 이미지 생성 요청 (`POST /api/images/generate`)**
```typescript
// 요청 본문
interface GenerateRequest {
  prompt: string;
  style?: string;
  resolution: string;
}

// 응답 본문
interface GenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: {
    code: string;
    message: string;
  }
}
```

---

### **2.2 이미지 관리 API**

#### **🔹 갤러리 저장 (`POST /api/images/save`)**
```typescript
interface SaveRequest {
  imageUrl: string;
  prompt: string;
  style: string;
  resolution: string;
  timestamp: number;
}

interface SaveResponse {
  success: boolean;
  error?: string;
}
```

#### **🔹 피드 공유 (`POST /api/feed/share`)**
```typescript
interface ShareRequest {
  imageUrl: string;
  prompt: string;
  style: string;
  timestamp: number;
}

interface ShareResponse {
  success: boolean;
  postId?: string;
  error?: string;
}
```

#### **🔹 히스토리 관리 (`GET /api/images/history`)**
```typescript
interface HistoryResponse {
  images: Array<{
    url: string;
    prompt: string;
    style: string;
    resolution: string;
    timestamp: number;
  }>;
}
```

---

## **🚀 구현 우선순위**

1️⃣ **구현 완료된 기능**
- ✅ 프롬프트 입력 및 이미지 생성
- ✅ 스타일 선택 드롭다운
- ✅ 해상도 선택
- ✅ 로딩 상태 및 진행률 표시
- ✅ 토스트 알림 시스템
- ✅ 이미지 다운로드
- ✅ 히스토리 관리
- ✅ 프롬프트 자동 완성

2️⃣ **추가 구현 예정**
- ⬜ 실제 AI 모델 연동
- ⬜ 갤러리 저장 API 연동
- ⬜ 피드 공유 API 연동
- ⬜ 이미지 편집 기능
- ⬜ 고급 스타일 옵션 