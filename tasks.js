import readline from 'readline';

const tasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTask(indicator, description) {
  tasks.push({ indicator, description, completed: false });
  console.log(`Tarea añadida: ${description}`);
}

function deleteTask(indicator) {
  const taskIndex = tasks.findIndex(task => task.indicator === indicator);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    console.log(`Tarea eliminada: ${indicator}`);
  } else {
    console.log(`No se encontró la tarea con el indicador: ${indicator}`);
  }
}

function completeTask(indicator) {
  const task = tasks.find(task => task.indicator === indicator);
  if (task) {
    task.completed = true;
    console.log(`Tarea completada: ${indicator}`);
  } else {
    console.log(`No se encontró la tarea con el indicador: ${indicator}`);
  }
}

function showTasks() {
  console.log('Lista de tareas:');
  tasks.forEach(task => {
    const status = task.completed ? 'Completada' : 'Pendiente';
    console.log(`[${task.indicator}] - ${task.description} (${status})`);
  });
}

rl.setPrompt('Opción (add/delete/complete/show/exit): ');
rl.prompt();

rl.on('line', line => {
  const input = line.trim().split(' ');
  const command = input[0];
  const args = input.slice(1);

  switch (command) {
    case 'add':
      addTask(args[0], args.slice(1).join(' '));
      break;
    case 'delete':
      deleteTask(args[0]);
      break;
    case 'complete':
      completeTask(args[0]);
      break;
    case 'show':
      showTasks();
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log('Comando no válido');
  }

  rl.prompt();
});

rl.on('close', () => {
  console.log('Adiós');
});
