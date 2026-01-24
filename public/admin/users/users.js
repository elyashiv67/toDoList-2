let allUsers = [];

async function fetchUsers() {
    try {
        const response = await fetch('/users');
        const users = await response.json();
        if (!response.ok) {
            console.log('Failed to fetch users');
            window.location.href = "/Home";
            return;
        }
        allUsers = users;
        renderUsers(users);
    } catch (err) {
        console.log(err);
    }
}
function renderUsers(users) {
    const usersList = document.getElementById('usersTableBody');
    usersList.innerHTML = ``;
    users.forEach(user => {
        let role = 'User';
        if (user.is_admin === 1) {
            role = 'Admin';
        }
        usersList.innerHTML += `
        <tr>
            <td>${user.name}</td>
            <td>${user.user_name}</td>
            <td>${user.pass}</td>
            <td>${user.email}</td>
            <td>${role}</td>
            <td class="actionsTd">
            <div id="deleteUser" onclick="deleteUser(${user.id})"><i class="fa-regular fa-trash-can fa-xl"></i></div>
                <div id="editUser" onclick="openEditUser(${user.id})"><i class="fa-regular fa-pen-to-square fa-xl"></i></div>
            </td>
        </tr>
        `;
    });
}


async function deleteUser(userId) {
    try {
        const response = await fetch(`/users/${userId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchUsers(); // Refresh the user list
        } else {
            console.log('Failed to delete user');
        }
    } catch (err) {
        console.log(err);
    }
}

function addUserShow() {
    const inputContainer = document.getElementById("inputContainer");
    inputContainer.classList.toggle("inputContainer-overlay-visible");
    document.getElementById("containerTitle").innerHTML = "Add User";
    document.getElementById("addUserBtn").innerHTML = "Add User";
    document.getElementById("addUserBtn").value = 0;
    document.getElementById("userID").value = 0;
    document.getElementById("name").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPassword").value = "";

}
function closeInputContainer(e) {
    const inputContainer = document.getElementById("inputContainer");
    if (e.target === inputContainer) {
        inputContainer.classList.toggle("inputContainer-overlay-visible");
    }
}



async function addUser() {
    try {
        let name = document.getElementById("name").value;
        let userName = document.getElementById("userName").value;
        let email = document.getElementById("userEmail").value;
        let password = document.getElementById("userPassword").value;
        let role = Number(document.getElementById("userRole").value);

        const response = await fetch('/auth/reg', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                userName: userName,
                pass: password,
                is_admin: role
            })
        });
        if (response.ok) {

            fetchUsers();
            document.getElementById("inputContainer").classList.remove("inputContainer-overlay-visible");
        }
    } catch (err) {
        console.log(err);
    }
}

function openEditUser(id) {
    const inputContainer = document.getElementById("inputContainer");
    inputContainer.classList.toggle("inputContainer-overlay-visible");
    document.getElementById("userID").value = id;
    document.getElementById("containerTitle").innerHTML = "Edit User";
    document.getElementById("addUserBtn").innerHTML = "Edit User";
    document.getElementById("addUserBtn").value = 1;
    let user = allUsers.find(u => u.id === id);
    document.getElementById("name").value = user.name;
    document.getElementById("userName").value = user.user_name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userPassword").value = user.pass;
    document.getElementById("userRole").value = user.is_admin;
}

async function editUser() {
    try {
        let id = document.getElementById("userID").value;
        let name = document.getElementById("name").value;
        let userName = document.getElementById("userName").value;
        let email = document.getElementById("userEmail").value;
        let password = document.getElementById("userPassword").value;
        let role = Number(document.getElementById("userRole").value);

        const response = await fetch(`/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                user_name: userName,
                pass: password,
                is_admin: role
            })
        });
        if (response.ok) {
            fetchUsers();
            document.getElementById("inputContainer").classList.remove("inputContainer-overlay-visible");
        }
    } catch (err) {
        console.log(err);
    }
}


function inputBtnHandler() {
    let btn = document.getElementById("addUserBtn");
    if (btn.value == 0) {
        addUser();
    } else {
        editUser();
    }
}


window.onload = () => {
    fetchUsers();
};