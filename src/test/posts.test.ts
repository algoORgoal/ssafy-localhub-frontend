import { fireEvent, render, screen } from '@testing-library/vue'
import { defineComponent, h, nextTick, ref } from 'vue'
import { getPosts } from '../services/localhubApi'

const PostSearchProbe = defineComponent({
  name: 'PostSearchProbe',
  setup() {
    const query = ref('')
    const results = ref<string[]>([])

    const submit = async () => {
      const response = await getPosts({ query: query.value, pageSize: 10 })
      results.value = response.items.map((post) => post.title)
      await nextTick()
    }

    return () =>
      h('section', [
        h('h2', '게시글 목록'),
        h('input', {
          value: query.value,
          placeholder: '제목, 본문, 작성자 검색',
          onInput: (event: Event) => {
            query.value = (event.target as HTMLInputElement).value
          },
        }),
        h('button', { type: 'button', onClick: submit }, '검색'),
        h('ul', results.value.map((title) => h('li', title))),
      ])
  },
})

test('게시글 목록에서 검색을 수행할 수 있다', async () => {
  render(PostSearchProbe)

  expect(screen.getByRole('heading', { name: '게시글 목록' })).toBeInTheDocument()

  const search = screen.getByPlaceholderText('제목, 본문, 작성자 검색')
  await fireEvent.update(search, '미술관')
  await fireEvent.click(screen.getByRole('button', { name: '검색' }))

  expect(await screen.findByText('대전 시립미술관 전시 추천')).toBeInTheDocument()
})
