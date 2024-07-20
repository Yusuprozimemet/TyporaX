
import os
import json

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), 'artifacts')
USERS_FILE = os.path.join(ARTIFACTS_DIR, 'users.json')

# Ensure the artifacts directory exists
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

def list_md_files():
    """List all markdown files in the artifacts directory."""
    return [f for f in os.listdir(ARTIFACTS_DIR) if f.endswith('.md')]

def search_files(keyword):
    results = []
    for filename in os.listdir(ARTIFACTS_DIR):
        if filename.endswith('.md'):
            file_path = os.path.join(ARTIFACTS_DIR, filename)
            try:
                with open(file_path, 'r') as file:
                    lines = file.readlines()
                    for i, line in enumerate(lines):
                        if keyword.lower() in line.lower():
                            results.append({
                                'filename': filename,
                                'line': i + 1,
                                'snippet': line.strip()  # Get a snippet of the line
                            })
            except Exception as e:
                print(f"Error reading {filename}: {e}")
    return results

def save_file(filename, content):
    """Save the content to a file."""
    with open(os.path.join(ARTIFACTS_DIR, filename), 'w') as file:
        file.write(content)

def open_md_file(filename):
    """Open a file and return its content."""
    with open(os.path.join(ARTIFACTS_DIR, filename), 'r') as file:
        return file.read()

def save_user(email, username, password):
    """Save user data to JSON file."""
    user_data = {'email': email, 'username': username, 'password': password}
    users = load_users()
    users.append(user_data)
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

def load_users():
    """Load registered users from JSON file."""
    users = []
    try:
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, 'r') as f:
                users = json.load(f)
    except Exception as e:
        print(f"Error loading users: {e}")
    return users

