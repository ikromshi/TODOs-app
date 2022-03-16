import { getTodos, toggleTodo, removeTodo } from "./todos"
import { getFilters } from "./filters"

// Rendering user input
const renderTodos = () => {
    const filters = getFilters()
    const todos = getTodos()

    let output = todos.filter((item) => item.text.toLowerCase().includes(filters.searchText.toLowerCase()))
    output = output.filter((todo) => !filters.hideCompleted || !todo.completed)

    if (output.length > 0) {
        generateSummaryDOM(output)
        generateTodoDOM(output, todos, filters)
    } else {
        document.querySelector("#todos-div").innerHTML = ""
        output = document.createElement("p")
        output.classList.add("empty-message")
        output.textContent = "No TODOs to show"
        document.querySelector("#todos-div").appendChild(output)
    }
} 

// Generates all TODOs
const generateTodoDOM = (output) => {
    output.forEach((item) => {
        const newDiv = document.createElement("label")
        const containerEl = document.createElement("div")
        const newSpan = document.createElement("span")
        const button = document.createElement("button")

        // Setting up the checkbox
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = item.completed
        containerEl.appendChild(checkbox)

        checkbox.addEventListener("change", (e) => {
            toggleTodo(item.id)
            renderTodos()
        })


        // Setting up the todo text
        newSpan.textContent = `${item.text} ` 
        containerEl.appendChild(newSpan)

        // Setting up the container
        newDiv.classList.add("list-item")
        containerEl.classList.add("list-item__container")
        newDiv.appendChild(containerEl)

        // Setting up the remove button
        button.textContent = "Delete"
        button.classList.add("button", "button--text")
        newDiv.appendChild(button)

        button.addEventListener("click", () => {
            removeTodo(item.id)
            renderTodos()
        })


        document.querySelector("#todos-div").appendChild(newDiv)
    }) 
}

// Generates a the number of todos that need to get done
const generateSummaryDOM = (output) => {
    const incomplete = output.filter((todos) => !todos.completed)

    document.querySelector("#todos-div").innerHTML = ""
    const summary = document.createElement("h2")
    const plural = incomplete.length === 1 ? " " : "s"
    summary.classList.add("list-title")
    summary.textContent = `You have ${incomplete.length} todo${plural} left`

    document.querySelector("#todos-div").appendChild(summary)
}

export { generateTodoDOM, renderTodos, generateSummaryDOM }