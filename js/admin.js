document.addEventListener("DOMContentLoaded", function() {
    // Fetch and display users
    function fetchUsers() {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No token found');
            return;  // If no token is found, stop the request
        }
        
        fetch('https://lineage-api.onrender.com/api/users/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  // Send the token in the Authorization header
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data || !data.users) {
                console.error('No users data found');
                return;
            }

            const allUsersTable = document.querySelector('#all-users tbody');
            const paidUsersTable = document.querySelector('#paid-users tbody');
            allUsersTable.innerHTML = '';  // Clear the existing list
            paidUsersTable.innerHTML = '';  // Clear the paid user list

            // Loop through users and separate into all users and paid users
            data.users.forEach(user => {
                const userRow = document.createElement('tr');
                userRow.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <a href="#" class="text-warning edit-btn">Edit</a> |
                        <a href="#" class="text-danger delete-btn">Delete</a>
                        <div class="edit-form-container" style="display:none;">
                            <form class="edit-form">
                                <input type="text" class="edit-username" placeholder="New Username" value="${user.username}" required>
                                <input type="email" class="edit-email" placeholder="New Email" value="${user.email}" required>
                                <select class="edit-subscription" required>
                                    <option value="false" ${user.admin === false ? 'selected' : ''}>FALSE</option>
                                    <option value="true" ${user.admin === true ? 'selected' : ''}>TRUE</option>
                                </select>
                                <button type="submit" class="btn btn-warning">Save</button>
                            </form>
                        </div>
                    </td>
                `;

                // Add user to appropriate table based on their paid status
                if (user.hasPaid) {
                    paidUsersTable.appendChild(userRow);
                } else {
                    allUsersTable.appendChild(userRow);
                }
            });

            // Add event listeners for Edit and Delete actions
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const userRow = this.closest('tr');
                    const editFormContainer = userRow.querySelector('.edit-form-container');
                    const isVisible = editFormContainer.style.display === 'block';
                    editFormContainer.style.display = isVisible ? 'none' : 'block';  // Toggle visibility of the edit form
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    const userId = this.closest('tr').querySelector('td').textContent;
                    removeUser(userId);
                });
            });

            // Handle form submission
            document.querySelectorAll('.edit-form').forEach(form => {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    const userId = this.closest('tr').querySelector('td').textContent;
                    const username = this.querySelector('.edit-username').value;
                    const email = this.querySelector('.edit-email').value;
                    const admin = this.querySelector('.edit-subscription').value === 'true'; // Convert to boolean

                    updateUser(userId, username, email, admin);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }

    // Function to update user data
    function updateUser(userId, username, email, admin) {
        const token = localStorage.getItem('access_token');
        fetch(`https://lineage-api.onrender.com/api/users/${userId}/edit`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, admin })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('User updated successfully');
                fetchUsers();  // Re-fetch the users to update the table
            }
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
    }

    // Function to remove a user
    function removeUser(userId) {
        const token = localStorage.getItem('access_token');
        fetch(`https://lineage-api.onrender.com/api/users/${userId}/remove`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`  // Send the token in the Authorization header
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(`User with ID ${userId} removed`);
                fetchUsers();  // Re-fetch and update the user list
            } else {
                console.error('Failed to remove user');
            }
        })
        .catch(error => console.error('Error removing user:', error));
    }

    // Fetch and display users on page load
    fetchUsers();

    const sendlink = document.getElementById('send-link');
    const clearAll = document.getElementById('Clear-all');

    clearAll.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default action (like form submission)
        const accessToken = localStorage.getItem('access_token');  // Get the access token

        if (!accessToken) {
            console.error('Token is missing');
            return;  // Exit if URL or token is not provided
        }

        try {
            const response = await fetch('https://lineage-api.onrender.com/api/url', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
               }
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Link submitted successfully:', data);
                // Optionally handle success (e.g., display a message to the user)
            } else {
                console.error('Error submitting the link:', data.message);
            }
        } catch (error) {
            console.error('Error with the fetch operation:', error);
        }
    });

    sendlink.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent the default action (like form submission)
        const url = document.querySelector('.link-input').value
        
        const accessToken = localStorage.getItem('access_token');  // Get the access token

        if (!url || !accessToken) {
            console.error('URL or Access Token is missing');
            return;  // Exit if URL or token is not provided
        }

        try {
            const response = await fetch('https://lineage-api.onrender.com/api/url', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ link: url })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Link submitted successfully:', data);
                // Optionally handle success (e.g., display a message to the user)
            } else {
                console.error('Error submitting the link:', data.message);
            }
        } catch (error) {
            console.error('Error with the fetch operation:', error);
        }
    });
});
document.getElementById('create-news-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error('Access token is missing');
        return;
    }

    try {
        const response = await fetch('https://lineage-api.onrender.com/api/news', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();
        const alert = document.getElementById('alert');

        if (response.ok) {
            alert.textContent = 'News created successfully!';
            alert.classList.add('alert-success');
            alert.style.display = 'block';
            setTimeout(() => alert.style.display = 'none', 5000);

            // Optionally, clear form inputs
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        } else {
            alert.textContent = data.error || 'Failed to create news. Please try again.';
            alert.classList.add('alert-danger');
            alert.style.display = 'block';
            setTimeout(() => alert.style.display = 'none', 5000);
        }
    } catch (error) {
        console.error('Error creating news:', error);
        const alert = document.getElementById('alert');
        alert.textContent = 'An error occurred. Please try again later.';
        alert.classList.add('alert-danger');
        alert.style.display = 'block';
        setTimeout(() => alert.style.display = 'none', 5000);
    }
});
