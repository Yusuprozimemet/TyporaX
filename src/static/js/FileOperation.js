document.addEventListener("DOMContentLoaded", function() {
    const fileListElement = document.getElementById('file-list');
    const searchInputElement = document.getElementById('search-input');
    const searchResultsElement = document.getElementById('search-results');
    const markdownEditorElement = document.getElementById('markdown-editor');
    const markdownPreviewElement = document.getElementById('markdown-preview');
    const contentFilesElement = document.getElementById('content-files');
    const contentSearchElement = document.getElementById('content-search');
    const tabFilesElement = document.getElementById('tab-files');
    const tabSearchElement = document.getElementById('tab-search');

    let selectedFile = null;

    // Toggle between Files and Search tabs
    tabFilesElement.addEventListener('click', () => {
        contentFilesElement.classList.add('active');
        contentSearchElement.classList.remove('active');
        tabFilesElement.classList.add('active');
        tabSearchElement.classList.remove('active');
    });

    tabSearchElement.addEventListener('click', () => {
        contentFilesElement.classList.remove('active');
        contentSearchElement.classList.add('active');
        tabFilesElement.classList.remove('active');
        tabSearchElement.classList.add('active');
    });

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
            })
            .catch(error => console.error('Error fetching file content:', error));
    }

    // Search within files
    searchInputElement.addEventListener('input', () => {
        const query = searchInputElement.value.trim();
        if (query === '') {
            searchResultsElement.innerHTML = '';
            return;
        }
        fetch(`/search?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(results => {
                if (!Array.isArray(results)) {
                    throw new Error('Unexpected response format from /search');
                }
                searchResultsElement.innerHTML = results.length > 0 
                    ? results.map(result => 
                        `<div class="search-result" data-filename="${result.filename}" data-line="${result.line}">
                            <strong>${result.filename}</strong> (Line ${result.line}): ${result.snippet || 'No snippet available'}
                        </div>`
                    ).join('')
                    : '<p>No results found.</p>';
                addSearchResultClickHandlers();
            })
            .catch(error => {
                console.error('Error searching files:', error);
                searchResultsElement.innerHTML = '<p>Error occurred while searching.</p>';
            });
    });

    // Add click handlers to search results
    function addSearchResultClickHandlers() {
        document.querySelectorAll('.search-result').forEach(result => {
            result.addEventListener('click', () => {
                const filename = result.getAttribute('data-filename');
                fetchFileContent(filename);
                scrollToLine(result.getAttribute('data-line'));
            });
        });
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
                    if (selectedFile) {
                        event.preventDefault();
                        handleSaveFile();
                    }
                    break;
                case 'x': // Copy file
                    if (selectedFile) {
                        event.preventDefault();
                        handleCopyFile();
                    }
                    break;
                case 'a': // Create new file
                    event.preventDefault();
                    handleCreateNewFile();
                    break;
                case 'r': // Rename file
                    if (selectedFile) {
                        event.preventDefault();
                        handleRenameFilePrompt();
                    }
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
                } else {
                    alert('Error deleting file: ' + result.error);
                }
            })
            .catch(error => console.error('Error deleting file:', error));
        }
    }

    // Handle saving file as .md
    function handleSaveFile() {
        const filename = selectedFile.endsWith('.md') ? selectedFile : `${selectedFile}.md`;
        fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content: markdownEditorElement.value })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('File saved successfully.');
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
                } else {
                    alert('Error creating new file: ' + result.error);
                }
            })
            .catch(error => console.error('Error creating new file:', error));
        }
    }

    // Initial file list fetch
    fetchFileList();
});
