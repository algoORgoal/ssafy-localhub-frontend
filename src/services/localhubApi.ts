import Mock from 'mockjs'

export const postCategories = [
  '관광지',
  '문화시설',
  '축제공연행사',
  '음식점',
  '숙박',
  '레포츠',
  '쇼핑',
  '여행코스',
] as const

export type PostCategory = (typeof postCategories)[number]

export interface Post {
  id: number
  category: PostCategory
  title: string
  content: string
  author: string
  password: string
  createdAt: number
  viewCount: number
  likeCount: number
  region: string
  tags: string[]
}

export interface PostInput {
  category: PostCategory
  title: string
  content: string
  author: string
  password: string
}

export interface Place {
  id: number
  category: PostCategory | '전체'
  title: string
  address: string
  image: string
  mapx: number
  mapy: number
  region: string
  description: string
}

export interface Festival {
  id: number
  title: string
  date: string
  region: string
  location: string
  summary: string
}

export interface PageResponse {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PostListResponse {
  items: Post[]
  pages: PageResponse
}

export interface PlaceListResponse {
  items: Place[]
  pages: PageResponse
}

export interface ChatResponse {
  message: string
  items: Array<{ id: number; title: string; type: string; note: string }>
}

export interface DashboardSummary {
  totalPosts: number
  totalPlaces: number
  totalFestivals: number
  topCategories: Array<{ name: string; count: number }>
}

const sleep = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

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
    region: '광주',
    tags: ['전망', '야경'],
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
    region: '전북',
    tags: ['맛집', '비빔밥'],
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
    region: '서울',
    tags: ['축제', '공연'],
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
    region: '부산',
    tags: ['러닝', '해안'],
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
    region: '대전',
    tags: ['전시', '미술관'],
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
    region: '경북',
    tags: ['시장', '특산품'],
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

const posts: Post[] = createInitialPosts()
const places: Place[] = createInitialPlaces()
const festivals: Festival[] = createInitialFestivals()
let nextPostId = posts.length + 1

const normalize = (value: string) => value.trim().toLowerCase()
const paginate = <T,>(items: T[], page = 1, pageSize = 6): { items: T[]; pages: PageResponse } => {
  const safePage = Math.max(1, page)
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (safePage - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    pages: { page: safePage, pageSize, total, totalPages },
  }
}

const readLikedIds = () => {
  if (typeof window === 'undefined') {
    return new Set<number>()
  }

  const raw = window.localStorage.getItem('localhub-liked-posts')
  if (!raw) {
    return new Set<number>()
  }

  return new Set<number>(JSON.parse(raw) as number[])
}

const writeLikedIds = (likedIds: Set<number>) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem('localhub-liked-posts', JSON.stringify([...likedIds]))
}

export const getPostCategories = () => ['전체', ...postCategories]

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await sleep(80)
  return {
    totalPosts: posts.length,
    totalPlaces: places.length,
    totalFestivals: festivals.length,
    topCategories: postCategories.slice(0, 4).map((name) => ({
      name,
      count: posts.filter((post) => post.category === name).length,
    })),
  }
}

export async function getRecentPosts(): Promise<Post[]> {
  await sleep()
  return clone(posts.slice(0, 4))
}

export async function getPosts(params: { category?: string; query?: string; page?: number; pageSize?: number }): Promise<PostListResponse> {
  await sleep()
  const category = params.category?.trim() ?? ''
  const query = normalize(params.query ?? '')
  const filtered = posts.filter((post) => {
    const categoryMatch = !category || category === '전체' || post.category === category
    const queryMatch =
      !query ||
      [post.title, post.content, post.author, post.category, post.region, ...post.tags].some((value) =>
        normalize(String(value)).includes(query),
      )

    return categoryMatch && queryMatch
  })

  return paginate(filtered, params.page ?? 1, params.pageSize ?? 6)
}

export async function getPostById(id: number): Promise<Post | null> {
  await sleep(60)
  const post = posts.find((item) => item.id === id)
  return post ? clone(post) : null
}

export async function incrementPostViews(id: number): Promise<Post | null> {
  const post = posts.find((item) => item.id === id)
  if (!post) {
    return null
  }

  post.viewCount += 1
  return clone(post)
}

export async function verifyPostPassword(id: number, password: string): Promise<boolean> {
  await sleep(90)
  const post = posts.find((item) => item.id === id)
  return post ? post.password === password : false
}

