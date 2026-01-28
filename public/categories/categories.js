
let allCategories = [];
let allUsers = [];

async function fetchUsers() {
    try {
        const response = await fetch('/users/categoriesUsers');
        const users = await response.json();
        if (!response.ok) {
            console.log('Failed to fetch users');
            window.location.href = "/Home";
            return;
        }
        for (let user of users) {
            allUsers[user.id] = user;
        }
    } catch (err) {
        console.log(err);
    }
}

async function fetchCategories() {
    try {
        const response = await fetch('/categories/manager');
        const data = await response.json();

        for (let category of data) {
            allCategories[category.id] = category;
        }
        if(!response.ok){
            window.location.href = "/Home";
            console.log("failed to load categories");
            return;
        }
        renderCategories(data);

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
                <div>user: ${allUsers[category.user_id]?.user_name || 'Unknown User'}</div>
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
    selectFill();
}

function editCategoryShow(id) {
    const inputContainer = document.getElementById("inputContainer");
    inputContainer.classList.toggle("inputContainer-overlay-visible");
    document.getElementById("inputTitle").innerHTML = "Edit Category";
    document.getElementById("addCategoryBtn").innerHTML = "Edit Category";
    document.getElementById("addCategoryBtn").value = 1;
    let category = allCategories[id];
    console.log(category);
    selectFill();
    
    document.getElementById("categoryID").value = category.id;
    document.getElementById("categoryName").value = category.name;
    document.getElementById("userName").value = allUsers[category.user_id]?.id;
}

async function deleteCategory(id) {
    if(!confirm("are you sure you want to delete this category?")){
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
}

async function addCategory() {
    const name = document.getElementById("categoryName").value;
    const userId = document.getElementById("userName").value;
    try {
        const response = await fetch('/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, user_id: userId })
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
    const userId = Number(document.getElementById("userName").value);

    try {
        const response = await fetch(`/categories/${categoryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                 name: name
                , user_id: userId })
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

function selectFill(){
    const userSelect = document.getElementById("userName");
    let option = `<option value="">Select user</option>`;
    allUsers.forEach(user => {
        if(user){
            option += `<option value="${user.id}">${user.user_name}</option>`;
        }
    });
    userSelect.innerHTML = option;
}


fetchUsers();
fetchCategories();











