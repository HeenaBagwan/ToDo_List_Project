const TodoValue = document.getElementById("todo-text");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const AddUpdate = document.getElementById("AddUpadateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

function CreateToDoItems() {
    const priority = document.querySelector("#priority-select").value;
    const dueDate = document.querySelector("#due-date").value;

    // Check if all fields are filled out
    if (TodoValue.value === "" || !priority || !dueDate) {
        setAlertMessage("Please enter your todo text, priority, and due date!");
        return;  // Don't continue if validation fails
    }

    let isPresent = false;

    // Check if the item is already in the list
    todo.forEach((element) => {
        if (element.item === TodoValue.value && element.priority === priority && element.dueDate === dueDate) {
            isPresent = true;
        }
    });

    if (isPresent) {
        setAlertMessage("This item is already present in the list!");
        return;
    }

    // Create a new item
    let li = document.createElement("li");

    const todoItems = `
        <div title="Hit double click and complete" ondblclick="CompletedToDoItems(this)">
            <span class="todo-item-text">${TodoValue.value}</span>
            <span class="todo-priority">${priority}</span>
            <span class="todo-due-date">${dueDate}</span>
        </div>
        <div class="todo-actions">
            <img class="edit todo-controls" onclick="UpdateTodoItems(this)" src="images/pencil.png"/>
            <img class="delete todo-controls" onclick="DeleteTodoItems(this)" src="images/delete.png"/>
        </div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);

    // Add the new item to the todo array
    let itemlist = {
        item: TodoValue.value,
        status: false,
        priority: priority,
        dueDate: dueDate
    };
    todo.push(itemlist);
    setLocalStorage();

    // Reset the form fields after adding the item
    TodoValue.value = "";
    document.querySelector("#priority-select").value = "medium";
    document.querySelector("#due-date").value = "";

    setAlertMessage("Todo item created successfully!");
    ReadToDoItems();  // Refresh the list immediately
}

function ReadToDoItems() {
    listItems.innerHTML = "";  // Clear current list

    todo.forEach((element, index) => {
        let li = document.createElement("li");
        let style = element.status ? "style='text-decoration: line-through'" : "";

        const todoItems = `
            <div ${style} title="Click to toggle completion" ondblclick="CompletedToDoItems(this)">
                <span class="todo-item-text">${element.item}</span>
                <span class="todo-priority">${element.priority}</span>
                <span class="todo-due-date">${element.dueDate}</span>
                ${element.status ? '<img class="todo-controls" src="images/check-mark.png"/>' : ""}
            </div>
            <div class="todo-actions">
                ${!element.status ? `<img class="edit todo-controls" onclick="UpdateTodoItems(this, ${index})" src="images/pencil.png"/>` : ''}
                <img class="delete todo-controls" onclick="DeleteTodoItems(this, ${index})" src="images/delete.png"/>
            </div>`;

        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

ReadToDoItems(); // Load the list on page load

let updateIndex = null; // Keep track of the index of the task being edited

function UpdateTodoItems(e, index) {
    updateIndex = index; // Store the index of the task to be updated

    const itemToUpdate = todo[updateIndex];

    // Set the input fields to the current task's values
    TodoValue.value = itemToUpdate.item;
    document.querySelector("#priority-select").value = itemToUpdate.priority;
    document.querySelector("#due-date").value = itemToUpdate.dueDate;

    // Change the button icon and function to "Update"
    AddUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    AddUpdate.setAttribute("src", "images/refresh.png");

    TodoValue.focus();
}

function UpdateOnSelectionItems() {
    const priority = document.querySelector("#priority-select").value;
    const dueDate = document.querySelector("#due-date").value;

    // Ensure that all fields are filled out before updating
    if (TodoValue.value === "" || !priority || !dueDate) {
        setAlertMessage("Please enter your todo text, priority, and due date!");
        return;
    }

    // Update the task with new values
    const updatedItem = {
        item: TodoValue.value,
        status: todo[updateIndex].status,
        priority: priority,
        dueDate: dueDate
    };

    todo[updateIndex] = updatedItem; // Update the todo array at the correct index
    setLocalStorage(); // Save to localStorage

    // Refresh the list
    ReadToDoItems();

    // Reset the form and button
    AddUpdate.setAttribute("onclick", "CreateToDoItems()");
    AddUpdate.setAttribute("src", "images/plus.png");

    TodoValue.value = "";
    document.querySelector("#priority-select").value = "medium";
    document.querySelector("#due-date").value = "";

    setAlertMessage("Todo item updated successfully!");
}

function DeleteTodoItems(e, index) {
    if (confirm(`Are you sure you want to delete this item: ${todo[index].item}?`)) {
        todo.splice(index, 1); // Remove the task from the array
        setLocalStorage(); // Update localStorage

        // Remove the item from the UI after a short delay
        e.parentElement.parentElement.remove();

        setAlertMessage("Todo item deleted successfully!");
    }
}

function CompletedToDoItems(e) {
    const todoText = e.parentElement.querySelector(".todo-item-text").innerText.trim();

    if (e.parentElement.querySelector("div").style.textDecoration === "") {
        // Mark as completed
        e.parentElement.querySelector("div").style.textDecoration = "line-through";
        const img = document.createElement("img");
        img.src = "images/check-mark.png";
        img.className = "todo-controls";
        e.parentElement.querySelector("div").appendChild(img);

        e.parentElement.querySelector("img.edit").remove();

        // Update the status of the task in the todo array
        const index = todo.findIndex(item => item.item === todoText);
        if (index !== -1) {
            todo[index].status = true;
        }

        setLocalStorage(); // Update localStorage
        setTimeout(() => {
            setAlertMessage("Todo item completed successfully!");
        }, 1000);
    }
}

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
        todoAlert.classList.add("toggleMe");
    }, 1000);
}
