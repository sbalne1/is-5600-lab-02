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

// Function to render user portfolio
function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous content

    portfolio.forEach(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');

        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);

        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
    });

    // Register event listener on portfolio list
    portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            viewStock(event.target.id, stocks);
        }
    });
}
// Function to view stock details
function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
        const stock = stocks.find(s => s.symbol == symbol);
        if (stock) {
            document.querySelector('#stockName').textContent = stock.name;
            document.querySelector('#stockSector').textContent = stock.sector;
            document.querySelector('#stockIndustry').textContent = stock.subIndustry;
            document.querySelector('#stockAddress').textContent = stock.address;
            document.querySelector('#logo').src = `logos/${symbol}.svg`;
        }
    }
}
// Delete button event listener
document.querySelector('#deleteButton').addEventListener('click', (event) => {
    event.preventDefault();
    const userId = document.querySelector('#userID').value;
    const userIndex = userData.findIndex(user => user.id == userId);

    if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
    }
});
// Save button event listener
document.querySelector('#saveButton').addEventListener('click', (event) => {
    event.preventDefault();
    const id = document.querySelector('#userID').value;

    for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
            userData[i].user.firstname = document.querySelector('#firstname').value;
            userData[i].user.lastname = document.querySelector('#lastname').value;
            userData[i].user.address = document.querySelector('#address').value;
            userData[i].user.city = document.querySelector('#city').value;
            userData[i].user.email = document.querySelector('#email').value;

            generateUserList(userData, stocksData);
        }
    }
});