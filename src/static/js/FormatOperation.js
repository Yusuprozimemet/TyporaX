document.addEventListener("DOMContentLoaded", function() {
    const menuFormat = document.getElementById('menu-format');
    const submenuFormat = document.getElementById('submenu-format');
    const markdownEditorElement = document.getElementById('markdown-editor');

    // Show/hide submenu when Format menu is clicked
    menuFormat.addEventListener('click', () => {
        submenuFormat.classList.toggle('visible');
    });

    // Handle submenu item clicks
    submenuFormat.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        if (action) {
            handleFormatAction(action);
        }
    });

    // Function to handle formatting actions
    function handleFormatAction(action) {
        const selectionStart = markdownEditorElement.selectionStart;
        const selectionEnd = markdownEditorElement.selectionEnd;
        const selectedText = markdownEditorElement.value.substring(selectionStart, selectionEnd);

        let replacementText = '';

        switch(action) {
            case 'strong':
                replacementText = `**${selectedText}**`;
                break;
            case 'emphasis':
                replacementText = `*${selectedText}*`;
                break;
            case 'underline':
                replacementText = `<u>${selectedText}</u>`;
                break;
            case 'code':
                replacementText = `\`${selectedText}\``;
                break;
            case 'hyperlink':
                replacementText = `[${selectedText}](http://)`;
                break;
            case 'comment':
                replacementText = `<!-- ${selectedText} -->`;
                break;
            case 'clear-format':
                replacementText = selectedText;
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
