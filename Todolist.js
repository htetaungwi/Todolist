const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  input.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${text}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;

  taskList.appendChild(li);
}

function deleteTask(btn) {
  const li = btn.parentElement;
  removeTask(li.innerText.replace("❌", "").trim());
  li.remove();
}

function toggleComplete(span) {
  span.classList.toggle("completed");
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; ;
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; ;
  tasks.forEach(task => createTaskElement(task));
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks))
};