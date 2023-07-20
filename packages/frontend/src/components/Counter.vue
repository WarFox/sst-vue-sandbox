<template>
  <p>Count is {{ store.count }}</p>
  <p>Double is {{ store.doubleCount }}</p>
  <p>Triple is {{ tripleCount}}</p>
  <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="store.increment()">Clicke Me!</button>

  <div>
      {{ store }}
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()

setInterval(() => {
    store.increment()
}, 1000)

// ✅ this one will be reactive
const tripleCount = computed(() => store.count * 3)
</script>
