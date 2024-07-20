document.addEventListener("DOMContentLoaded", function() {
    const menuThemes = document.getElementById('menu-themes');
    const submenuThemes = document.getElementById('submenu-themes');
    const bodyElement = document.body;

    // Show/hide submenu when Themes menu is clicked
    menuThemes.addEventListener('click', () => {
        submenuThemes.classList.toggle('visible');
    });

    // Handle submenu item clicks
    submenuThemes.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        if (action) {
            applyTheme(action);
        }
    });

    // Function to apply the selected theme
    function applyTheme(theme) {
        // Remove existing theme classes
        bodyElement.classList.remove('theme-night', 'theme-day');

        // Apply the selected theme
        if (theme === 'night') {
            bodyElement.classList.add('theme-night');
        } else if (theme === 'day') {
            bodyElement.classList.add('theme-day');
        }
    }

    // Optional: Initialize the theme based on saved preference or default to day mode
    const savedTheme = localStorage.getItem('theme') || 'day';
    applyTheme(savedTheme);

    // Save theme preference to localStorage
    function saveThemePreference(theme) {
        localStorage.setItem('theme', theme);
    }

    // Update theme preference when theme is changed
    submenuThemes.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        if (action) {
            applyTheme(action);
            saveThemePreference(action);
        }
    });
});

