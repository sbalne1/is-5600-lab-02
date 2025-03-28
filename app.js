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