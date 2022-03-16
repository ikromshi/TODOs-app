import { v4 as uuidv4 } from 'uuid'
let todos = []

// Checking if the local storage is empty when refreshed
const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos")

    try {
        // Using truthy/falsy values
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch {
        todos = []
    }
}

// Save TODOs to local storage
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text,
        completed: false,
    })
    saveTodos()
}

// Remove TODOs
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// Toggles the completed value for a given TODO
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}


loadTodos()

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo }
