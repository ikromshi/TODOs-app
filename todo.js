let todos = [
    { text: 'Got to Wal Mart', completed: true },
    { text: 'Get eggs', completed: false },
    { text: 'Exerciese', completed: false },
    { text: 'Finish JS bootcamp', completed: true },
    { text: 'Get some rest', completed: false },
    { text: 'Play Valorant', completed: true }
]

// Checking if the local storage is empty (if not, assign )
const todosJSON = localStorage.getItem("todos")
if (todosJSON !== null) {
    todos = JSON.parse(todosJSON)
    console.log("WORKING....")
}



// Rendering user input
const filters = {
    searchText: "",
    hideCompleted: false
}

const renderTodos = function(todos, filters) {
    let output = todos.filter(function(item) {
        return item.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    

    output = output.filter(function(todo) {
       return !filters.hideCompleted || !todo.completed
    })


    // 1. You have 2 todos left (p elemet)
    const incomplete = output.filter(function(todos) {
        return !todos.completed
    })
    document.querySelector("#todos-div").innerHTML = ""
    const msg = `You have ${incomplete.length} todos left`
    const newP = document.createElement("h1")
    newP.textContent = msg
    document.querySelector("#todos-div").appendChild(newP)


    output.forEach(function(item) {
        const newP = document.createElement("p")
        newP.textContent = item.text 
        document.querySelector("#todos-div").appendChild(newP)
    })
    

}
document.querySelector("#search-todo").addEventListener("input", function(event) {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})



// USING A FORM
document.querySelector("#todos-form").addEventListener("submit", function(event) {
    event.preventDefault()
    const input = event.target.elements.userInput.value
    todos.push({text: input, completed: false})

    localStorage.setItem("todos", JSON.stringify(todos))

    event.target.elements.userInput.value = ""
    renderTodos(todos, filters)

})



document.querySelector("#todos-label").addEventListener("change", function(e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
