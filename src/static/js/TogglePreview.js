document.addEventListener("DOMContentLoaded", function() {
    const editor = document.getElementById('markdown-editor');
    const preview = document.getElementById('markdown-preview');
    const togglePreviewButton = document.getElementById('menu-toggle-preview');

    let isPreviewMode = false;

    // Function to render Markdown preview
    function renderPreview() {
        if (isPreviewMode) {
            preview.innerHTML = marked.parse(editor.value);
        }
    }

    // Function to insert text at the cursor position in the editor
    function insertText(text) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const before = editor.value.substring(0, start);
        const after = editor.value.substring(end);
        editor.value = before + text + after;
        editor.selectionStart = editor.selectionEnd = start + text.length;
        editor.focus();
        renderPreview();
    }

    // Function to wrap selected text with specified strings
    function wrapText(before, after = before) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = editor.value.substring(start, end);
        const beforeText = editor.value.substring(0, start);
        const afterText = editor.value.substring(end);
        editor.value = beforeText + before + selectedText + after + afterText;
        editor.selectionStart = start + before.length;
        editor.selectionEnd = end + before.length;
        editor.focus();
        renderPreview();
    }

    // Function to clear formatting from selected text
    function clearFormatting() {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const before = editor.value.substring(0, start);
        const selectedText = editor.value.substring(start, end);
        const after = editor.value.substring(end);
        editor.value = before + selectedText + after;
        editor.focus();
        renderPreview();
    }

    // Function to handle image uploads
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            fetch('/upload_image', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const imageUrl = data.url;
                        const markdownImage = `![alt text](${imageUrl})`;
                        insertText(markdownImage);
                    } else {
                        alert('Error uploading image: ' + data.error);
                    }
                });
        }
    }

    // Function to open a file and set its content to the editor
    function openFile(filename) {
        fetch('/open?filename=' + filename)
            .then(response => response.text())
            .then(content => {
                editor.value = content;
                renderPreview();
                updateCurrentFileInfo(filename);
            });
    }

    // Function to toggle preview visibility
    function togglePreview() {
        isPreviewMode = !isPreviewMode;
        if (isPreviewMode) {
            editor.style.display = 'none';
            preview.style.display = 'block';
            renderPreview(); // Ensure the preview is updated when toggling
        } else {
            editor.style.display = 'block';
            preview.style.display = 'none';
        }
    }

    // Set up event listeners
    togglePreviewButton.addEventListener('click', togglePreview);

    // Initial preview update
    renderPreview();

    // Image upload input listener
    const imageUploadInput = document.getElementById('image-upload-input'); // Ensure this ID matches your input element
    if (imageUploadInput) {
        imageUploadInput.addEventListener('change', handleImageUpload);
    }
});
