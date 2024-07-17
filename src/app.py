import os
import json
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# Path to store registered users (replace with database in real applications)
USERS_FILE = os.path.join(os.path.dirname(__file__), 'artifacts', 'users.json')

# Create 'artifacts' folder if it doesn't exist
if not os.path.exists(os.path.join(os.path.dirname(__file__), 'artifacts')):
    os.makedirs(os.path.join(os.path.dirname(__file__), 'artifacts'))

# Function to save user data to JSON file
def save_user(email, username, password):
    user_data = {'email': email, 'username': username, 'password': password}
    users = load_users()
    users.append(user_data)
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)


# Function to load registered users from JSON file
def load_users():
    users = []
    try:
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'r') as f:
                users = json.load(f)
    except Exception as e:
        print(f"Error loading users: {e}")
    return users

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

if __name__ == '__main__':
    app.run(debug=True)
