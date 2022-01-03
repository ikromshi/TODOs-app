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


// Rendering user input
const renderTodos = function(todos, filters) {
    let output = todos.filter(function(item) {
        return item.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    output = output.filter(function(todo) {
        return !filters.hideCompleted || !todo.completed
    })
    generateSummaryDOM(output)
    generateTodoDOM(output)
} 


// Generates all to
const generateTodoDOM = function(output) {
    output.forEach(function(item) {
        const newP = document.createElement("p")
        newP.textContent = item.text 
        document.querySelector("#todos-div").appendChild(newP)
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

