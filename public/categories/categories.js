let allCategories = [];

async function fetchUsers() {
    try {
        const response = await fetch('/users/categoriesUsers');
        const users = await response.json();
        if (!response.ok) {
            console.log('Failed to fetch users');
            window.location.href = "/Home";
            return;
        }
    } catch (err) {
        console.log(err);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch('/categories');
        const data = await response.json();
        
        if(response.status == 400){
            let container = document.getElementById("CategoriesContainer");
            container.innerHTML = "<h2>No categories found</h2>"; 
            return;
        }
        if(!response.ok){
            window.location.href = "/Home";
            console.log("failed to load categories");
            return;
        }
        for (let category of data) {
            allCategories[category.id] = category;
        }
        if(data.length > 0){
            renderCategories(data);
        }

    } catch (err) {
        console.log(err);
    }
}

function renderCategories(data) {
        let container = document.getElementById("CategoriesContainer");
        container.innerHTML = "";
        let html = "";
        data.forEach(category => {
            if (category) {
                html += `<div class="category">
                <h2>${category.name}</h2>
                <div class="category-actions">
                    <div id="deleteCategory" onclick="deleteCategory(${category.id})"><i class="fa-regular fa-trash-can fa-xl"></i></div>
                <div id="editCategory" onclick="editCategoryShow(${category.id})"><i class="fa-regular fa-pen-to-square fa-xl"></i></div>
                </div>
                </div>`;
            }
        });
        container.innerHTML = html;
}

function addCategoryShow() {
    const inputContainer = document.getElementById("inputContainer");
    inputContainer.classList.toggle("inputContainer-overlay-visible");
    document.getElementById("inputTitle").innerHTML = "Add Category";
    document.getElementById("addCategoryBtn").innerHTML = "Add Category";
    document.getElementById("addCategoryBtn").value = 0;
    document.getElementById("categoryID").value = 0;
    document.getElementById("categoryName").value = "";
}

function editCategoryShow(id) {
    const inputContainer = document.getElementById("inputContainer");
    inputContainer.classList.toggle("inputContainer-overlay-visible");
    document.getElementById("inputTitle").innerHTML = "Edit Category";
    document.getElementById("addCategoryBtn").innerHTML = "Edit Category";
    document.getElementById("addCategoryBtn").value = 1;
    let category = allCategories[id];
    console.log(category);
    
    document.getElementById("categoryID").value = category.id;
    document.getElementById("categoryName").value = category.name;
}

async function deleteCategory(id) {
    try {
        const taskCountResponse = await fetch(`/categories/tasksCount/${id}`);
        const responseJson = await taskCountResponse.json();
        const taskCount = responseJson.taskCount;
        if(!confirm(`Are you sure you want to delete this category? It has ${taskCount} associated tasks.`)){
            return;
        }
        try {
            const response = await fetch(`/categories/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchCategories();
            } else {
                console.log("Failed to delete category");
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    } catch (error) {
        console.log(error);
    }
}

async function addCategory() {
    const name = document.getElementById("categoryName").value;
    try {
        const response = await fetch('/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        });
        if (response.ok) {
            fetchCategories();
            document.getElementById("inputContainer").classList.remove("inputContainer-overlay-visible");
        } else {
            console.log("Failed to add category");
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}

async function editCategory() {
    const categoryId = document.getElementById("categoryID").value;
    const name = document.getElementById("categoryName").value;

    try {
        const response = await fetch(`/categories/${categoryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                 name: name
                })
        });
        if (response.ok) {
            fetchCategories();
            document.getElementById("inputContainer").classList.remove("inputContainer-overlay-visible");
        } else {
            console.log(response);
            
            console.log("Failed to edit category");
        }
    } catch (err) {
        console.log(err);
    }
}

function closeInputContainer(e) {
    const inputContainer = document.getElementById("inputContainer");
    if (e.target === inputContainer) {
        inputContainer.classList.toggle("inputContainer-overlay-visible");
    }
}


function inputBtnHandler() {
    let btn = document.getElementById("addCategoryBtn");
    if (btn.value == 0) {
        addCategory();
    } else {
        editCategory();
    }
}


fetchCategories();










