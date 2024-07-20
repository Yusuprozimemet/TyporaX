document.getElementById('menu-Check').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('input-popup').style.display = 'block';
});

document.getElementById('run-btn').addEventListener('click', function() {
    const command = document.getElementById('command').value;
    const text = document.getElementById('text').value;

    // Send AJAX request to Flask backend
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: command, text: text })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('results').innerText = `Error: ${data.error}`;
        } else {
            document.getElementById('results').innerText = data.response;
        }
        document.getElementById('input-popup').style.display = 'none';
        document.getElementById('results-popup').style.display = 'block';
    })
    .catch(error => {
        document.getElementById('results').innerText = `Error: ${error}`;
        document.getElementById('input-popup').style.display = 'none';
        document.getElementById('results-popup').style.display = 'block';
    });
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
