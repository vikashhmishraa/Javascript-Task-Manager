let priorityColorBar = document.querySelector(".priorityColorBar");
let allBtn = document.querySelector(".allBtn");
let addBtn = document.querySelector(".addBtn");
let dltBtn = document.querySelector(".dltBtn");
let searchInput = document.querySelector(".searchInput");
let searchBtn = document.querySelector(".searchBtn");
let ticketAdder = document.querySelector(".taskAdder");
let ticketPriorityBox = document.querySelector(".ticketPriority");
let ticketContainer = document.querySelector(".ticketContainer");
let allBoxes = document.querySelectorAll(".ticketPriority .box");
let textPart = document.querySelector(".textPart");

let taskColor = "red";
let taskArray = [];

let oldData = localStorage.getItem("TaskManager");

if (oldData) {
  taskArray = [...JSON.parse(oldData)];
  ticketAdderFn(taskArray);
}
let activateDelete = false;

let colorsArray = ["red", "green", "blue", "yellow"];

dltBtn.addEventListener("click", function () {
  activateDelete = !activateDelete;
  dltBtn.classList.toggle("red");
});

addBtn.addEventListener("click", function () {
  ticketAdder.classList.toggle("noDisplay");
});

ticketPriorityBox.addEventListener("click", function (event) {
  let clickedBox = event.target;

  if (clickedBox.classList[0] == "box") {
    allBoxes.forEach(function (box) {
      box.classList.remove("border");
    });

    taskColor = clickedBox.classList[1];

    clickedBox.classList.add("border");
  }
});

textPart.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    let taskObject = {
      id: Date.now(),
      task: textPart.value,
      color: taskColor,
    };
    // console.log(taskObject);

    taskArray.push(taskObject);
    localStorage.setItem("TaskManager", JSON.stringify(taskArray));
    // console.log(taskArray);
    textPart.value = "";
    ticketAdder.classList.toggle("noDisplay");

    ticketAdderFn(taskArray);
  }
});

// console.log(taskArray);

function ticketAdderFn(arr) {
  ticketContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let ticket = document.createElement("div");
    ticket.classList.add("ticket");

    let { id, task, color } = arr[i];
    ticket.innerHTML = `<div class="taskColor ${color}"></div>
        <div class="taskText">
          <p class="editTask">${task}</p>
          <span class="lock"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="currentColor"
            >
              <path
                d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"
              ></path></svg
          ></span>
        </div>`;

    ticketContainer.appendChild(ticket);

    // Lock and Unlock Function

    let lockBtn = ticket.querySelector(".lock");
    let editTask = ticket.querySelector(".editTask");

    let lock = true;

    lockBtn.addEventListener("click", function () {
      if (lock == true) {
        // Unlock

        editTask.setAttribute("contenteditable", "true");

        lockBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path></svg>`;
      } else {
        // lock
        editTask.setAttribute("contenteditable", "false");

        let updatedTask = editTask.innerHTML;

        arr[i].task = updatedTask;

        localStorage.setItem("TaskManager", JSON.stringify(taskArray));

        lockBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>`;
      }

      lock = !lock;

      console.log(taskArray);
    });

    // Delete Functionality
    ticket.addEventListener("dblclick", function () {
      if (activateDelete == true) {
        // Delete from UI
        ticketContainer.removeChild(ticket);
        console.log(taskArray);

        // Delete from Task Arrey

        let filteredArray = taskArray.filter(function (taskObject) {
          return taskObject.id != id;
        });
        taskArray = [...filteredArray];

        localStorage.setItem("TaskManager", JSON.stringify(taskArray));
        console.log(taskArray);
      }
    });

    // Change Color Strip Functionality
    let colorStrip = ticket.querySelector(".taskColor");

    colorStrip.addEventListener("click", function () {
      let prevColor = arr[i].color;
      console.log(prevColor);
      let prevColorIndx = colorsArray.findIndex(function (color) {
        return color == prevColor;
      });
      let NextColorIndx = (prevColorIndx + 1) % 4;
      console.log("-->", NextColorIndx);

      // Update Color on UI Part
      colorStrip.classList.remove(prevColor);
      colorStrip.classList.add(colorsArray[NextColorIndx]);

      // Update on Array
      arr[i].color = colorsArray[NextColorIndx];
      localStorage.setItem("TaskManager", JSON.stringify(taskArray));

      // console.log(taskArray);
    });
  }
}

priorityColorBar.addEventListener("click", function (event) {
  let clickedEle = event.target;

  if (clickedEle.classList[0] == "box") {
    let color = clickedEle.classList[1];

    let filteredArray = taskArray.filter(function (taskObject) {
      return taskObject.color == color;
    });
    ticketAdderFn(filteredArray);
  }
});

allBtn.addEventListener("click", function () {
  ticketAdderFn(taskArray);
});

searchBtn.addEventListener("click", function () {
  let searchQuery = searchInput.value;
  searchInput.value = "";
  let filteredSearchArray = taskArray.filter(function (taskObject) {
    return taskObject.task.toLowerCase().includes(searchQuery.toLowerCase());
  });
  ticketAdderFn(filteredSearchArray);
});
