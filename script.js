const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo}</span>
            <div>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = todoInput.value.trim();
    if (newTodo) {
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    } else if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        const newTodo = prompt('Edit your task:', todos[index]);
        if (newTodo !== null) {
            todos[index] = newTodo.trim();
            saveTodos();
            renderTodos();
        }
    }
});

renderTodos();