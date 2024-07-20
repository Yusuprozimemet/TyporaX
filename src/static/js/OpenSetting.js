// OpenSetting.js

// Function to handle the click event and redirect to the settings page
function openSettings() {
    window.location.href = '/setting'; // Adjust the path if needed
}

// Attach the click event listener to the menu item
document.addEventListener('DOMContentLoaded', function() {
    var menuSetting = document.getElementById('menu-Setting');
    if (menuSetting) {
        menuSetting.addEventListener('click', openSettings);
    }
});

