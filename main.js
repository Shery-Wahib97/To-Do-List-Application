
// Buttons Actions
let actionButtons = document.querySelectorAll('.btn');
let currentBtn = null;
actionButtons.forEach(btn => {
    btn.addEventListener("click", function (event) {
        event.stopPropagation();
        if (currentBtn) {
            currentBtn.classList.remove("clicked");
            // console.log(typeof currentBtn);
        }
        this.classList.add("clicked");
        currentBtn = this;
    })
});
document.addEventListener("click", function () {
    if (currentBtn) {
        currentBtn.classList.remove("clicked");
        currentBtn = null;
    }
})
//////////////////////////////////////////////////////////////////////

// create tasks
let inputVAlue = document.getElementById("inputValue");
let saveTask = document.getElementById("saveTasks");
let allTasks = document.getElementById("allTasks")
let progress = "In Progress";
let arrOfTasks = JSON.parse(localStorage.getItem("task")) || []; //new

function renderTasks() {
    allTasks.innerHTML = "";
    arrOfTasks.forEach((task, index) => {
        let taskElement = document.createElement("div");
        taskElement.className = "indexTask";
        taskElement.innerHTML = `
            <li class="rowTasks" data-id="${task.id}">
                <ul class="nestedList">
                    <li class="itemName">${task.title}</li>
                    <li class="status">${task.status}</li>
                    <li class="Actions">
                        <button class="btn edit" onclick="editTask(${index})">Edit</button>
                        <button class="btn delete" onclick="deleteTask(${index})">Delete</button>
                        <button class="btn done" onclick="doneTask(${index})">Done</button>
                    </li>
                </ul>
            </li>
            <hr>
        `;
        allTasks.appendChild(taskElement);
    })
}
saveTask.addEventListener("click", function () {
    if (inputVAlue.value.trim() === "") {
        alert("Please Enter Your Task");
        return
    } else {
        let taskObj = {
            id: Date.now(),
            title: inputVAlue.value.trim(),
            status: progress,
        };
        arrOfTasks.push(taskObj);
        localStorage.setItem("task", JSON.stringify(arrOfTasks));
        inputVAlue.value = "";
        renderTasks();
    };
});
function editTask(index) {
    let EditingTask = prompt("Esit Your Task Title:", arrOfTasks[index].title);
    if (EditingTask !== null && EditingTask.trim() !== "") {
        arrOfTasks[index].title = EditingTask.trim();
        localStorage.setItem("task", JSON.stringify(arrOfTasks));
        const taskElement = allTasks.querySelectorAll(".rowTasks")[index];
        const itemName = taskElement.querySelector(".itemName");
        itemName.textContent = EditingTask.trim();
    }
};
function deleteTask(index) {
    arrOfTasks.splice(index, 1);
    localStorage.setItem("task", JSON.stringify(arrOfTasks));
    renderTasks();
}
function doneTask(index) {
    arrOfTasks[index].status = "Done";
    localStorage.setItem("task", JSON.stringify(arrOfTasks));
    renderTasks();
}
renderTasks();