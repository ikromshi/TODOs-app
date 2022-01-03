let todos = [
    { text: 'Got to Wal Mart', completed: true },
    { text: 'Get eggs', completed: false },
    { text: 'Exerciese', completed: false },
    { text: 'Finish JS bootcamp', completed: true },
    { text: 'Get some rest', completed: false },
    { text: 'Play Valorant', completed: true }
]
localStorage.setItem("todos", JSON.stringify(todos))

todos = getSavedTodos()

// Rendering user input
const filters = {
    searchText: "",
    hideCompleted: false
}
renderTodos(todos, filters)
document.querySelector("#search-todo").addEventListener("input", function(event) {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})

// USING A FORM
document.querySelector("#todos-form").addEventListener("submit", function(event) {
    event.preventDefault()
    const input = event.target.elements.userInput.value
    todos.push({text: input, completed: false})

    saveTodos()
    event.target.elements.userInput.value = ""
    renderTodos(todos, filters)
})

document.querySelector("#todos-label").addEventListener("change", function(e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
