const API_URL = "https://dummyjson.com/todos?limit=20";

export async function fetchandrendertodos() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const todos = data.todos;
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        todos.forEach((todo) => {
            const listItem = document.createElement("li");
            listItem.textContent = todo.todo;
            todoList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

fetchandrendertodos();

export function addNewTodo(todoText) {
    const todoList = document.getElementById("todo-list");
    const listItem = document.createElement("li");
    listItem.textContent = todoText;
    todoList.appendChild(listItem);
}

document.getElementById("add-todo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim();
    if (todoText) {
        addNewTodo(todoText);
        todoInput.value = "";
    }
});

export function clearTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
}
document.getElementById("clear-todos-button").addEventListener("click", function() {
    clearTodos();
});

export function filterTodos(keyword) {
    const todoList = document.getElementById("todo-list");
    const items = todoList.getElementsByTagName("li");
    for (let item of items) {
        if (item.textContent.toLowerCase().includes(keyword.toLowerCase())) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
}
document.getElementById("filter-todo-input").addEventListener("input", function(event) {
    const keyword = event.target.value;
    filterTodos(keyword);
});

document.getElementById("todo-list").addEventListener("click", function (e) {
  if (e.target && e.target.nodeName === "LI") {
    e.target.classList.toggle("checked");
  }
});
