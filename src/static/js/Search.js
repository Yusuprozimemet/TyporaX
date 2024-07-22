document.addEventListener("DOMContentLoaded", function () {
    const fileListElement = document.getElementById('file-list');
    const searchInputElement = document.getElementById('search-input');
    const searchResultsElement = document.getElementById('search-results');
    const markdownEditorElement = document.getElementById('markdown-editor');
    const markdownPreviewElement = document.getElementById('markdown-preview');
    const contentFilesElement = document.getElementById('content-files');
    const contentSearchElement = document.getElementById('content-search');
    const tabFilesElement = document.getElementById('tab-files');
    const tabSearchElement = document.getElementById('tab-search');

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
                const filename = item.getAttribute('data-filename');
                fetchFileContent(filename);
            });
        });
    }

    // Fetch and display the content of a file
    function fetchFileContent(filename) {
        return fetch(`/open?filename=${encodeURIComponent(filename)}`)
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
                const lineNumber = parseInt(result.getAttribute('data-line'), 10);
                const searchText = result.textContent.split(': ')[1].trim(); // Extract the search text

                fetchFileContent(filename).then(() => {
                    // Call the new function after the content is loaded
                    scrollToLineAndHighlight(lineNumber, searchText);
                });
            });
        });
    }

    // Function to scroll to a specific line in the editor and highlight the text
    function scrollToLineAndHighlight(lineNumber, searchText) {
        console.log(`Scrolling to line: ${lineNumber}, highlighting text: ${searchText}`);
        const lines = markdownEditorElement.value.split('\n');
        let position = 0;
        for (let i = 0; i < lineNumber - 1; i++) {
            position += lines[i].length + 1; // +1 for newline character
        }

        // Scroll to the position
        const lineHeight = markdownEditorElement.scrollHeight / markdownEditorElement.value.split('\n').length;
        markdownEditorElement.scrollTop = (lineNumber - 1) * lineHeight;

        // Highlight the text
        const start = position + lines[lineNumber - 1].toLowerCase().indexOf(searchText.toLowerCase());
        const end = start + searchText.length;
        console.log(`Highlighting from ${start} to ${end}`);
        markdownEditorElement.setSelectionRange(start, end);
        markdownEditorElement.focus();

        // Optionally, you can add a temporary highlight effect
        const originalColor = markdownEditorElement.style.backgroundColor;
        markdownEditorElement.style.backgroundColor = '#f5f5f5';
        setTimeout(() => {
            markdownEditorElement.style.backgroundColor = originalColor;
        }, 1000); // Reset after 1.5 seconds
    }

    // Initial file list fetch
    fetchFileList();
});