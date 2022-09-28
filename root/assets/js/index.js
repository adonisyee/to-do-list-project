//===================================
//helper functions
//===================================
const toggleAddBar = function() {
    addBar.classList.toggle("fadeIn")
    addBar.classList.toggle("fadeOut")
    addItem.focus()
}

const toggleLinethrough = function() {
    this.classList.toggle("linethrough")
    for (let i=0; i<toDoArray.length; i++) {
        if (toDoArray[i].id === this.id) {
            const lineThroughIdx = toDoArray[i].classList.indexOf("linethrough")
            if (lineThroughIdx === -1) {
                toDoArray[i].classList.push("linethrough")
            }
            else {
                toDoArray[i].classList.splice(lineThroughIdx, 1)
            }
        }
    }
    localStorage.setItem("toDoArray", JSON.stringify(toDoArray))
}

const createListItem = function(item) {
    const entry = document.createElement('li')
    const entryText = document.createElement('span')
    const exitButton = document.createElement('button')
    entryText.textContent = item.text
    exitButton.innerHTML = 'X'
    exitButton.classList.add("exitButton")
    entry.appendChild(entryText)
    entry.appendChild(exitButton)
    toDoList.appendChild(entry)
    for (let i=0; i<item.classList.length; i++) {
        entryText.classList.toggle(item.classList[i])
    }
    entryText.setAttribute("id", item.id)
    //functionality for clicking exitButton and item text
    exitButton.addEventListener('click', removeListItem)
    entryText.addEventListener('click', toggleLinethrough)
}

const removeListItem = function() {
    //remove parent list item when exitButton is clicked
    for (let i=0; i<toDoArray.length; i++) {
        if (toDoArray[i].id === this.previousElementSibling.id) {
            toDoArray.splice(i, 1)
        }
    }
    this.parentNode.remove()
    localStorage.setItem("toDoArray", JSON.stringify(toDoArray))
}

const addListItem = function(e) {
    //create list item with all its features
    if (e.key === 'Enter') {
        toDoArray.push({'id': (toDoArray.length + 1).toString(), 'text': this.value, 'classList': []})
        createListItem({'id': toDoArray.length.toString(), 'text': this.value, 'classList': []})
        localStorage.setItem("toDoArray", JSON.stringify(toDoArray))
        this.value = "";
    }
}

//===================================
//Init variables
//===================================
//Select elements
const addButton = document.getElementById('addButton')
const addBar = document.getElementById('addBar')
const addItem = document.getElementById('addItem')
const toDoList = document.querySelector('ul')
let toDoArray = []

const toDoArrayFromLocalStorage = JSON.parse(localStorage.getItem("toDoArray"));

if (toDoArrayFromLocalStorage) {
    toDoArray = toDoArrayFromLocalStorage
    for (let i=0; i<toDoArray.length; i++) {
        createListItem(toDoArray[i])
    }
}

//===================================
//Main
//===================================
function main() {
    addButton.addEventListener("click", toggleAddBar)
    addItem.addEventListener("keypress", addListItem)
}

main()
