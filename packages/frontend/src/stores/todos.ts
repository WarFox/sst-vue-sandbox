import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface TodoItem {
  id: Number
  text: String
  completed: boolean
}

export const useTodosStore = defineStore('todos', () => {
  const id = ref(0)
  const todos = ref<TodoItem[]>([
    { id: id.value++, text: 'Learn HTML', completed: true },
    { id: id.value++, text: 'Learn JavaScript', completed: true },
    { id: id.value++, text: 'Learn Vue', completed: false }
  ])

  const incompleteTodos = computed(() => {
    return todos.value.filter((t) => !t.completed)
  })

  function addTodo(todo: TodoItem) {
    todos.value.push(todo)
  }

  function removeTodo(todo: TodoItem) {
    todos.value = todos.value.filter((t) => t.id !== todo.id)
  }

  return { id, todos, incompleteTodos, addTodo, removeTodo }
})
