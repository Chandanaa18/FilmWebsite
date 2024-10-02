/*document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('Signup successful');
    } else {
        const error = await response.json();
        alert(`Signup failed: ${error.message}`);
    }
});*/
/*document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signupForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // prevent default

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                localStorage.setItem('token', data.token); // store JWT
                window.location.href = 'profile.html'; // redirect to profile
            } else {
                const error = await response.json();
                alert(`Signup failed: ${error.message}`);
            }
        } catch (err) {
            console.error(err.message);
        }
    });
});*/

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed"); // Debug information, ensuring the script is loaded

    const form = document.getElementById('signupForm');
    console.log("Form element:", form); // Debug information, ensuring the form exists

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const accountType = document.querySelector('input[name="accountType"]:checked').value;
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log("Form data:", { accountType, fullname, email, phone, username, password }); //Debug information, displaying form data

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            console.log("Response status:", response.status); // Debug information, displaying response status

            if (response.ok) {
                /*const data = await response.json();
                console.log("Response data:", data); // Debug information, displaying response data
                alert(data.message);
                localStorage.setItem('token', data.token); // store JWT token
                window.location.href = 'profile.html'; // redirect to user page */
                const data = await response.json();
                console.log("Response data:", data); // Debug information, displaying response data
                alert("Signup successful! Please log in.");
                window.location.href = 'login.html'; // redirect to login page
            } else {
                const error = await response.json();
                console.log("Error data:", error); // displaying error data
                alert(`Signup failed: ${error.message}`);
            }
        } catch (err) {
            console.error("Error:", err.message); // displaying error message
        }
    });
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Collect form data
    const accountType = document.querySelector('input[name="accountType"]:checked').value;
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if passwords match
    const passwordConfirm = document.getElementById('password_cnf').value;
    if (password !== passwordConfirm) {
        alert("Passwords do not match.");
        return;
    }

    // Save user details in localStorage (for temporary storage - should be backend in real-world)
    const user = {
        fullname,
        email,
        phone,
        username,
        password,
        accountType
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to the login page
    window.location.href = 'login.html';
});
