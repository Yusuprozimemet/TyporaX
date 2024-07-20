document.addEventListener("DOMContentLoaded", function() {
    const menuHelp = document.getElementById('menu-help');
    const submenuHelp = document.getElementById('submenu-help');

    // Toggle visibility of the submenu when the Help menu is clicked
    menuHelp.addEventListener('click', () => {
        submenuHelp.classList.toggle('visible');
    });

    // Handle clicks inside the Help submenu
    submenuHelp.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        if (action) {
            handleHelpAction(action);
        }
    });

    // Handle actions based on the selected submenu item
    function handleHelpAction(action) {
        switch (action) {
            case 'Contact':
                openContactEmail();
                break;
            case 'Submit':
                openIssuePage();
                break;
            default:
                console.warn('Unknown action:', action);
        }
    }

    // Open the user's default email client with a pre-filled address
    function openContactEmail() {
        window.location.href = 'mailto:yusup.rozimemet@gmail.com?subject=Support Request';
    }

    // Open the GitHub issues page in a new tab
    function openIssuePage() {
        window.open('https://github.com/Yusuprozimemet/TyporaX/issues', '_blank');
    }
});

