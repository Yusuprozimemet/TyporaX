document.getElementById('menu-Check').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('input-popup').style.display = 'block';
});

document.getElementById('run-btn').addEventListener('click', function() {
    const command = document.getElementById('command').value;
    const text = document.getElementById('text').value;

    // Example process: combining command and text, you can replace this with actual grammar check logic
    const result = `Command: ${command}\nText: ${text}`;

    document.getElementById('results').innerText = result;
    document.getElementById('input-popup').style.display = 'none';
    document.getElementById('results-popup').style.display = 'block';
});

document.getElementById('close-results-btn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('results-popup').style.display = 'none';
});

// Close the input popup when clicking outside of it
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('input-popup').style.display = 'none';
    document.getElementById('results-popup').style.display = 'none';
});