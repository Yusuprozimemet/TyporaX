// submenu.js

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-bar > div[id^="menu-"]');
    const submenus = document.querySelectorAll('.submenu');

    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', function (e) {
            // Hide all submenus
            submenus.forEach(submenu => submenu.style.display = 'none');

            // Display the corresponding submenu
            const submenuId = 'submenu-' + menuItem.id.split('-')[1];
            const submenu = document.getElementById(submenuId);
            if (submenu) {
                submenu.style.display = 'block';

                // Position the submenu below the corresponding menu item
                const rect = menuItem.getBoundingClientRect();
                submenu.style.position = 'absolute';
                submenu.style.top = `${rect.bottom}px`;
                submenu.style.left = `${rect.left}px`;
            }

            e.stopPropagation();
        });
    });

    document.addEventListener('click', function () {
        // Hide all submenus when clicking outside
        submenus.forEach(submenu => submenu.style.display = 'none');
    });

    submenus.forEach(submenu => {
        submenu.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent click from propagating to document
            const action = e.target.getAttribute('data-action');
            if (action) {
                executeAction(action);
            }
        });
    });

});
