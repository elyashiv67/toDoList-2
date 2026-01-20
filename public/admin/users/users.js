async function fetchUsers() {
    try {
        const response = await fetch('/users');
        const users = await response.json();
        if (!response.ok) {
            console.log('Failed to fetch users');
            window.location.href = "/Home";
            return;
        }
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
        if (user.role === true){
            role = 'Admin';
        }
        usersList.innerHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${role}</td>
        </tr>
        `;
    });
}
window.onload = () => {
    fetchUsers();
};