document.addEventListener('DOMContentLoaded', () => {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function createTaskElement(task) {
      var li = document.createElement('li');
      var taskTitle = document.createElement('h3');
      var taskDescriptionPara = document.createElement('p');
      taskTitle.textContent = task.title;
      taskDescriptionPara.textContent = task.description;
      li.appendChild(taskTitle);
      li.appendChild(taskDescriptionPara);
      return li;
    }
  
    var taskListElement = document.getElementById('task-list');
    storedTasks.forEach(function (task) {
      var taskElement = createTaskElement(task);
      taskListElement.appendChild(taskElement);
    });
  });
  
  document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
  
    var taskInput = document.getElementById('task-title');
    var taskDescription = document.getElementById('task-description');
    var inputValue = taskInput.value;
    var descriptionValue = taskDescription.value;
  
    if (inputValue.trim() === '' || descriptionValue.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    var taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.push({ title: inputValue, description: descriptionValue });
    localStorage.setItem('tasks', JSON.stringify(taskList));
  
    var li = document.createElement('li');
    var taskTitle = document.createElement('h3');
    var taskDescriptionPara = document.createElement('p');
    taskTitle.textContent = inputValue;
    taskDescriptionPara.textContent = descriptionValue;
    li.appendChild(taskTitle);
    li.appendChild(taskDescriptionPara);
    document.getElementById('task-list').appendChild(li);
  
    e.target.reset();
  });
  