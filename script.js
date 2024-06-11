const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks-list');

let tasks = []; 

// Função para adicionar uma nova tarefa à lista
function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    tasks.push({
      text: taskText,
      completed: false
    });
    renderTasks();
    newTaskInput.value = ""; // Limpa o campo de entrada
  }
}

// Função para renderizar as tarefas na lista
function renderTasks() {
  tasksList.innerHTML = ""; // Limpa a lista antes de renderizar

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = task.text;
    if (task.completed) {
      taskTextElement.classList.add('completed');
    }

    const actions = document.createElement('div');
    actions.classList.add('actions');

    // Cria os botões e adiciona como filhos da div "actions"
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.innerHTML = '<i class="bi bi-pencil"></i>'; 
    editButton.onclick = () => editTask(index); // Chama a função ao clicar

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; 
    deleteButton.onclick = () => deleteTask(index);

    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button');
    completeButton.innerHTML = '<i class="bi bi-check"></i>'; 
    completeButton.onclick = () => toggleComplete(index);

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    actions.appendChild(completeButton);

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(actions);
    tasksList.appendChild(taskItem);
  });
}

// Função para editar uma tarefa
function editTask(index) {
  const currentTask = tasks[index];
  const newTaskText = prompt('Edite a tarefa:', currentTask.text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText;
    renderTasks();
  }
}

// Função para excluir uma tarefa
function deleteTask(index) {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Função para marcar/desmarcar uma tarefa como concluída
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Adiciona um ouvinte de evento ao botão "Adicionar"
addTaskButton.addEventListener('click', addTask);

// Carrega tarefas salvas no localStorage (opcional)
const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  renderTasks();
}

// Salva tarefas no localStorage (opcional)
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Salva as tarefas sempre que uma alteração é feita
renderTasks();
tasks.forEach((task, index) => {
  // Adiciona um ouvinte de evento a cada botão 'Marcar/Desmarcar'
  // para salvar as alterações no localStorage
  const completeButton = tasksList.children[index].querySelector('.complete-button');
  completeButton.addEventListener('click', saveTasks);
  // Adiciona um ouvinte de evento a cada botão 'Editar'
  // para salvar as alterações no localStorage
  const editButton = tasksList.children[index].querySelector('.edit-button');
  editButton.addEventListener('click', saveTasks);
  // Adiciona um ouvinte de evento a cada botão 'Excluir'
  // para salvar as alterações no localStorage
  const deleteButton = tasksList.children[index].querySelector('.delete-button');
  deleteButton.addEventListener('click', saveTasks);
});