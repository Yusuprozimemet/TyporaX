document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById('language-selector');

    function updateLanguage(language) {
        const translation = translations[language];
        if (translation) {
            document.getElementById('page-title').textContent = translation.pageTitle;
            document.getElementById('menu-Size').textContent = translation.menuSize;
            document.getElementById('menu-format').textContent = translation.menuFormat;
            document.getElementById('menu-themes').textContent = translation.menuThemes;
            document.getElementById('menu-help').textContent = translation.menuHelp;
            document.getElementById('menu-insert').textContent = translation.menuInsert;
            document.getElementById('menu-toggle-preview').textContent = translation.menuTogglePreview;
            document.getElementById('menu-Check').textContent = translation.menuCheck;

            document.getElementById('submenu-heading1').textContent = translation.submenuHeading1;
            document.getElementById('submenu-heading2').textContent = translation.submenuHeading2;
            document.getElementById('submenu-heading3').textContent = translation.submenuHeading3;
            document.getElementById('submenu-heading4').textContent = translation.submenuHeading4;
            document.getElementById('submenu-heading5').textContent = translation.submenuHeading5;
            document.getElementById('submenu-heading6').textContent = translation.submenuHeading6;
            document.getElementById('submenu-image-small').textContent = translation.submenuImageSmall;
            document.getElementById('submenu-image-medium').textContent = translation.submenuImageMedium;
            document.getElementById('submenu-image-large').textContent = translation.submenuImageLarge;
            document.getElementById('submenu-image-center').textContent = translation.submenuImageCenter;

            document.getElementById('submenu-strong').textContent = translation.submenuStrong;
            document.getElementById('submenu-emphasis').textContent = translation.submenuEmphasis;
            document.getElementById('submenu-underline').textContent = translation.submenuUnderline;
            document.getElementById('submenu-code').textContent = translation.submenuCode;
            document.getElementById('submenu-hyperlink').textContent = translation.submenuHyperlink;
            document.getElementById('submenu-comment').textContent = translation.submenuComment;
            document.getElementById('submenu-clear-format').textContent = translation.submenuClearFormat;

            document.getElementById('submenu-night').textContent = translation.submenuNight;
            document.getElementById('submenu-day').textContent = translation.submenuDay;

            document.getElementById('submenu-contact').textContent = translation.submenuContact;
            document.getElementById('submenu-submit').textContent = translation.submenuSubmit;
            document.getElementById('submenu-copy-file').textContent = translation.submenuCopyFile;
            document.getElementById('submenu-rename').textContent = translation.submenuRename;
            document.getElementById('submenu-save').textContent = translation.submenuSave;
            document.getElementById('submenu-delete').textContent = translation.submenuDelete;
            document.getElementById('submenu-new').textContent = translation.submenuNew;
            document.getElementById('submenu-open').textContent = translation.submenuOpen;

            document.getElementById('files-title').textContent = translation.filesTitle;
            document.getElementById('search-title').textContent = translation.searchTitle;

            document.getElementById('popup-title').textContent = translation.popupTitle;
            document.getElementById('command-label').textContent = translation.commandLabel;
            document.getElementById('text-label').textContent = translation.textLabel;
            document.getElementById('run-btn').textContent = translation.runButton;

            document.getElementById('results-title').textContent = translation.resultsTitle;
            document.getElementById('close-results-btn').textContent = translation.closeResultsButton;
        }
    }

    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    // Set default language on load
    const userLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
    const defaultLanguage = translations[userLanguage] ? userLanguage : 'en';
    languageSelector.value = defaultLanguage;
    updateLanguage(defaultLanguage);
});
