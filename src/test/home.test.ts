import { render, screen } from '@testing-library/vue'
import { defineComponent, h, onMounted, ref } from 'vue'
import { getDashboardSummary } from '../services/localhubApi'

const HomeProbe = defineComponent({
  name: 'HomeProbe',
  setup() {
    const totalPosts = ref(0)

    onMounted(async () => {
      const summary = await getDashboardSummary()
      totalPosts.value = summary.totalPosts
    })

    return () =>
      h('section', [
        h('h1', 'LocalHub MVP · Vue 3 + Mock API'),
        h('a', { href: '/posts' }, '게시글 보기'),
        h('a', { href: '/chat' }, '챗봇 열기'),
        h('p', `게시글 ${totalPosts.value}`),
      ])
  },
})

test('홈 화면에서 주요 CTA를 보여준다', async () => {
  render(HomeProbe)

  expect(screen.getByText('LocalHub MVP · Vue 3 + Mock API')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '게시글 보기' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: '챗봇 열기' })).toBeInTheDocument()
  expect(await screen.findByText('게시글 6')).toBeInTheDocument()
})
