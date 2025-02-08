function getCookies(name) {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return "";
}

function setCookies(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/;";
}

function loadTasks() {
    let ft_list = document.getElementById("ft_list");
    let tasks = getCookies("tasks");
    if (tasks) {
        let taskArray = tasks.split('|');
        taskArray.reverse().forEach(task => createTaskElement(task));
    }
}

function saveTasks() {
    let tasks = Array.from(document.querySelectorAll(".task")).map(task => task.textContent);
    setCookies("tasks", tasks.reverse().join('|'));
}

function createTaskElement(taskText) {
    let task = document.createElement("div");
    task.className = "task";
    task.textContent = taskText;
    task.onclick = function () {
        if (confirm("Do you want to remove this task?")) {
            task.remove();
            saveTasks();
        }
    };
    let ft_list = document.getElementById("ft_list");
    ft_list.prepend(task);
}

function addTask() {
    let taskText = prompt("Enter a new task:");
    if (taskText) {
        createTaskElement(taskText);
        saveTasks();
    }
}

window.onload = loadTasks;