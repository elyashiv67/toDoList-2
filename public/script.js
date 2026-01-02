let allCategories = [];

function createTasks(data) {
    const tasksContainer = document.getElementById("showTasks");
    if(!data || data.length === 0){
        tasksContainer.innerHTML = "<p>No tasks available.</p>";
        return;
    }
    let tasksHTML = '<ul class="list-group">';
    data.forEach(task => {
        
        let isDone = (task.isDone) ? "checked" : "";
        let doneClass = (task.isDone) ? "done" : ""; 

        tasksHTML += `
            <li class="list-group-item ${doneClass}">
                <h5>${task.name}</h5>
                <p>${task.description}</p>
                <input type="checkbox" ${isDone} style="accent-color: #00d26a; transform: scale(1.5); cursor: pointer;"> 
                <div>category: ${allCategories[task.category_id]?.name || "No Category"}</div>
            </li>
        `;
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
        createTasks(data);
        } catch (err) {
        console.log(err);
        
        }
}

async function fetchCategories() {
    try {
        const response = await fetch('/categories');
        if (!response.ok) {
            window.location.href = "/login";
            return;
        }
        const data = await response.json();
        
        for (let category of data) {
            allCategories[category.id] = category;
        }
        
        selectCategoryOptions();
        } catch (err) {
        console.log(err);
        }
}
function selectCategoryOptions() {
    const select = document.getElementById("selectCategories");
    let optionsHTML = '<option value="">Select Category</option>';

    for (let category of allCategories) {
        if (category) {
            optionsHTML += `<option value="${category.id}">${category.name}</option>`;
        }
    }
    select.innerHTML = optionsHTML;
}

fetchCategories();


window.onload = fetchTasks;
