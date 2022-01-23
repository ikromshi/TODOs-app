"use strict"

// Generating unique ID's to already present TODOs
const generateId = (todos) => {
    todos.forEach((todo) => {
        todo.id = uuidv4()
    })
}

// Checking if the local storage is empty when refreshed
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem("todos")

    try {
        // Using truthy/falsy values
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch {
        return []
    }
}

// Save TODOs to local storage
const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Remove TODOs
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Rendering user input
const renderTodos = (todos, filters) => {
    let output = todos.filter((item) => item.text.toLowerCase().includes(filters.searchText.toLowerCase()))
    output = output.filter((todo) => !filters.hideCompleted || !todo.completed)

    if (output.length > 0) {
        generateSummaryDOM(output)
        generateTodoDOM(output, todos, filters)
    } else {
        document.querySelector("#todos-div").innerHTML = ""
        output = document.createElement("p")
        output.classList.add("empty-message")
        output.textContent = "No to-dos to show"
        document.querySelector("#todos-div").appendChild(output)
    }
} 

// Generates all to
const generateTodoDOM = (output, todos, filters) => {
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
            item.completed = !item.completed
            saveTodos(todos)
            renderTodos(todos, filters)
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
            saveTodos(todos)
            renderTodos(todos, filters)
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

