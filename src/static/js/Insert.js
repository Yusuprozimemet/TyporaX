document.addEventListener("DOMContentLoaded", function() {
    const menuInsert = document.getElementById('menu-insert');
    const markdownEditorElement = document.getElementById('markdown-editor');

    // Show a file input dialog when the Insert menu is clicked
    menuInsert.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none'; // Hide the input field

        fileInput.addEventListener('change', handleFileSelect);
        document.body.appendChild(fileInput); // Append input to body to ensure it is part of the DOM
        fileInput.click(); // Trigger file selection dialog
        document.body.removeChild(fileInput); // Remove input field after use
    });

    // Handle file selection and upload
    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            uploadImage(file);
        }
    }

    // Upload the image to the server
    function uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload_image', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                insertImageIntoEditor(data.url);
            } else {
                alert('Image upload failed: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        });
    }

    // Insert the image URL into the Markdown editor
    function insertImageIntoEditor(url) {
        const markdownText = markdownEditorElement.value;
        const imageMarkdown = `![Image](${url})\n`;
        markdownEditorElement.value = markdownText + imageMarkdown;
    }
});

