//===================================
//helper functions
//===================================
const toggleAddBar = function() {
    addBar.classList.toggle("fadeIn");
    addBar.classList.toggle("fadeOut");
    addItem.focus();
}

const toggleLinethrough = function() {
    this.classList.toggle("linethrough");
}

const removeListItem = function() {
    //remove parent list item when exitButton is clicked
    this.parentNode.remove();
}

const addListItem = function(e) {
    //create list item with all its features
    if (e.key === 'Enter') {
        let entry = document.createElement('li');
        let entryText = document.createElement('span');
        let exitButton = document.createElement('button');
        entryText.textContent = this.value;
        exitButton.innerHTML = 'X';
        exitButton.classList.add("exitButton");
        entry.appendChild(entryText);
        entry.appendChild(exitButton);
        toDoList.appendChild(entry);
        this.value = "";
        //functionality for clicking exitButton and item text
        exitButton.addEventListener('click', removeListItem);
        entryText.addEventListener('click', toggleLinethrough);
    }
}

//===================================
//Init variables
//===================================
//Select elements
const addButton = document.getElementById('addButton');
const addBar = document.getElementById('addBar');
const addItem = document.getElementById('addItem');
const toDoList = document.querySelector('ul');

//===================================
//Main
//===================================
function main() {
    addButton.addEventListener("click", toggleAddBar);
    addItem.addEventListener("keypress", addListItem);
}

main();
