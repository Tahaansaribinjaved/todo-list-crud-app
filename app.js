const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

// Filter buttons
const allTasksBtn = document.getElementById('all-tasks');
const completedTasksBtn = document.getElementById('completed-tasks');
const uncompletedTasksBtn = document.getElementById('uncompleted-tasks');

// Task array to store all tasks
let tasks = [];

// Add a new task
addTaskBtn.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  newTaskInput.value = '';
  renderTasks(tasks);
});

// Render the tasks on the page
function renderTasks(tasksToRender) {
  taskList.innerHTML = '';
console.log(tasksToRender);

  tasksToRender.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = `flex justify-between items-center p-2 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-gray-200'}`;
    
    taskItem.innerHTML = `
      <span class="${task.completed ? 'line-through' : ''}">${task.text}</span>
      <div class="space-x-2">
        <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
        <button class="complete-btn bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">${task.completed ? 'Unmark' : 'Complete'}</button>
        <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
      </div>
    `;

    // Edit task
    const editBtn = taskItem.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit your task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        task.text = newText;
        renderTasks(tasks);
      }
    });

    // Complete/uncomplete task
    const completeBtn = taskItem.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks(tasks);
    });

    // Delete task
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks(tasks);
    });

    taskList.appendChild(taskItem);
  });
}

// Filter tasks
allTasksBtn.addEventListener('click', () => renderTasks(tasks));
completedTasksBtn.addEventListener('click', () => renderTasks(tasks.filter(task => task.completed)));
uncompletedTasksBtn.addEventListener('click', () => renderTasks(tasks.filter(task => !task.completed)));

// Initial render
renderTasks(tasks);
