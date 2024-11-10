document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Prepare the request
    const requestData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('https://lineage-api.onrender.com/api/login', { // Replace with your actual API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Handle response
        if (response.ok) {
            const data = await response.json();
            // Save only tokens, no username
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            window.location.href = 'index.html'; // Redirect to dashboard or home page
        } else {
            const errorData = await response.json();
            // Display error message
            document.getElementById('alert').textContent = errorData.error;
            document.getElementById('alert').className = 'alert error'; // Add appropriate error class
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('alert').textContent = 'An unexpected error occurred. Please try again later.';
        document.getElementById('alert').className = 'alert error';
    }
});
