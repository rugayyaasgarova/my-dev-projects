const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const sortBtn = document.querySelector(".sort-btn");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const taskList = document.querySelector(".task-list");
const errorMessage = document.querySelector(".error-message");

let tasks = [];

function showTasks() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      showTasks();
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
    }

    const actionsBtn = document.createElement("div");
    actionsBtn.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      const newText = prompt("New text:", task.text);
      if (newText) {
        task.text = newText.trim();
        showTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks.splice(i, 1);
      showTasks();
    });
    actionsBtn.appendChild(editBtn);
    actionsBtn.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(actionsBtn);
    taskList.appendChild(li);
  }
}

addBtn.addEventListener("click", function () {
  const text = todoInput.value.trim();
  if (text === "") {
    errorMessage.classList.add("error-visible");
    return;
  }
  errorMessage.classList.remove("error-visible");

  const newTask = {
    text: text,
    completed: false,
  };
  tasks.push(newTask);
  todoInput.value = "";
  showTasks();
});

deleteAllBtn.addEventListener("click", function () {
  tasks = [];
  showTasks();
});

sortBtn.addEventListener("click", function () {
  tasks.sort(function (a, b) {
    return a.text.localeCompare(b.text);
  });
  showTasks();
});