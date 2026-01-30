
let allCategories = [];
let allTasks = [];

function createTask(task) {
    let isDone = (task.isDone) ? "checked" : "";
    let doneClass = (task.isDone) ? "done" : "";
    let taskHtml = `
            <li class="list-group-item ${doneClass}">
                <h5>${task.name}</h5>
                <p>${task.description}</p>
                <input id="taskCheckbox" type="checkbox" ${isDone} onchange="markTaskDone(${task.id}, this.checked)"> 
                <div>status: ${task.isDone ? "completed" : "in progress"}</div>
                <div class="actionsTd">
                <div id="deleteTask" onclick="deleteTask(${task.id})"><i class="fa-regular fa-trash-can fa-xl"></i></div>
                <div id="editTask" onclick="openEditTask(${task.id})"><i class="fa-regular fa-pen-to-square fa-xl"></i></div>
                </div>
                
                <div>category: ${allCategories[task.category_id]?.name || "No Category"}</div>
            </li>
        `;
    return taskHtml;

}

function createTasks(data) {
    const tasksContainer = document.getElementById("showTasks");
    if (!data || data.length === 0) {
        tasksContainer.innerHTML = "<p>No tasks available.</p>";
        return;
    }
    let tasksHTML = '<ul class="list-group">';
    data.forEach(task => {
        tasksHTML += createTask(task);
    });
    tasksHTML += '</ul>';
    tasksContainer.innerHTML = tasksHTML;
}
async function fetchTasks() {
    try {
        const response = await fetch('/tasks');
        if (!response.ok) {
            window.location.href = "/login";
            return;
        }
        const data = await response.json();
        allTasks = data;
        createTasks(data);
    } catch (err) {
        console.log(err);

    }
}

async function fetchCategories() {
    try {
        const response = await fetch('/categories');
        // if (!response.ok) {
        //     window.location.href = "/login";
        //     return;
        // }
        const data = await response.json();

        for (let category of data) {
            allCategories[category.id] = category;
        }

        selectCategoryOptions();
    } catch (err) {
        console.log(err);
    }
}
function selectCategoryOptions(tagID) {
    const select = document.getElementById(tagID || "selectCategories");
    let optionsHTML = select.innerHTML;
    optionsHTML = '<option value="0">none</option>';

    for (let category of allCategories) {
        if (category) {
            optionsHTML += `<option value="${category.id}">${category.name}</option>`;
        }
    }
    select.innerHTML = optionsHTML;
}

async function filterTasksByCategory() {
    try {
        const selectedCategoryId = document.getElementById("selectCategories").value;
        if (selectedCategoryId === "0") {
            createTasks(allTasks);
            return;
        }
        console.log(allTasks);

        const filteredTasks = allTasks.filter(task =>
            task.category_id == selectedCategoryId
        );
        console.log(filteredTasks);

        createTasks(filteredTasks);
    } catch (err) {
        console.log(err);
    }
}

async function deleteTask(id) {
    if(!confirm("are you sure you want to delete this task?")){
        return;
    }
    try {
        const response = await fetch(`/tasks/${id}`, {
            method: "DELETE"
        });
        console.log(response);
        if (response.ok) {
            fetchTasks();
        }
    } catch (err) {
        console.log(err);
    }
}

async function markTaskDone(id, isDone) {
    try {
        const response = await fetch(`/tasks/done/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isDone: isDone
            })
        });
        console.log(response);
        if (response.ok) {
            fetchTasks();
        }
    } catch (err) {
        console.log(err);
    }
}

document.getElementById("selectCategories").addEventListener("change", filterTasksByCategory);

fetchCategories();

function addTaskShow() {
    const inputContainer = document.getElementById("inputContainer");
    inputContainer.classList.toggle("inputContainer-overlay-visible");
    document.getElementById("addTaskBtn").innerHTML = "Add Task";
    document.getElementById("addTaskBtn").value = 0;
    document.getElementById("taskID").value = 0;
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    selectCategoryOptions("taskCategoryIn");

}

function closeInputContainer(e) {
    const inputContainer = document.getElementById("inputContainer");
    if (e.target === inputContainer) {
        inputContainer.classList.toggle("inputContainer-overlay-visible");
    }
}

async function addTask() {
    try {
        let name = document.getElementById("taskName").value;
        let description = document.getElementById("taskDescription").value;
        let category_id = Number(document.getElementById("taskCategoryIn").value);

        const response = await fetch('/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description,
                category_id: category_id
            })
        });
        if (response.ok) {

            fetchTasks();
            document.getElementById("inputContainer").classList.remove("inputContainer-overlay-visible");
        }
    } catch (err) {
        console.log(err);
    }
}

function openEditTask(id) {
    const inputContainer = document.getElementById("inputContainer");
    inputContainer.classList.toggle("inputContainer-overlay-visible");
    selectCategoryOptions("taskCategoryIn");
    document.getElementById("taskID").value = id;
    document.getElementById("addTaskBtn").innerHTML = "Edit Task";
    document.getElementById("addTaskBtn").value = 1;
    let task = allTasks.find(t => t.id === id);
    document.getElementById("taskName").value = task.name;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskCategoryIn").value = task.category_id || "";
}

async function editTask() {
    try {
        let id = document.getElementById("taskID").value;
        let name = document.getElementById("taskName").value;
        let description = document.getElementById("taskDescription").value;
        let category_id = Number(document.getElementById("taskCategoryIn").value);
        if (category_id === 0) {
            category_id = null;
        }
        const response = await fetch(`/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: description,
                category_id: category_id
            })
        });
        if (response.ok) {
            fetchTasks();
            document.getElementById("inputContainer").classList.remove("inputContainer-overlay-visible");
        }
    } catch (err) {
        console.log(err);
    }
}

function inputBtnHandler() {
    let btn = document.getElementById("addTaskBtn");
    if (btn.value == 0) {
        addTask();
    } else {
        editTask();
    }
}


function deleteCookie(name) {
    if(!confirm("are you sure you want to log out?")){
        return;
    }
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
}


async function goToPage(pageUrl , requireAdmin = false) {
    if(!requireAdmin){
        window.location.href = pageUrl;
        return;
    }
    try {
        let response =  await fetch('/auth/isAdmin');
        if(!response.ok){
            window.location.href = "/login";
            return;
        }
        let data = await response.json();
        console.log(data);
        
        if(!data.isAdmin){
            alert("access denied");
            return;
        }
        window.location.href = pageUrl;
        
    } catch (err) {
        
    }
    window.location.href = pageUrl;
}


window.onload = fetchTasks;
