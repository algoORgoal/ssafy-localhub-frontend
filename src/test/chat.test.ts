import { fireEvent, render, screen } from '@testing-library/vue'
import { defineComponent, h, ref } from 'vue'
import { chatRespond } from '../services/localhubApi'

const ChatProbe = defineComponent({
  name: 'ChatProbe',
  setup() {
    const input = ref('')
    const reply = ref('')

    const send = async () => {
      const response = await chatRespond(input.value)
      reply.value = response.message
    }

    return () =>
      h('section', [
        h('h2', '챗봇'),
        h('input', {
          value: input.value,
          onInput: (event: Event) => {
            input.value = (event.target as HTMLInputElement).value
          },
        }),
        h('button', { type: 'button', onClick: send }, '전송'),
        h('p', reply.value),
      ])
  },
})

test('챗봇이 축제 질문에 응답한다', async () => {
  render(ChatProbe)

  const input = screen.getByRole('textbox')
  await fireEvent.update(input, '부산 축제 알려줘')
  await fireEvent.click(screen.getByRole('button', { name: '전송' }))

  expect(await screen.findByText('이번 달 축제 일정을 빠르게 추려봤어요.')).toBeInTheDocument()
})