export async function createPost(input: PostInput): Promise<Post> {
  await sleep(120)
  const post: Post = {
    id: nextPostId,
    category: input.category,
    title: input.title,
    content: input.content,
    author: input.author,
    password: input.password,
    createdAt: Date.now(),
    viewCount: 0,
    likeCount: 0,
    region: 'LOCAL',
    tags: Mock.Random.pick([
      ['지역', '공유'],
      ['후기', '추천'],
      ['탐색', '정보'],
    ]),
  }

  nextPostId += 1
  posts.unshift(post)
  return clone(post)
}

export async function updatePost(id: number, input: PostInput): Promise<Post> {
  await sleep(120)
  const post = posts.find((item) => item.id === id)

  if (!post) {
    throw new Error('게시글을 찾을 수 없습니다.')
  }

  if (post.password !== input.password) {
    throw new Error('비밀번호가 일치하지 않습니다.')
  }

  post.category = input.category
  post.title = input.title
  post.content = input.content
  post.author = input.author
  return clone(post)
}

export async function deletePost(id: number, password: string): Promise<void> {
  await sleep(100)
  const index = posts.findIndex((item) => item.id === id)
  if (index < 0) {
    throw new Error('게시글을 찾을 수 없습니다.')
  }

  if (posts[index].password !== password) {
    throw new Error('비밀번호가 일치하지 않습니다.')
  }

  posts.splice(index, 1)
}

export async function togglePostLike(id: number): Promise<Post | null> {
  await sleep(60)
  const post = posts.find((item) => item.id === id)
  if (!post) {
    return null
  }

  const likedIds = readLikedIds()
  if (likedIds.has(id)) {
    likedIds.delete(id)
    post.likeCount = Math.max(0, post.likeCount - 1)
  } else {
    likedIds.add(id)
    post.likeCount += 1
  }

  writeLikedIds(likedIds)
  return clone(post)
}

export async function getCategories(params: { filter?: string; page?: number; pageSize?: number }): Promise<PlaceListResponse> {
  await sleep()
  const filter = params.filter?.trim() ?? ''
  const filtered = places.filter((place) => !filter || filter === '전체' || place.category === filter)
  return paginate(filtered, params.page ?? 1, params.pageSize ?? 6)
}

export async function getFestivals(): Promise<Festival[]> {
  await sleep(90)
  return clone(festivals)
}

export async function chatRespond(text: string): Promise<ChatResponse> {
  await sleep(160)
  const normalized = normalize(text)

  const placeKeyword = normalized.includes('맛집') || normalized.includes('음식') || normalized.includes('추천')
  const festivalKeyword = normalized.includes('축제') || normalized.includes('일정') || normalized.includes('공연')
  const postKeyword = normalized.includes('게시글') || normalized.includes('글') || normalized.includes('커뮤니티')

  if (postKeyword) {
    const searchTerm = normalize(normalized.replace('게시글', '').replace('커뮤니티', '').trim())
    const matched = posts.filter((post) => normalize(`${post.title} ${post.content} ${post.author}`).includes(searchTerm)).slice(0, 3)
    return {
      message: matched.length
        ? `게시글 ${matched.length}건을 찾았어요. 관련 글을 빠르게 확인해보세요.`
        : '게시글 검색어를 조금 더 구체적으로 입력해보세요.',
      items: matched.map((post) => ({
        id: post.id,
        title: post.title,
        type: post.category,
        note: post.author,
      })),
    }
  }

  if (festivalKeyword) {
    const matched = festivals.slice(0, 3)
    return {
      message: '이번 달 축제 일정을 빠르게 추려봤어요.',
      items: matched.map((festival) => ({
        id: festival.id,
        title: festival.title,
        type: festival.region,
        note: `${festival.date} · ${festival.location}`,
      })),
    }
  }

  if (placeKeyword) {
    const searchTerm = normalized.replace('추천', '').trim()
    const matched = places.filter((place) => normalize(`${place.category} ${place.region} ${place.title}`).includes(searchTerm)).slice(0, 3)
    return {
      message: '지역 장소 추천 결과를 모아봤어요.',
      items: matched.map((place) => ({
        id: place.id,
        title: place.title,
        type: place.category,
        note: place.address,
      })),
    }
  }

  return {
    message: '관광지, 맛집, 축제, 게시글 검색을 도와드릴 수 있어요. 원하는 지역이나 카테고리를 말해보세요.',
    items: posts.slice(0, 2).map((post) => ({
      id: post.id,
      title: post.title,
      type: post.category,
      note: post.region,
    })),
  }
}