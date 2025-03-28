document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    // Initial rendering of the user list
    generateUserList(userData, stocksData);

    // Register click event listener on user list
    document.querySelector('.user-list').addEventListener('click', (event) =>
        handleUserListClick(event, userData, stocksData)
    );
});
// Function to generate user list
function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear previous list

    users.forEach(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
    });

    // Register event listener on user list
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}
// Function to handle user list click
function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);

    if (user) {
        populateForm(user);
        renderPortfolio(user, stocks);
    }
}
// Function to populate form
function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
}