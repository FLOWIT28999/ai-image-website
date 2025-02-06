## **📝 메인 페이지 기능 명세서**

---
  
## **1. 프론트엔드 기능명세서**  

### **1.1 UI 레이아웃 및 구조**  
- 메인 페이지에서 **AI 이미지 생성**과 **커뮤니티 피드**를 제공  
- **반응형 디자인 적용** (모바일, 태블릿, 데스크탑)  
- **ShadCN 컴포넌트 활용**: `Input`, `Button`, `Card`, `Skeleton`, `DropdownMenu`, `Avatar` 사용  

---

### **1.2 주요 기능 및 UI 구성**  

#### **🔹 1) 상단 네비게이션 바 (`Header.tsx`)**  
✅ **검색, 알림, 프로필 버튼 제공**  
✅ **ShadCN의 `Avatar` 사용**  

- **구성 요소:**  
  - 🔍 검색 (`<Input />`)  
  - 📩 알림 버튼 (`<Button />`)  
  - 👤 프로필 (`<Avatar />`)  

---

#### **🔹 2) AI 이미지 생성 영역 (`AIImageGenerator.tsx`)**  
✅ **프롬프트 입력 및 생성 버튼**  
✅ **랜덤 프롬프트 기능**  

- **입력 필드:**  
  - 텍스트 입력 (`<Input />`, ShadCN)  
  - 랜덤 프롬프트 버튼 (`<Button variant="outline" />`, ShadCN)  
  - 생성 버튼 (`<Button variant="default" />`, ShadCN)  

- **사용자 액션:**  
  - 입력 필드에 프롬프트 입력 후 `Enter` 또는 "🎨 생성하기" 버튼 클릭  
  - 랜덤 프롬프트 버튼 클릭 시 자동 입력  

- **UX 개선 요소:**  
  - 버튼 클릭 시 `LoadingAnimation.tsx` 실행  

---

#### **🔹 3) 로딩 애니메이션 (`LoadingAnimation.tsx`)**  
✅ **이미지 생성 중간에 배치**  
✅ **ShadCN `Skeleton` 컴포넌트 사용**  

- **로딩 상태:**  
  - `<Skeleton className="w-full h-64" />`  
  - "이미지 생성 중..." 텍스트 표시  

---

#### **🔹 4) 커뮤니티 피드 (`CommunityFeed.tsx`)**  
✅ **반응형 카드 UI (ShadCN `Card` 사용)**  
✅ **최신 업로드 및 인기 작품 표시**  

- **레이아웃 구성:**  
  - `🔥 인기 AI 작품` 섹션  
  - `🆕 최신 업로드` 섹션  
  - `FeedCard.tsx`를 반복 렌더링  

- **반응형 그리드:**  
  - 모바일 → 2개씩  
  - 태블릿 → 3개씩  
  - 데스크탑 → 4개 이상  

---

#### **🔹 5) 개별 커뮤니티 카드 (`FeedCard.tsx`)**  
✅ **ShadCN `Card` 컴포넌트 활용**  
✅ **좋아요(❤️), 댓글(💬) 기능 포함**  

- **표시 항목:**  
  - 생성된 이미지 (`<Image />`)  
  - 게시한 사용자 (`<Avatar />`)  
  - 제목 및 태그  
  - 좋아요 (`❤️`) 및 댓글 (`💬`) 개수  

---

### **1.3 API 연동**  
✅ **AI 이미지 생성 API 호출**  
✅ **커뮤니티 피드 데이터 불러오기**  

- **AI 생성 요청 (`generateImage`)**
  - API: `POST /api/generate`
  - 요청: `{ prompt: string }`
  - 응답: `{ imageUrl: string }`

- **커뮤니티 피드 데이터 (`getFeed`)**
  - API: `GET /api/feed`
  - 응답: `{ posts: [{ id, imageUrl, user, likes, comments }] }`

---

### **1.4 테스트 체크리스트**  
✅ **프롬프트 입력 후 엔터 키 입력 시 이미지 생성되는가?**  
✅ **랜덤 프롬프트 버튼 클릭 시 텍스트가 자동 입력되는가?**  
✅ **이미지 생성 후 피드에 자동 추가되는가?**  
✅ **커뮤니티 피드에서 반응형 UI가 정상 동작하는가?**  

---

## **2. 백엔드 기능명세서**  

### **2.1 API 엔드포인트 정의**  

#### **🔹 1) AI 이미지 생성 API (`app/api/generate/route.ts`)**  
✅ **프롬프트를 입력받아 AI 이미지 생성**  
✅ **이미지를 저장 후 URL 반환**  

- **요청 (`POST /api/generate`)**  
  - `body`: `{ prompt: string }`
- **응답 (`200 OK`)**  
  - `{ imageUrl: string }`

---

#### **🔹 2) 커뮤니티 피드 API (`app/api/feed/route.ts`)**  
✅ **최신 업로드 및 인기 작품 조회**  

- **요청 (`GET /api/feed`)**  
- **응답 (`200 OK`)**  
```json
{
  "posts": [
    {
      "id": "123",
      "imageUrl": "https://example.com/image.jpg",
      "user": { "id": "456", "name": "John Doe", "avatar": "https://example.com/avatar.jpg" },
      "likes": 50,
      "comments": 10
    }
  ]
}
```

---

### **2.2 데이터베이스 설계 (`db/schema.ts`)**  

#### **🔹 1) 이미지 생성 테이블 (`generated_images`)**  
| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | `string (UUID)` | 고유 식별자 |
| `user_id` | `string` | 생성한 사용자 ID |
| `prompt` | `string` | 입력된 프롬프트 |
| `image_url` | `string` | 저장된 이미지 URL |
| `created_at` | `timestamp` | 생성일 |

---

#### **🔹 2) 커뮤니티 피드 테이블 (`posts`)**  
| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | `string (UUID)` | 게시글 ID |
| `user_id` | `string` | 작성자 ID |
| `image_url` | `string` | 게시된 이미지 |
| `title` | `string` | 제목 |
| `tags` | `string[]` | 태그 리스트 |
| `likes` | `number` | 좋아요 수 |
| `comments_count` | `number` | 댓글 개수 |

---

### **2.3 테스트 체크리스트**  
✅ **AI 생성 API가 정상적으로 이미지를 반환하는가?**  
✅ **커뮤니티 피드에서 데이터가 올바르게 불러와지는가?**  
✅ **좋아요 및 댓글 개수가 정상적으로 반영되는가?**  

---

## **🚀 결론 및 다음 단계**
1️⃣ **메인 페이지 구현 후 테스트 진행**  
2️⃣ **이미지 생성 결과 페이지 및 갤러리 기능 개발**  
3️⃣ **커뮤니티 공유 및 상호작용 기능 추가**  

이제 구현을 시작할 준비가 완료되었습니다! 🚀