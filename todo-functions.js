// Generating unique ID's to already present TODOs
const generateId = function(todos) {
    todos.forEach(function(todo) {
        todo.id = uuidv4()
    })
}



// Checking if the local storage is empty when refreshed
const getSavedTodos = function() {
    const todosJSON = localStorage.getItem("todos")
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}


// Save TODOs to local storage
const saveTodos = function(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
}


// Remove TODOs
const removeTodo = function(id) {
    const todoIndex = todos.findIndex(function(todo) {
        return todo.id === id
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Rendering user input
const renderTodos = function(todos, filters) {
    let output = todos.filter(function(item) {
        return item.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    output = output.filter(function(todo) {
        return !filters.hideCompleted || !todo.completed
    })
    generateSummaryDOM(output)
    generateTodoDOM(output, todos, filters)
} 


// Generates all to
const generateTodoDOM = function(output, todos, filters) {
    output.forEach(function(item) {
        const newDiv = document.createElement("div")
        const newSpan = document.createElement("span")

        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = item.completed
        checkbox.addEventListener("change", function (e) {
            item.completed = !item.completed
            saveTodos(todos)
            renderTodos(todos, filters)
        })


        const button = document.createElement("button")
        button.textContent = "Delete"
        button.addEventListener("click", function() {
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
const generateSummaryDOM = function(output) {
    const incomplete = output.filter(function(todos) {
        return !todos.completed
    })
    document.querySelector("#todos-div").innerHTML = ""
    const msg = `You have ${incomplete.length} todos left`
    const newP = document.createElement("h2")
    newP.textContent = msg
    document.querySelector("#todos-div").appendChild(newP)
}

