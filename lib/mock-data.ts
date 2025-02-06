import { Post, User, Comment } from './types';

/**
 * 목업 사용자 데이터
 */
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: '김예술',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  },
  {
    id: '2',
    name: '이창작',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  },
  {
    id: '3',
    name: '박디자인',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  },
  {
    id: '4',
    name: '정아트',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  },
  {
    id: '5',
    name: '최그림',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
  },
];

/**
 * 목업 댓글 데이터 생성 함수
 */
const generateMockComments = (postId: string): Comment[] => {
  return [
    {
      id: `${postId}-1`,
      content: '정말 멋진 작품이네요! 👏',
      user: MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)],
      createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    },
    {
      id: `${postId}-2`,
      content: '어떤 프롬프트를 사용하셨나요?',
      user: MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)],
      createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    },
    {
      id: `${postId}-3`,
      content: '색감이 너무 예쁩니다 ✨',
      user: MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)],
      createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    },
  ];
};

/**
 * 목업 포스트 데이터
 */
export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/1/400',
    user: MOCK_USERS[0],
    title: '우주를 나는 고래',
    tags: ['#AI아트', '#판타지', '#고래'],
    likes: 120,
    commentsCount: 15,
    createdAt: '2024-02-06T10:00:00Z',
    isLiked: false,
    comments: generateMockComments('1'),
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/2/400',
    user: MOCK_USERS[1],
    title: '네온사이버펑크 도시',
    tags: ['#사이버펑크', '#도시', '#네온'],
    likes: 89,
    commentsCount: 8,
    createdAt: '2024-02-06T09:30:00Z',
    isLiked: false,
    comments: generateMockComments('2'),
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/3/400',
    user: MOCK_USERS[2],
    title: '환상적인 숲속 풍경',
    tags: ['#자연', '#판타지', '#풍경'],
    likes: 156,
    commentsCount: 21,
    createdAt: '2024-02-06T09:00:00Z',
    isLiked: false,
    comments: generateMockComments('3'),
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/seed/4/400',
    user: MOCK_USERS[3],
    title: '미래도시의 일상',
    tags: ['#미래', '#도시', '#일상'],
    likes: 234,
    commentsCount: 28,
    createdAt: '2024-02-06T08:30:00Z',
    isLiked: false,
    comments: generateMockComments('4'),
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/5/400',
    user: MOCK_USERS[4],
    title: '마법사의 연구실',
    tags: ['#마법', '#판타지', '#실험실'],
    likes: 178,
    commentsCount: 19,
    createdAt: '2024-02-06T08:00:00Z',
    isLiked: false,
    comments: generateMockComments('5'),
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/seed/6/400',
    user: MOCK_USERS[0],
    title: '기계생명체의 탄생',
    tags: ['#로봇', '#SF', '#생명'],
    likes: 145,
    commentsCount: 12,
    createdAt: '2024-02-06T07:30:00Z',
    isLiked: false,
    comments: generateMockComments('6'),
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/seed/7/400',
    user: MOCK_USERS[1],
    title: '크리스탈 정원',
    tags: ['#크리스탈', '#정원', '#판타지'],
    likes: 198,
    commentsCount: 25,
    createdAt: '2024-02-06T07:00:00Z',
    isLiked: false,
    comments: generateMockComments('7'),
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/seed/8/400',
    user: MOCK_USERS[2],
    title: '스팀펑크 기차역',
    tags: ['#스팀펑크', '#기차', '#레트로'],
    likes: 167,
    commentsCount: 18,
    createdAt: '2024-02-06T06:30:00Z',
    isLiked: false,
    comments: generateMockComments('8'),
  },
  {
    id: '9',
    imageUrl: 'https://picsum.photos/seed/9/400',
    user: MOCK_USERS[3],
    title: '오로라 아래의 캠핑',
    tags: ['#오로라', '#캠핑', '#자연'],
    likes: 221,
    commentsCount: 31,
    createdAt: '2024-02-06T06:00:00Z',
    isLiked: false,
    comments: generateMockComments('9'),
  },
  {
    id: '10',
    imageUrl: 'https://picsum.photos/seed/10/400',
    user: MOCK_USERS[4],
    title: '해저 도시의 야경',
    tags: ['#해저', '#도시', '#야경'],
    likes: 189,
    commentsCount: 22,
    createdAt: '2024-02-06T05:30:00Z',
    isLiked: false,
    comments: generateMockComments('10'),
  },
].map(post => ({
  ...post,
  isLiked: false,
  comments: generateMockComments(post.id),
}));

/**
 * 랜덤 프롬프트 목록
 */
export const RANDOM_PROMPTS = [
  '우주를 여행하는 고래',
  '네온사이버펑크 도시의 밤거리',
  '마법의 숲속 요정들',
  '미래도시의 플라잉카',
  '판타지 세계의 드래곤',
  '빛나는 크리스탈 동굴',
  '스팀펑크 기계도시',
  '오로라가 비치는 설산',
  '해저 도시의 야경',
  '마법사의 연구실 내부',
  '기계생명체의 탄생 순간',
  '크리스탈로 가득한 비밀 정원',
];

/**
 * 목업 이미지 생성 함수
 */
export const mockGenerateImage = async (prompt: string): Promise<string> => {
  // 실제 API 호출 대신 랜덤 이미지 반환
  const randomSeed = Math.floor(Math.random() * 100);
  return `https://picsum.photos/seed/${randomSeed}/400`;
}; 