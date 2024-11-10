document.addEventListener("DOMContentLoaded", async () => {
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    const accessToken = localStorage.getItem('access_token'); // Check if there's an access token
    const loginLink = document.querySelector('a[href="login.html"]');


    if (accessToken) {
        try {
            // Fetch the username and admin status from the server
            const response = await fetch('https://lineage-api.onrender.com/api/get-username', { // Replace with your actual endpoint URL
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched data:', data); // Debugging step: check the response from the server

                const username = data.username; // Assuming API returns { "username": "your_username", "admin": true/false }

                if (!username) {
                    console.error('Username not found in the response');
                    return; // Stop execution if username is missing
                }

                // If user is logged in, create a new nav item for the username
                const userNavItem = document.createElement('li');
                userNavItem.classList.add('nav-item');

                const userLink = document.createElement('a');
                userLink.classList.add('nav-link');
                userLink.textContent = username; // Display the username

                // Check if the user is an admin and adjust the link
                if (data.role == true) {
                    userLink.href = 'adminpage.html'; // If user is an admin, link to the admin page
                } else {
                    userLink.href = '#sad'; // If not an admin, link goes nowhere
                }

                loginLink.parentElement.style.display = 'none'; // Hide login link

                userNavItem.appendChild(userLink);
                navbarNav.insertBefore(userNavItem, navbarNav.children[navbarNav.children.length - 1]); // Insert before the last item (Login)

                // Create Logout link
                const logoutNavItem = document.createElement('li');
                logoutNavItem.classList.add('nav-item');

                const logoutLink = document.createElement('a');
                logoutLink.classList.add('nav-link');
                logoutLink.setAttribute('id', 'logout');
                logoutLink.href = '#'; // Adjust as necessary
                logoutLink.textContent = 'Logout';

                logoutNavItem.appendChild(logoutLink);
                navbarNav.appendChild(logoutNavItem);

                // Add animation to logout link
                logoutLink.classList.add('animated'); // Add a class for animation (adjust as necessary)
                logoutLink.style.animation = 'slideDown 0.6s ease forwards';
                logoutLink.style.animationDelay = '1.2s'; // Add delay for the logout link to match staggered effect

                // Add event listener for logout
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Clear the local storage and refresh the page
                    localStorage.removeItem('access_token');
                    location.reload(); // Refresh the page to update the navbar
                });

                // Optionally, hide the login link
                loginLink.parentElement.style.display = 'none'; // Hide login link
            } else {
                console.log('Failed to retrieve username. Token may be invalid or expired.');
                // Optionally, handle token expiration here (e.g., redirect to login page)
                localStorage.removeItem('access_token');
                location.reload();
            }
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    } else {
        console.log('No access token found');
    }

    
});
