document.addEventListener("DOMContentLoaded", function () {
    const fileListElement = document.getElementById('file-list');
    const markdownEditorElement = document.getElementById('markdown-editor');
    const markdownPreviewElement = document.getElementById('markdown-preview');
    const contentFilesElement = document.getElementById('content-files');
    const tabFilesElement = document.getElementById('tab-files');
    const fileInputElement = document.getElementById('fileInput');
    const currentFilenameElement = document.getElementById('current-filename');

    let selectedFile = null;


    // Fetch and display list of markdown files
    function fetchFileList() {
        fetch('/files')
            .then(response => response.json())
            .then(files => {
                if (!Array.isArray(files)) {
                    throw new Error('Unexpected response format from /files');
                }
                fileListElement.innerHTML = files.length > 0
                    ? files.map(file =>
                        `<div class="file-item" data-filename="${file}">${file}</div>`
                    ).join('')
                    : '<p>No files found.</p>';
                addFileClickHandlers();
            })
            .catch(error => console.error('Error fetching file list:', error));
    }

    // Add click handlers to file items
    function addFileClickHandlers() {
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.file-item').forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
                selectedFile = item.getAttribute('data-filename');
                fetchFileContent(selectedFile);
            });
        });
    }

    // Fetch and display the content of a file
    function fetchFileContent(filename) {
        fetch(`/open?filename=${encodeURIComponent(filename)}`)
            .then(response => response.text())
            .then(content => {
                markdownEditorElement.value = content;
                markdownPreviewElement.style.display = 'none'; // Hide preview when editing
                currentFilenameElement.value = filename; // Update the current filename
            })
            .catch(error => console.error('Error fetching file content:', error));
    }


    // Function to scroll to a specific line in the editor (if desired)
    function scrollToLine(lineNumber) {
        // Implement this function if needed
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey) {
            switch (event.key) {
                case 'd': // Delete file
                    if (selectedFile) {
                        event.preventDefault();
                        handleDeleteFile();
                    }
                    break;
                case 's': // Save file
                    event.preventDefault();
                    handleSaveFile();
                    break;
                case 'x': // Copy file
                    if (selectedFile) {
                        event.preventDefault();
                        handleCopyFile();
                    }
                    break;
                case 'q': // Create new file
                    event.preventDefault();
                    handleCreateNewFile();
                    break;
                case 'r': // Rename file
                    if (selectedFile) {
                        event.preventDefault();
                        handleRenameFilePrompt();
                    }
                    break;
                case 'o': // Open file
                    event.preventDefault();
                    handleOpenFile();
                    break;
            }
        }
    });

    // Handle file renaming via prompt
    function handleRenameFilePrompt() {
        const newFilename = prompt('Enter new filename:', selectedFile);
        if (newFilename && newFilename !== selectedFile) {
            handleRenameFile(selectedFile, newFilename);
        }
    }

    // Handle file renaming
    function handleRenameFile(currentFilename, newFilename) {
        fetch('/rename', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentFilename, newFilename })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    fetchFileList();
                } else {
                    alert('Error renaming file: ' + result.error);
                }
            })
            .catch(error => console.error('Error renaming file:', error));
    }

    // Handle file deletion
    function handleDeleteFile() {
        if (confirm('Are you sure you want to delete this file?')) {
            fetch('/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: selectedFile })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        fetchFileList();
                        markdownEditorElement.value = ''; // Clear editor after deletion
                        selectedFile = null; // Clear selection
                    } else {
                        alert('Error deleting file: ' + result.error);
                    }
                })
                .catch(error => console.error('Error deleting file:', error));
        }
    }

    // Handle saving file as .md
    function handleSaveFile() {
        // Use a timestamp to ensure uniqueness for untitled files
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const defaultFilename = `${timestamp}.md`;
        const filename = currentFilenameElement.value || defaultFilename;

        fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content: markdownEditorElement.value })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('File saved successfully.');
                    fetchFileList(); // Refresh file list
                } else {
                    alert('Error saving file: ' + result.error);
                }
            })
            .catch(error => console.error('Error saving file:', error));
    }

    // Handle copying file
    function handleCopyFile() {
        const newFilename = prompt('Enter new name for the copy:', selectedFile);
        if (newFilename && newFilename !== selectedFile) {
            fetch('/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: newFilename, content: markdownEditorElement.value })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        fetchFileList();
                    } else {
                        alert('Error copying file: ' + result.error);
                    }
                })
                .catch(error => console.error('Error copying file:', error));
        }
    }

    // Handle creating a new file
    function handleCreateNewFile() {
        const filename = prompt('Enter new file name:', 'Untitled.md');
        if (filename) {
            fetch('/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename, content: '' })
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        fetchFileList();
                        selectedFile = filename; // Set the new file as the selected file
                        markdownEditorElement.value = ''; // Clear the editor
                        currentFilenameElement.value = filename; // Set current filename
                    } else {
                        alert('Error creating new file: ' + result.error);
                    }
                })
                .catch(error => console.error('Error creating new file:', error));
        }
    }

    // Function to handle opening a file
    function handleOpenFile() {
        fileInputElement.click(); // Trigger the hidden file input
    }

    // Function to handle file input change event
    function handleFileSelect(event) {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Load the file content into the markdown editor
                markdownEditorElement.value = e.target.result;
                selectedFile = file.name; // Update selected file
                currentFilenameElement.value = file.name; // Update current filename
            };

            reader.onerror = function (e) {
                console.error('There was an error reading the file:', e);
            };

            reader.readAsText(file); // Read the file as text
        }
    }

    // Add event listener to the file input
    fileInputElement.addEventListener('change', handleFileSelect);

    // Initial file list fetch
    fetchFileList();
});
