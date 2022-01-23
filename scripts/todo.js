"use strict"

let todos = getSavedTodos()
todos = getSavedTodos()

// Rendering user input
const filters = {
    searchText: "",
    hideCompleted: false
}
renderTodos(todos, filters)
document.querySelector("#search-todo").addEventListener("input", (event) => {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})

// USING A FORM
document.querySelector("#todos-form").addEventListener("submit", (event) => {
    event.preventDefault()
    const textValue = event.target.elements.userInput.value.trim()

    if (textValue.length > 0) {
        todos.push({id: uuidv4(), text: textValue, completed: false})
        saveTodos(todos)
        renderTodos(todos, filters)
        event.target.elements.userInput.value = ""
    }
   
})

document.querySelector("#todos-label").addEventListener("change", (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
