let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let deleteAllButton = document.getElementById("delete-all-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underline = document.getElementById("under-line");

addButton.addEventListener("click", addTask);
deleteAllButton.addEventListener("click", deleteAllTasks);

taskInput.addEventListener("keypress", function(event) { 
    if (event.key === "Enter") {
        addTask();
    }
});

for (let i = 0; i < tabs.length; i++) { 
    tabs[i].addEventListener("click", function(event) {
        filter(event);
        setActiveTab(event.target);
    });
    tabs[i].addEventListener("keydown", function(event) { 
        handleTabKeyPress(event, i);
    });
}

function addTask() {
    let taskContent = taskInput.value.trim();
    if (taskContent === "") {
        alert("할 일을 입력해라");
        return;
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskContent,
        isComplete: false,
    };
    taskList.push(task);
    taskInput.value = "";
    render();
}

function render() {
    let list = [];
    if (mode === "all") {
        list = taskList;
    } else if (mode === "ongoing" || mode === "done") {
        list = filterList;
    }

    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `<div class="task task-done">
                <article>${list[i].taskContent}</article>
                <div class="task-actions">
                    <button class="uncheck" onclick="toggleComplete('${list[i].id}')">↩</button>
                    <button class="delete" onclick="deleteTask('${list[i].id}')">🗑️</button>
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <article>${list[i].taskContent}</article>
                <div class="task-actions">
                    <button class="check" onclick="toggleComplete('${list[i].id}')">✔</button>
                    <button class="delete" onclick="deleteTask('${list[i].id}')">🗑️</button>
                </div>
            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function deleteAllTasks(){
    taskList = [];
    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];
    if (mode === "all") {
        render();
    } else if (mode === "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (!taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function setActiveTab(activeTab) {
    underline.style.left = activeTab.offsetLeft + "px";
    underline.style.width = activeTab.offsetWidth + "px";
}

function handleTabKeyPress(event, index) {
    if (event.key === "Tab") {
        event.preventDefault();
        const nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
    }
}

function randomIDGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

function updateUnderline() {
    let underLine = document.getElementById("under-line");
    if (mode === "all") {
        underLine.style.left = "0px";
    } else if (mode === "ongoing") {
        underLine.style.left = "calc(33.33% - 40px)";
    } else if (mode === "done") {
        underLine.style.left = "calc(66.66% - 80px)";
    }
}