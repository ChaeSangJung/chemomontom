const TODO_DATA = {
  PENDING: JSON.parse(localStorage.getItem("PENDING")) || [],
  FINISHED: JSON.parse(localStorage.getItem("FINISHED")) || []
};
const todoInput = document.querySelector("input[name=todoInput]");
const pendingList = document.querySelector(".pending_list");
const finishedList = document.querySelector(".finished_list");

function createTodoElement(text) {
  return { id: Date.now(), text: text };
}

function setLocalStorage(name, item = null) {
  item && TODO_DATA[name].push(item);
  localStorage.setItem(name, JSON.stringify(TODO_DATA[name]));
}

function onRemoveList(id, name) {
  TODO_DATA[name] = TODO_DATA[name].filter((item) => item.id !== id);
  setLocalStorage(name);
}

function moveTask(element, name) {
  const moveItem = {
    id: element.id,
    text: element.firstChild.innerText
  };

  setLocalStorage(name, moveItem);

  if (name === "FINISHED") {
    pendingList.removeChild(element);
    finishedList.appendChild(createTodoList(moveItem, false));
  } else if (name === "PENDING") {
    finishedList.removeChild(element);
    pendingList.appendChild(createTodoList(moveItem, true));
  }
}

function createTodoList(text, isPending = true) {
  const todoList = document.createElement("li");
  const listText = document.createElement("span");
  const DelBtn = document.createElement("button");
  const moveBtn = document.createElement("button");

  DelBtn.innerText = "❌";
  moveBtn.innerText = isPending ? "✅" : "🔙";
  listText.innerText = text.text;

  DelBtn.addEventListener("click", () => {
    onRemoveList(text.id, isPending ? "PENDING" : "FINISHED");
    isPending
      ? pendingList.removeChild(todoList)
      : finishedList.removeChild(todoList);
  });

  moveBtn.addEventListener("click", () => {
    onRemoveList(text.id, isPending ? "PENDING" : "FINISHED");
    moveTask(todoList, isPending ? "FINISHED" : "PENDING");
  });

  todoList.id = text.id;
  todoList.appendChild(listText);
  todoList.appendChild(DelBtn);
  todoList.appendChild(moveBtn);

  return todoList;
}

function onEnterInput(event) {
  if (event.key === "Enter" && event.keyCode === 13) {
    const newItem = createTodoElement(event.target.value);
    setLocalStorage("PENDING", newItem);
    const todoElement = createTodoList(newItem);

    pendingList.appendChild(todoElement);
    todoInput.value = "";
  }
}

function init() {
  todoInput.addEventListener("keyup", onEnterInput);

  TODO_DATA["PENDING"].map((item) => {
    const pendingElement = createTodoList(item, true);
    pendingList.appendChild(pendingElement);
  });
  TODO_DATA["FINISHED"].map((item) => {
    const fisnishedElement = createTodoList(item, false);
    finishedList.appendChild(fisnishedElement);
  });
}

init();

// const toDoForm = document.querySelector(".js-toDoForm"),
//   toDoInput = toDoForm.querySelector("input"),
//   toDoList = document.querySelector(".js-toDoList");

// const TODOS_LS = "toDos";

// let toDos = [];

// function deleteToDo(event) {
//   const btn = event.target;
//   const li = btn.parentNode;
//   toDoList.removeChild(li);
//   const cleanToDos = toDos.filter(function(toDo) {
//     return toDo.id !== parseInt(li.id);
//   });
//   toDos = cleanToDos;
//   saveToDos();
// }

// function saveToDos() {
//   localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
// }

// function paintToDo(text) {
//   const li = document.createElement("li");
//   const delBtn = document.createElement("button");
//   const span = document.createElement("span");
//   const newId = toDos.length + 1;
//   delBtn.innerText = "❌";
//   delBtn.addEventListener("click", deleteToDo);
//   span.innerText = text;
//   li.appendChild(delBtn);
//   li.appendChild(span);
//   li.id = newId;
//   toDoList.appendChild(li);
//   const toDoObj = {
//     text: text,
//     id: newId
//   };
//   toDos.push(toDoObj);
//   saveToDos();
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   const currentValue = toDoInput.value;
//   paintToDo(currentValue);
//   toDoInput.value = "";
// }

// function loadToDos() {
//   const loadedToDos = localStorage.getItem(TODOS_LS);
//   if (loadedToDos !== null) {
//     const parsedToDos = JSON.parse(loadedToDos);
//     parsedToDos.forEach(function(toDo) {
//       paintToDo(toDo.text);
//     });
//   }
// }

// function init() {
//   loadToDos();
//   toDoForm.addEventListener("submit", handleSubmit);
// }

// init();
