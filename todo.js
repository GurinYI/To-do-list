let taskField = document.querySelector(".task-field");
let buttonAddTask = document.querySelector(".add-task");
let taskList = document.querySelector(".task-list");
let buttonClear = document.querySelector(".buttonClear");
let taskDoneButton = document.querySelector(".task-done-button");
let taskNumber = 0;
let local = localStorage.getItem('tasks');
let allTasks = [];


if (local !== null ) {
  allTasks.forEach((t)=>{
    if (t.id >= taskNumber){
      taskNumber = t.id +1;
    }
  })
  allTasks = JSON.parse(local);

}
renderTasks(allTasks);
function createTask(taskText, taskCheck, taskNumber){
  const task = allTasks.find((t)=>t.id ===taskNumber);
  let newToDo = document.createElement("li");
  let textContainer = document.createElement("p");
  newToDo.classList.add("task");

  if (taskCheck === true){
    newToDo.classList.add('task-done')
  }
  textContainer.classList.add("task-text");
  if (taskCheck === true){
    textContainer.classList.add('task-done');
  }
  newToDo.append(textContainer);
  textContainer.textContent = taskText;
  taskField.value = "";
  // taskList.append(newToDo);

  let taskDoneButton = document.createElement("button");
  taskDoneButton.classList.add("task-done-button");
  taskDoneButton.textContent = "Done";
  newToDo.append(taskDoneButton);

  taskDoneButton.onclick = function () {

    task.checked = !task.checked;
    renderTasks(allTasks);
    // textContainer.classList.toggle("task-done");
    // newToDo.classList.toggle("task-done");
    //


  };

  let taskDeleteButton = document.createElement("button");
  taskDeleteButton.classList.add("task-delete-button");
  taskDeleteButton.textContent = "Delete";
  newToDo.append(taskDeleteButton);

  taskDeleteButton.onclick = function () {
    allTasks=allTasks.filter((t)=>t.id !== taskNumber);
    renderTasks(allTasks);

  };

  let taskChangeButton = document.createElement("button");
  taskChangeButton.classList.add("task-change-button");
  taskChangeButton.textContent = "Change";
  newToDo.append(taskChangeButton);

  taskChangeButton.onclick = function () {

    let changes = document.createElement("input");


    changes.classList.add("task-text");
    changes.value = textContainer.textContent;
    newToDo.append(changes);
    changes.focus();
    let changesDoneButton = document.createElement("button");
    changesDoneButton.classList.add("changes-done-button");
    changesDoneButton.textContent = "Ready";
    taskChangeButton.disabled = true;
    taskDeleteButton.disabled = true;
    taskDoneButton.disabled = true;
    buttonClear.disabled = true;

    newToDo.append(changesDoneButton);
    buttonAddTask.disabled = true;

    document.addEventListener("keyup", function (event) {
      if (event.code === "Enter" || event.code ==="NumpadEnter") {
        changesDoneButton.click();
      }
    });


    changesDoneButton.onclick = function () {
      task.text = changes.value;
      renderTasks(allTasks);
      textContainer.textContent = changes.value;
      changes.remove();
      changesDoneButton.remove();
      taskChangeButton.disabled = false;
      taskDeleteButton.disabled = false;
      taskDoneButton.disabled = false;
      buttonAddTask.disabled = false;
      buttonClear.disabled = false;
    };
  };
return newToDo;
}


function renderTasks(tasks){
  localStorage.setItem("tasks", JSON.stringify(tasks))
  taskList.innerHTML ='';
  tasks.forEach(t =>{
    const taskHTML = createTask(t.text, t.checked, t.id);
    taskList.append(taskHTML);
  })
}

buttonAddTask.onclick = function () {
  taskNumber++;
  let taskText = taskField.value;
  if (taskText !== "") {
    allTasks.push({text:taskText, checked:false, id:taskNumber});
    renderTasks(allTasks);
  }
};


  document.addEventListener("keyup", function (event) {
    if (event.code === "Enter" || event.code ==="NumpadEnter") {
      buttonAddTask.click();
    }
  });


buttonClear.onclick = function () {
  allTasks = allTasks.filter((t)=>t.checked === false);
  renderTasks(allTasks);
};

