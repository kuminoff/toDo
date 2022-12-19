`use strict`;

const todoCompleted = document.querySelector(`.todo-completed`);
const todoList = document.querySelector(`.todo-list`);
const headerInput = document.querySelector(`.header-input`);
const todoControl = document.querySelector(`.todo-control`);
const toDoData = JSON.parse(localStorage.getItem(`toDoData`))
  ? JSON.parse(localStorage.getItem(`toDoData`))
  : [];

const render = function () {
  todoList.innerHTML = ``;
  todoCompleted.innerHTML = ``;
  toDoData.forEach(function (item, index) {
    const li = document.createElement(`li`);
    li.classList.add(`todo-item`);
    li.innerHTML = `<span class="text-todo">${item.text}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;
    if (!item.completed) {
      todoList.append(li);
    } else {
      todoCompleted.append(li);
    }

    li.querySelector(`.todo-remove`).addEventListener(`click`, function () {
      toDoData.splice(index, 1);
      render();
    });

    li.querySelector(`.todo-complete`).addEventListener(`click`, function () {
      item.completed = !item.completed;
      render();
    });
  });
  localStorage.setItem(`toDoData`, JSON.stringify(toDoData));
};

todoControl.addEventListener(`submit`, function (event) {
  event.preventDefault();

  if (headerInput.value.trim() === ``) {
    return alert(`Введите дело`);
  }

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  toDoData.push(newToDo);
  headerInput.value = ``;

  render();
});

if (toDoData !== []) render();
