// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks)

// Add new task when the user clicks the add task button
function addTask() {
  const taskInput = document.getElementById('taskInput')
  const taskText = taskInput.value.trim()

  if (taskText !== '') {
    const randomColor = getRandomColor()
    const listItem = document.createElement('li')
    listItem.innerHTML = `
    <span class="${randomColor} mr-1 select-none cursor-pointer" onclick="toggleTask(this)">${taskText}</span>
      <button class="text-rose-500 hover:text-rose-400 active:scale-90" onclick="deleteTask(this.parentNode)"><i class="fa-solid fa-x align-[-1px] scale-75"></i></button>
    `

    const taskList = document.getElementById('taskList')
    taskList.appendChild(listItem)

    saveTasks()

    taskInput.value = ''
  }
}

// Add new task when the user presses enter while typing in the input field
document.getElementById('taskInput').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTask()
  }
})

// Toggle task (strike through or not)
function toggleTask(taskElement) {
  taskElement.classList.toggle('line-through')
  taskElement.classList.toggle('gray-text')
  saveTasks()
}

// Delete task
function deleteTask(taskElement) {
  const taskList = document.getElementById('taskList')
  taskList.removeChild(taskElement)

  saveTasks()
}

// Get random Tailwind color for task
function getRandomColor() {
  const colors = [
    'text-amber-400',
    'text-lime-400',
    'text-emerald-400',
    'text-teal-400',
    'text-sky-400',
    'text-purple-400',
    'text-fuchsia-400',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

// Save tasks to local storage
function saveTasks() {
  const taskList = document.getElementById('taskList').innerHTML
  localStorage.setItem('tasks', taskList)
}

// Load tasks from local storage
function loadTasks() {
  const tasks = localStorage.getItem('tasks')
  if (tasks) {
    document.getElementById('taskList').innerHTML = tasks
  }
}

// Delete all tasks
function deleteAllTasks() {
  const taskList = document.getElementById('taskList')
  taskList.innerHTML = ''
  localStorage.removeItem('tasks')
}
