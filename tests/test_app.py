import pytest
import json
import os
import sys

# Set the path to include src
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from app import app as flask_app
from utils import list_md_files, save_file, open_md_file, search_files, save_user, load_users

# Sample user data
USERS = [
    
    {
        "email": "apple@gmail.com",
        "username": "hello",
        "password": "1234"
    },
    {
        "email": "test@example.com",
        "username": "testuser",
        "password": "password123"
    }
]

@pytest.fixture
def client():
    flask_app.config['TESTING'] = True
    return flask_app.test_client()

def setup_module(module):
    # Set up any necessary data before tests run
    for user in USERS:
        save_user(user['email'], user['username'], user['password'])

def teardown_module(module):
    # Clear user data after tests
    if os.path.exists('artifacts/users.json'):
        os.remove('artifacts/users.json')

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'Home' in response.data

def test_register(client):
    # Test registration for a new user
    response = client.post('/register', data={
        'email': 'newuser@example.com',
        'username': 'newuser',
        'password': 'newpassword'
    })

    # Check for redirect response
    assert response.status_code == 302

    # Corrected URL comparison
    assert response.location.endswith('/login')

    # Follow the redirect to check if the flash message is present
    redirected_response = client.get('/login', follow_redirects=True)
    
    # Check if flash message is in the content
    assert b'Registration successful!' in redirected_response.data



def test_login(client):
    # Test login with existing user data
    response = client.post('/login', data={
        'username': USERS[2]['username'],
        'password': USERS[2]['password']
    })
    assert response.status_code == 302
    assert b'Login successful!' in response.data

def test_list_files(client):
    save_file('test.md', 'This is a test file.')
    response = client.get('/files')
    assert response.status_code == 200
    assert b'test.md' in response.data

def test_search_files(client):
    save_file('search_test.md', 'This is a search test file.')
    response = client.get('/search', query_string={'q': 'search'})
    data = json.loads(response.data)
    assert response.status_code == 200
    assert len(data) > 0
    assert any('search_test.md' in item['filename'] for item in data)

def test_save_file(client):
    response = client.post('/save', json={'filename': 'save_test.md', 'content': 'This file should be saved.'})
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['success'] is True
    assert 'save_test.md' in list_md_files()

def test_open_file(client):
    save_file('open_test.md', 'This is the content of the file.')
    response = client.get('/open', query_string={'filename': 'open_test.md'})
    assert response.status_code == 200
    assert b'This is the content of the file.' in response.data

def test_delete_file(client):
    save_file('delete_test.md', 'This file should be deleted.')
    response = client.post('/delete', json={'filename': 'delete_test.md'})
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['success'] is True
    assert 'delete_test.md' not in list_md_files()

def test_rename_file(client):
    save_file('rename_test.md', 'This file should be renamed.')
    response = client.post('/rename', json={'currentFilename': 'rename_test.md', 'newFilename': 'renamed_test.md'})
    data = json.loads(response.data)
    assert response.status_code == 200
    assert data['success'] is True
    assert 'renamed_test.md' in list_md_files()
    assert 'rename_test.md' not in list_md_files()

def test_upload_image(client):
    with open('tests/test_image.png', 'wb') as f:
        f.write(b'fake image data')
    
    with open('tests/test_image.png', 'rb') as f:
        response = client.post('/upload_image', data={'image': (f, 'test_image.png')})
        data = json.loads(response.data)
        assert response.status_code == 200
        assert data['success'] is True
        assert 'test_image.png' in data['url']

def test_ask_chatbot(client):
    response = client.post('/ask', json={'command': 'greet', 'text': 'Hello!'})
    data = json.loads(response.data)
    assert response.status_code == 200
    assert 'response' in data
