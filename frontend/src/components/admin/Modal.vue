<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[1055] flex items-center justify-center bg-opacity-50 cursor-pointer"
      @click="$emit('close')">
      <div
        class="relative w-full max-w-[600px] transform rounded-lg bg-white p-4 shadow-xl transition-all"
        @click.stop>
        <div class="flex items-center justify-between border-b pb-4">
          <h5 class="text-xl font-medium text-gray-900">
            {{ title }}
          </h5>
          <button
            type="button"
            class="text-gray-400 hover:text-gray-500 cursor-pointer"
            @click="$emit('close')"
            aria-label="Close">
            <span class="[&>svg]:h-6 [&>svg]:w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>

        <div class="py-4">
          <slot name="content"/>
        </div>

        <div class="border-t pt-4 flex justify-end space-x-2">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Modal title"
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>