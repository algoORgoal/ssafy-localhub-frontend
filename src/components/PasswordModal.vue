<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  description: string
  confirmLabel?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [password: string]
}>()

const close = () => emit('update:modelValue', false)

const handleConfirm = (event: SubmitEvent) => {
  const form = event.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  emit('confirm', String(formData.get('password') ?? ''))
}
</script>

<template>
  <Teleport to="body">
    <div v-if="props.modelValue" class="dialog-backdrop" @click.self="close">
      <div class="dialog-panel">
        <form class="form-grid" @submit.prevent="handleConfirm">
          <div>
            <h3 class="detail-title">{{ props.title }}</h3>
            <p class="helper" style="margin-top: 8px">{{ props.description }}</p>
          </div>

          <label class="field-group">
            <span class="muted">비밀번호</span>
            <input class="password-input" name="password" type="password" autocomplete="current-password" />
          </label>

          <div class="modal-actions">
            <button type="button" class="button-ghost" @click="close">취소</button>
            <button type="submit" class="button">{{ props.confirmLabel ?? '확인' }}</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>