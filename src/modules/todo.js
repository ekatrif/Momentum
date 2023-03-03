let todoList = [];
const container = document.querySelector(".footer__right");
const todoContainer = document.querySelector(".todo__container");


//При загрузке страницы копируем в массив сохраненное в Localstorage
window.addEventListener('load', getLocalStorage);
//Перед перезагрузкой страницы сохраняем данные из массива todoLst
window.addEventListener('beforeunload', setLocalStorage);

container.innerHTML = `<div class="todo">ToDo</div>`;

container.addEventListener("click", showList);

window.addEventListener("click", closeMenu);

function closeMenu(e) {
    // если этот элемент или его родительские элементы не меню и не кнопка
    if (container.classList.contains("footer__right-active") &&  !e.target.closest('.footer__right') &&  !e.target.closest('.todo__container') &&  !e.target.closest('.todo__list') && !e.target.closest('.todo__item') && !e.target.classList.contains("todo__button"))  {
        todoContainer.classList.remove("todo__container-active");
        container.classList.remove("footer__right-active");
    }
}


function getLocalStorage() {
    if (localStorage.getItem('todo list')) {
        todoList = JSON.parse(localStorage.getItem('todo list'));
    }
}

function setLocalStorage() {
    localStorage.setItem('todo list', JSON.stringify(todoList));
}



function showList() {
    if (document.querySelector(".todo__wrapper")) {
        document.querySelector(".todo__wrapper").remove();
    }
    const wrapper = document.createElement("div");
    wrapper.classList.add("todo__wrapper");
    todoContainer.append(wrapper);
    todoContainer.classList.toggle("todo__container-active")
    container.classList.toggle("footer__right-active");
    showButton();
    
}

function showButton() {
    if (!todoList.length) {
        const wrapper = document.querySelector(".todo__wrapper");
        wrapper.innerHTML = ``;
        const message = document.createElement("div");
        message.classList.add("todo__default-message");
        message.textContent = "Add a todo to get started";
        const button = document.createElement("a");
        button.classList.add("todo__button");
        button.innerText = "New ToDo";
        wrapper.append(message,button);
        button.addEventListener("click", addTodo);
    } else {
        renderItems();
    }
}

function addTodo() {
    deleteButton();
    renderInput();
}

function deleteButton() {
    const addButton = document.querySelector(".todo__button");
    addButton.remove();
}

function renderInput() {
    const input = document.createElement("input");
    input.classList.add("todo__input");
    input.setAttribute("placeholder", "New ToDo")
    const wrapper = document.querySelector(".todo__wrapper");
    wrapper.append(input);
    input.addEventListener("change", saveToDo)
}

function saveToDo() {
    const input = document.querySelector(".todo__input");
    todoList.push({
        value:input.value,
        status:"active"
    });
    renderItems();
}

function renderItems() {
    const wrapper = document.querySelector(".todo__wrapper");
        const ul = document.createElement("ul");
        ul.classList.add("todo__list");
        wrapper.innerHTML = "";
        wrapper.append(ul);
        todoList.forEach(todo=>{
            const li = document.createElement("li");
            li.classList.add("todo__item");
            if (todo.status === "deleted") {
                li.classList.add("todo__item-deleted");
            }
            li.textContent = todo.value;
            const dots = document.createElement("div");
            dots.classList.add("todo__dots");
            li.append(dots);
            ul.append(li);
        })
        const todos = document.querySelector(".todo__list");
        todos.addEventListener("click", changeTodo);
        renderInput();
}

function changeTodo(e) {
    toggleTodo(e);
    deleteTodo(e);
}

function toggleTodo(e) {
    if (e.target.classList.contains("todo__item")) {
        e.target.classList.toggle("todo__item-deleted");
        todoList.forEach(todo=>{
            if (e.target.innerText === todo.value && e.target.classList.contains("todo__item-deleted")) {
                todo.status = "deleted"
            } else if (e.target.innerText === todo.value && !e.target.classList.contains("todo__item-deleted")) {
                todo.status = "active"
            }
        })
    }
}

function deleteTodo(e) {
    if (e.target.classList.contains("todo__dots")) {
        todoList.forEach((todo,index) => {
            if (e.target.closest(".todo__item").innerText === todo.value) {
                e.target.closest(".todo__item").remove();
                todoList.splice(index,1);
            }
        })
    }
    showButton();
}

function hideShowTodo() {
    const activeItems = localStorage.getItem("Hide/Show widgets");
    if (!activeItems.includes("todolist")) {
        container.classList.add("hide")
    } else {
        container.classList.remove("hide") 
    }
}

export {hideShowTodo};