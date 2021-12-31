let new_todos = [
    { text: 'Got to Wal Mart', completed: true },
    { text: 'Get eggs', completed: false },
    { text: 'Exerciese', completed: false },
    { text: 'Finish JS bootcamp', completed: true },
    { text: 'Get some rest', completed: false },
    { text: 'Play Valorant', completed: true }
]



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
    renderTodos(new_todos, filters)
})



// USING A FORM
document.querySelector("#todos-form").addEventListener("submit", function(event) {
    event.preventDefault()
    const input = event.target.elements.userInput.value
    new_todos.push({text: input, completed: false})
    event.target.elements.userInput.value = ""
    renderTodos(new_todos, filters)

})


// USING A CHECKBOX

document.querySelector("#todos-label").addEventListener("change", function(e) {
    filters.hideCompleted = e.target.checked
    renderTodos(new_todos, filters)
})
