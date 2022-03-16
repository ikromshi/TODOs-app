import { renderTodos } from "./views.js"
import { setFilters } from "./filters.js"
import { createTodo, loadTodos } from "./todos"

renderTodos()

document.querySelector("#search-todo").addEventListener("input", (event) => {
    setFilters({
        searchText: event.target.value
    })
    renderTodos()
})

// USING A FORM
document.querySelector("#todos-form").addEventListener("submit", (event) => {
    event.preventDefault()
    const textValue = event.target.elements.userInput.value.trim()

    if (textValue.length > 0) {
        createTodo(textValue)
        renderTodos()
        event.target.elements.userInput.value = ""
    } 
})

document.querySelector("#todos-label").addEventListener("change", (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

window.addEventListener("storage", (e) => {
    if (e.key === "todos") {
        loadTodos()
        renderTodos()
    }
})
