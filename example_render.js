const tasksFromStorage = localStorage.getItem('tasks');
const povarokTasks = tasksFromStorage ? JSON.parse(tasksFromStorage)  :[
  {name: 'task1', checked: true},
  {name: 'task2', checked: false}
]

function renderTasks(tasks) {
  console.log('renderTasks: ', [...tasks]);
  const container = document.getElementById('root')
  container.innerText = ''
  console.log(tasks);
  tasks.forEach(t => {
    const task = document.createElement('div')
    task.classList.add('task')
    const name = document.createElement('p')
    name.innerText = t.name;
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.checked = t.checked
    task.append(name)
    task.append(checkbox)
    container.append(task)
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

document.getElementById('addTask').addEventListener('click', ()=>{
  povarokTasks.push({name: 'task' + Math.round(Math.random()*10), checked: false })
  renderTasks(povarokTasks)
})


renderTasks(povarokTasks)

