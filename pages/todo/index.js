const taskKey = '@tasks';

let selectedTaskId = null;

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página

  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');

  li.id = `id-${taskId}`;
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <button title="Editar tarefa" onClick="openEditDialog(${taskId})">✏️</button>
    <button title="Excluir tarefa" onClick="deleteTask(${taskId})">❌</button>
  `;

  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

// Função para editar tarefa
function editTask(event) {
  event.preventDefault(); // Evita o recarregamento da página

  const form = document.querySelector('#editTaskForm');
  const formData = new FormData(form);

  const editedTitle = formData.get('title');
  const editedDescription = formData.get('description');

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks[selectedTaskId].title = editedTitle;
  tasks[selectedTaskId].description = editedDescription;

  localStorage.setItem(taskKey, JSON.stringify(tasks));


  updateTaskList(tasks);

  
  closeDialog();
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  selectedTaskId = tasks.findIndex((task) => task.id === taskId);
  const task = tasks[selectedTaskId];

  const dialog = document.querySelector('dialog');

  const editTitle = document.querySelector('#editTaskForm #title');
  const editDescription = document.querySelector('#editTaskForm #description');

  editTitle.value = task.title;
  editDescription.value = task.description;

  dialog.showModal();
}

function closeDialog() {
  const dialog = document.querySelector('dialog');
  dialog.close();
}


function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem(taskKey, JSON.stringify(updatedTasks));
  updateTaskList(updatedTasks);
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  updateTaskList(tasks);
});

// Função para atualizar a visualização da lista de tarefas
function updateTaskList(tasks) {
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <button title="Editar tarefa" onClick="openEditDialog(${task.id})">✏️</button>
        <button title="Excluir tarefa" onClick="deleteTask(${task.id})">❌</button>
      </li>
    `
    )
    .join('');
}
