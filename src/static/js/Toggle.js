// scripts.js
document.getElementById('menu-toggle-preview').addEventListener('click', function() {
    var previewButton = this;
    if (previewButton.classList.contains('inactive')) {
        previewButton.classList.remove('inactive');
        previewButton.classList.add('active');
        // Add logic to switch to preview mode
    } else {
        previewButton.classList.remove('active');
        previewButton.classList.add('inactive');
        // Add logic to switch to edit mode
    }
});
