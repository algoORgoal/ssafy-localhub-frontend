import type { Post, Place, Festival, PageResponse } from '../types/api'

// 헬퍼 함수들
export const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

export const normalize = (value: string) => value.trim().toLowerCase()

export const paginate = <T,>(items: T[], page = 1, pageSize = 6): { items: T[]; pages: PageResponse } => {
  const safePage = Math.max(1, Math.floor(page)) // page가 string으로 넘어올 수 있으므로 안전하게 처리
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (safePage - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    pages: { page: safePage, pageSize, total, totalPages },
  }
}

export const readLikedIds = () => {
  if (typeof window === 'undefined') {
    return new Set<number>()
  }
  const raw = window.localStorage.getItem('localhub-liked-posts')
  if (!raw) {
    return new Set<number>()
  }
  return new Set<number>(JSON.parse(raw) as number[])
}

export const writeLikedIds = (likedIds: Set<number>) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem('localhub-liked-posts', JSON.stringify([...likedIds]))
}

// 초기 데이터 생성 함수들
const createInitialPosts = (): Post[] => [
  {
    id: 1,
    category: '관광지',
    title: '무등산 전망 포인트 추천해요',
    content: '해 질 무렵 전망대에서 보는 광주 야경이 정말 좋았습니다. 주말 산책 코스로도 추천합니다.',
    author: 'localhub',
    password: '1234',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    viewCount: 34,
    likeCount: 6,
  },
  {
    id: 2,
    category: '음식점',
    title: '전주 한옥마을 근처 비빔밥 맛집',
    content: '대기 줄은 있었지만 회전이 빠르고, 반찬 구성이 좋아서 만족도가 높았습니다.',
    author: 'hana',
    password: '1234',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    viewCount: 18,
    likeCount: 4,
  },
  {
    id: 3,
    category: '축제공연행사',
    title: '서울 재즈 페스타 일정 공유',
    content: '주말 이틀 동안 야외 공연과 푸드존이 함께 운영됩니다. 저녁 시간대에 무대가 가장 좋습니다.',
    author: 'mango',
    password: '1234',
    createdAt: Date.now() - 1000 * 60 * 60 * 20,
    viewCount: 51,
    likeCount: 11,
  },
  {
    id: 4,
    category: '레포츠',
    title: '부산 해운대 러닝 코스 후기',
    content: '바닷가를 따라 달리는 코스라 시원하고, 초보자도 무난하게 즐길 수 있습니다.',
    author: 'runner',
    password: '1234',
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
    viewCount: 22,
    likeCount: 5,
  },
  {
    id: 5,
    category: '문화시설',
    title: '대전 시립미술관 전시 추천',
    content: '작품 해설이 친절하고, 전시 동선이 편해 가족 단위 방문에도 좋았습니다.',
    author: 'artlover',
    password: '1234',
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    viewCount: 17,
    likeCount: 3,
  },
  {
    id: 6,
    category: '쇼핑',
    title: '지역 특산품 구매하기 좋은 시장',
    content: '관광객 상권보다 동네 시장 쪽이 가격과 품질의 균형이 좋았습니다.',
    author: 'market',
    password: '1234',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    viewCount: 12,
    likeCount: 2,
  },
]

const createInitialPlaces = (): Place[] => [
  {
    id: 1,
    category: '관광지',
    title: '무등산국립공원',
    address: '광주 동구 용연동',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    mapx: 126.9934,
    mapy: 35.1708,
    region: '광주',
    description: '도심에서 가깝게 산책과 등산을 즐길 수 있는 대표 자연 명소입니다.',
  },
  {
    id: 2,
    category: '음식점',
    title: '전주 남부시장 맛집 골목',
    address: '전북 전주시 완산구',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    mapx: 127.1512,
    mapy: 35.8151,
    region: '전북',
    description: '대표 향토음식을 한 번에 비교할 수 있는 음식점 밀집 구역입니다.',
  },
  {
    id: 3,
    category: '축제공연행사',
    title: '서울 광장 야외공연장',
    address: '서울 중구 세종대로',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    mapx: 126.9768,
    mapy: 37.5665,
    region: '서울',
    description: '도심 접근성이 뛰어나 축제와 공연 연계 안내에 적합합니다.',
  },
  {
    id: 4,
    category: '문화시설',
    title: '대전 시립미술관',
    address: '대전 서구 둔산대로',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80',
    mapx: 127.3845,
    mapy: 36.3504,
    region: '대전',
    description: '전시와 교육 프로그램 정보를 함께 보여주기 좋은 문화시설입니다.',
  },
  {
    id: 5,
    category: '레포츠',
    title: '부산 해운대 해변 러닝 코스',
    address: '부산 해운대구 우동',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    mapx: 129.1603,
    mapy: 35.1587,
    region: '부산',
    description: '바다를 끼고 달리는 해안 러닝 코스입니다.',
  },
  {
    id: 6,
    category: '숙박',
    title: '경북 한옥 스테이',
    address: '경북 경주시 황남동',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    mapx: 129.2247,
    mapy: 35.8562,
    region: '경북',
    description: '지역 체류형 여행을 소개할 때 좋은 숙박 데이터입니다.',
  },
]

const createInitialFestivals = (): Festival[] => [
  {
    id: 1,
    title: '서울 재즈 페스타',
    date: '2026-07-18',
    region: '서울',
    location: '서울 광장',
    summary: '야외 재즈 공연과 푸드트럭이 함께 운영되는 도심형 축제입니다.',
  },
  {
    id: 2,
    title: '전주 한옥마을 야시장',
    date: '2026-07-20',
    region: '전북',
    location: '전주 한옥마을',
    summary: '야간 미식과 지역 공예품 체험을 함께 즐길 수 있습니다.',
  },
  {
    id: 3,
    title: '부산 바다 영화제',
    date: '2026-07-23',
    region: '부산',
    location: '해운대 해변',
    summary: '해변 야외 상영과 음악 공연을 묶은 여름 시즌 행사입니다.',
  },
  {
    id: 4,
    title: '광주 미식 주간',
    date: '2026-07-25',
    region: '광주',
    location: '충장로 일대',
    summary: '지역 음식점과 함께 쿠폰 이벤트를 운영합니다.',
  },
  {
    id: 5,
    title: '대전 과학문화 축제',
    date: '2026-07-27',
    region: '대전',
    location: '엑스포시민광장',
    summary: '가족 단위 체험형 전시와 공연이 함께 열립니다.',
  },
]

// MSW 핸들러에서 직접 접근하고 수정할 상태값들
export const mockPosts: Post[] = createInitialPosts()
export const mockPlaces: Place[] = createInitialPlaces()
export const mockFestivals: Festival[] = createInitialFestivals()
export let nextPostId = mockPosts.length + 1

// ID 발급 헬퍼
export const getNextPostId = () => {
  const id = nextPostId
  nextPostId += 1
  return id
}
