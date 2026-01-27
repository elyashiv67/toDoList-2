
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
        const response = await fetch('/categories');
        const data = await response.json();

        for (let category of data) {
            allCategories[category.id] = category;
        }
        if(!response.ok){
            window.location.href = "/Home";
            console.log("failed to load categories");
            return;
        }

    } catch (err) {
        console.log(err);
    }
}

function renderCategories() {
        let container = document.getElementById("CategoriesContainer");
        container.innerHTML = "";
        let html = "";
        allCategories.forEach(category => {
            if (category) {
                html += `<div class="category">
                <h2>${category.name}</h2>
                <div>user: ${allUsers[category.user_id]?.name || 'Unknown User'}</div>
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
        //need to add
    } else {
        editCategory();
        //need to add
    }
}


fetchCategories().then(() => {
    fetchUsers().then(() => {
        renderCategories();
    });
});







