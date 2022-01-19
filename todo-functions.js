// Generating unique ID's to already present TODOs
const generateId = (todos) => {
    todos.forEach((todo) => {
        todo.id = uuidv4()
    })
}


// Checking if the local storage is empty when refreshed
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem("todos")

    // Using truthy/falsy values
    return todosJSON ? JSON.parse(todosJSON) : []
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
    generateSummaryDOM(output)
    generateTodoDOM(output, todos, filters)
} 


// Generates all to
const generateTodoDOM = (output, todos, filters) => {
    output.forEach((item) => {
        const newDiv = document.createElement("div")
        const newSpan = document.createElement("span")

        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = item.completed
        checkbox.addEventListener("change", (e) => {
            item.completed = !item.completed
            saveTodos(todos)
            renderTodos(todos, filters)
        })


        const button = document.createElement("button")
        button.textContent = "Delete"
        button.addEventListener("click", () => {
            removeTodo(item.id)
            saveTodos(todos)
            renderTodos(todos, filters)
        })

        newDiv.appendChild(checkbox)
        newSpan.textContent = `${item.text} ` 
        newDiv.appendChild(newSpan)
        newDiv.appendChild(button)
        document.querySelector("#todos-div").appendChild(newDiv)
    }) 
}


// Generates a the number of todos that need to get done
const generateSummaryDOM = (output) => {
    const incomplete = output.filter((todos) => !todos.completed)
    document.querySelector("#todos-div").innerHTML = ""
    const msg = `You have ${incomplete.length} todos left`
    const newP = document.createElement("h2")
    newP.textContent = msg
    document.querySelector("#todos-div").appendChild(newP)
}

