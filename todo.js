let taskField = document.querySelector(".task-field");
let buttonAddTask = document.querySelector(".add-task");
let taskList = document.querySelector(".task-list");
let buttonClear = document.querySelector(".buttonClear");
let taskDoneButton = document.querySelector(".task-done-button");

buttonAddTask.onclick = function () {
  let taskText = taskField.value;
  if (taskText !== "") {
    let newToDo = document.createElement("li");
    let textContainer = document.createElement("p");
    newToDo.classList.add("task");
    textContainer.classList.add("task-text");
    newToDo.append(textContainer);
    textContainer.textContent = taskText;
    taskField.value = "";
    taskList.append(newToDo);

    let taskDoneButton = document.createElement("button");
    taskDoneButton.classList.add("task-done-button");
    taskDoneButton.textContent = "Done";
    newToDo.append(taskDoneButton);

    taskDoneButton.onclick = function () {
      textContainer.classList.toggle("task-done");
      newToDo.classList.toggle("task-done");
      if (newToDo.classList.contains("task-done")) {
        buttonClear.disabled = false;
      }
    };

    let taskDeleteButton = document.createElement("button");
    taskDeleteButton.classList.add("task-delete-button");
    taskDeleteButton.textContent = "Delete";
    newToDo.append(taskDeleteButton);

    taskDeleteButton.onclick = function () {
      newToDo.remove();
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
      let changesDoneButton = document.createElement("button");
      changesDoneButton.classList.add("changes-done-button");
      changesDoneButton.textContent = "Ready";
      taskChangeButton.disabled = true;
      taskDeleteButton.disabled = true;
      taskDoneButton.disabled = true;

      newToDo.append(changesDoneButton);

      changesDoneButton.onclick = function () {
        textContainer.textContent = changes.value;
        changes.remove();
        changesDoneButton.remove();
        taskChangeButton.disabled = false;
        taskDeleteButton.disabled = false;
        taskDoneButton.disabled = false;
      };
    };
  }
};
buttonClear.onclick = function () {
  let tasksDone = document.querySelectorAll(".task-done");

  for (taskDone of tasksDone) {
    taskDone.remove();
  }
};
