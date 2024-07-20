document.addEventListener('DOMContentLoaded', function () {
    const markdownEditor = document.getElementById('markdown-editor');

    function handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            const file = files[0];
            uploadImage(file);
        }
    }

    function handlePaste(event) {
        const items = (event.clipboardData || window.clipboardData).items;
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                uploadImage(file);
            }
        }
    }

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
                insertImageMarkdown(data.url, file.name);
            } else {
                console.error('Error uploading image:', data.error);
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }

    function insertImageMarkdown(imageUrl, filename) {
        const markdownImageSyntax = `![${filename}](${imageUrl})`;
        const cursorPosition = markdownEditor.selectionStart;
        const textBeforeCursor = markdownEditor.value.substring(0, cursorPosition);
        const textAfterCursor = markdownEditor.value.substring(cursorPosition);
        markdownEditor.value = textBeforeCursor + markdownImageSyntax + textAfterCursor;
    }

    markdownEditor.addEventListener('drop', handleDrop);
    markdownEditor.addEventListener('paste', handlePaste);
});
