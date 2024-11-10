document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Basic validation before sending data
    if (!data.username || !data.email || !data.password || !data.confirm_password || !data.birthdate) {
        showAlert('All fields are required.', 'error');
        return;
    }

    // Check if passwords match
    if (data.password !== data.confirm_password) {
        showAlert('Passwords do not match.', 'error');
        return;
    }

    try {
        // Make API call to register the user
        const response = await fetch('https://lineage-api.onrender.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                date: data.birthdate,
                password: data.password
            })
        });

        const result = await response.json();
        const alert = document.getElementById('alert');

        if (response.ok) {
            showAlert('Confirm your email. Check your inbox to complete the registration!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect after success
            }, 3000);  // Wait for 3 seconds before redirect
        } else {
            showAlert(result.error || 'Error creating account. Please try again.', 'error');
        }

    } catch (error) {
        console.error(error);
    }
});

// Helper function to show alerts
function showAlert(message, type) {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.classList.remove('show', 'error', 'success'); // Reset alert classes
    alert.classList.add('show', type); // Add appropriate class
    setTimeout(() => {
        alert.classList.remove('show'); // Hide alert after 3 seconds
    }, 3000);
}
