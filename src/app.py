import os
import json
from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
from utils import list_md_files, open_md_file, save_file, search_files, save_user, load_users
from chatbot import Chatbot
import yaml
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

# Use absolute path for config.yaml inside the src directory
config_path = os.path.join(os.path.dirname(__file__), 'config.yaml')
with open(config_path, 'r') as config_file:
    config = yaml.safe_load(config_file)

# Initialize Chatbot with the path to your YAML configuration file
chatbot = Chatbot.from_config(config_path)

app.secret_key = 'your_secret_key_here'
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'img')
ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), 'artifacts')

# Create the upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define your routes below...


# Route for the home page (index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Route for the registration page (register.html)
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']

        # Save user data
        save_user(email, username, password)
        flash('Registration successful! Please login.')
        return redirect(url_for('login'))
    return render_template('register.html')

# Route for the login page (login.html)
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if username and password match with stored users
        users = load_users()
        for user in users:
            if user['username'] == username and user['password'] == password:
                flash('Login successful!')
                return redirect(url_for('editor'))
        
        flash('Invalid username or password. Please try again.')
    
    return render_template('login.html')

# Route for the editor page (editor.html)
@app.route('/editor')
def editor():
    return render_template('editor.html')

@app.route('/setting')
def setting():
    return render_template('setting.html')

# Route to list markdown files and their content
@app.route('/files')
def list_files():
    files = list_md_files()
    return jsonify(files)

# Route to search within markdown files
@app.route('/search')
def search():
    keyword = request.args.get('q', '')
    results = search_files(keyword)
    return jsonify(results)

@app.route('/save', methods=['POST'])
def save():
    data = request.get_json()
    filename = data.get('filename')
    content = data.get('content')
    if not filename.endswith('.md'):
        filename += '.md'
    try:
        save_file(filename, content)
        return jsonify({'success': True})
    except Exception as e:
        logging.error(f"Error in save route: {str(e)}")
        return jsonify({'success': False, 'error': str(e)})

@app.route('/open')
def open_file():
    filename = request.args.get('filename')
    try:
        content = open_md_file(filename)
        return content
    except Exception as e:
        logging.error(f"Error in open_file route: {str(e)}")
        return str(e), 500
    
# Route to handle image uploads
@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'success': False, 'error': 'No file part'})
    file = request.files['image']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No selected file'})
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        image_url = url_for('static', filename='img/' + filename)
        return jsonify({'success': True, 'url': image_url})
    return jsonify({'success': False, 'error': 'Unknown error'})

@app.route('/rename', methods=['POST'])
def rename_file():
    data = request.get_json()
    current_filename = data.get('currentFilename')
    new_filename = data.get('newFilename')

    try:
        os.rename(os.path.join(ARTIFACTS_DIR, current_filename), os.path.join(ARTIFACTS_DIR, new_filename))
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/delete', methods=['POST'])
def delete_file():
    data = request.json
    filename = data.get('filename')
    print(f'Request to delete file: {filename}')  # Debugging
    if filename:
        file_path = os.path.join(ARTIFACTS_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'error': 'File not found'}), 400
    return jsonify({'success': False, 'error': 'No file selected to delete'}), 400


@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    command = data.get('command')
    text = data.get('text')

    if not command or not text:
        return jsonify({"error": "Missing command or text"}), 400

    convo_id = "default"
    chatbot.add_message("user", f"{command}: {text}", convo_id)
    try:
        response = chatbot.send_request(convo_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)