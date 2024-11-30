document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  

    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.innerHTML = '';
      tasks.forEach((task, index) => addTaskToDOM(task, index));
    };
  
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
          text: taskItem.querySelector('.task-text').textContent,
          completed: taskItem.classList.contains('completed'),
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const addTaskToDOM = (task, index) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.dataset.index = index;
      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div>
          <input type="checkbox" class="mark-completed" ${task.completed ? 'checked' : ''}>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `;
  

      li.querySelector('.mark-completed').addEventListener('change', () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const currentIndex = parseInt(li.dataset.index, 10);
        tasks[currentIndex].completed = li.classList.toggle('completed');
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
  

      li.querySelector('.edit').addEventListener('click', () => {
        const newText = prompt('Edit task:', task.text);
        if (newText) {
          const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          const currentIndex = parseInt(li.dataset.index, 10);
          tasks[currentIndex].text = newText;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          loadTasks();
        }
      });
  
      li.querySelector('.delete').addEventListener('click', () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const currentIndex = parseInt(li.dataset.index, 10);
        tasks.splice(currentIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(); 
      });
  
      taskList.appendChild(li);
    };
  
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (!taskText) {
        alert('Task cannot be empty!');
        return;
      }
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const newTask = { text: taskText, completed: false };
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
      taskInput.value = '';
    });
  
    loadTasks();
  });