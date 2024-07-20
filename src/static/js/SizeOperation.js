document.addEventListener("DOMContentLoaded", function () {
    const menuSize = document.getElementById('menu-Size');
    const submenuSize = document.getElementById('submenu-Size');
    const markdownEditorElement = document.getElementById('markdown-editor');

    // Show/hide submenu when Size menu is clicked
    menuSize.addEventListener('click', () => {
        submenuSize.classList.toggle('visible');
    });

    // Handle submenu item clicks
    submenuSize.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        if (action) {
            handleSizeAction(action);
        }
    });

    // Function to handle size-related actions
    function handleSizeAction(action) {
        const selectionStart = markdownEditorElement.selectionStart;
        const selectionEnd = markdownEditorElement.selectionEnd;
        const selectedText = markdownEditorElement.value.substring(selectionStart, selectionEnd);

        let replacementText = '';

        switch (action) {
            case 'heading1':
                replacementText = `# ${selectedText}`;
                break;
            case 'heading2':
                replacementText = `## ${selectedText}`;
                break;
            case 'heading3':
                replacementText = `### ${selectedText}`;
                break;
            case 'heading4':
                replacementText = `#### ${selectedText}`;
                break;
            case 'heading5':
                replacementText = `##### ${selectedText}`;
                break;
            case 'heading6':
                replacementText = `###### ${selectedText}`;
                break;
            case 'image-small':
                replacementText = `<img src="${selectedText}" alt="Image" style="width:10%;">`;
                break;
            case 'image-medium':
                replacementText = `<img src="${selectedText}" alt="Image" style="width:50%;">`;
                break;
            case 'image-large':
                replacementText = `<img src="${selectedText}" alt="Image" style="width:90%;">`;
                break;
            case 'image-center':
                replacementText = `<p align="center">\n<img src="${selectedText}" alt="Image" style="width:50%;">\n</p>`;
                break;
            default:
                return;
        }

        // Replace the selected text or insert at the cursor position
        const beforeText = markdownEditorElement.value.substring(0, selectionStart);
        const afterText = markdownEditorElement.value.substring(selectionEnd);

        markdownEditorElement.value = beforeText + replacementText + afterText;
        markdownEditorElement.focus();
        markdownEditorElement.setSelectionRange(selectionStart + replacementText.length, selectionStart + replacementText.length);
    }
});
