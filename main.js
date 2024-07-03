let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="task task-done">
                <div>${taskList[i].taskContent}</div>
                <div class="task-actions">
                    <button class="uncheck" onclick="toggleComplete('${taskList[i].id}')">↩</button>
                    <button class="delete" onclick="deleteTask('${taskList[i].id}')">🗑️</button>
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div>${taskList[i].taskContent}</div>
                <div class="task-actions">
                    <button class="check" onclick="toggleComplete('${taskList[i].id}')">✔</button>
                    <button class="delete" onclick="deleteTask('${taskList[i].id}')">🗑️</button>
                </div>
            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function randomIDGenerate() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

