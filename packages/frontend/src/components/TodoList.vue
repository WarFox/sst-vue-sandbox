<script setup>
import { ref, watch, computed } from 'vue'
import { useTodosStore } from '@/stores/todos'

const newTodo = ref('')
const hideCompleted = ref(false)
const todoData = ref(null)
const store = useTodosStore()

const filteredTodos = computed(() => {
  return hideCompleted.value ? store.incompleteTodos : store.todos
})

async function fetchData() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${store.id++}`)
  const todo = await res.json()
  todoData.value = { ...todo, text: todo.title }
}

function addTodo() {
  if (newTodo.value !== '') {
    console.log('c add tudo ', store.id)
    store.addTodo({ id: store.id++, text: newTodo.value, completed: false })
  } else {
    newTodo.value = ''
  }
}

watch(todoData, (newTodoData) => {
  store.addTodo(newTodoData)
})

fetchData()
</script>

<template>
  <p>Latest ID : {{ store.id }}</p>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" class="border border-purple-200 text-purple-600" />
    <button
      class="px-4 py-1 text-purple-600 border border-purple-200 hover:text-white hover:bg-purple-600 rounded-full"
    >
      Add Todo
    </button>
  </form>
  <p v-if="!todoData">Loading...</p>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed" />
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <button
        @click="store.removeTodo(todo)"
        class="mx-2 px-2 text-xs text-purple-600 border border-purple-200 hover:text-white hover:bg-purple-600"
      >
        X
      </button>
    </li>
  </ul>
  <button
    @click="hideCompleted = !hideCompleted"
    class="px-4 py-1 text-purple-600 border border-purple-200 hover:text-white hover:bg-purple-600 rounded-full"
  >
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>

  <button
    class="px-4 py-1 text-purple-600 border border-purple-200 hover:text-white hover:bg-purple-600 rounded-full"
    @click="fetchData"
  >
    Fetch next todo
  </button>
</template>

<style>
.completed {
  text-decoration: line-through;
}
</style>
