document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submit');
  
  if (submitButton) {
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault();  // Prevent the default form submission

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);

          // Store token and user details in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({
            email: email,
            accountType: data.accountType,  // Save account type
            username: data.username // Assuming the API returns username
          }));

          // Redirect based on account type
          if (data.accountType === 'filmmaker') {
            window.location.href = '/profile_section/filmmaker_profile.html';  // Redirect to filmmaker profile
          } else if (data.accountType === 'bidder') {
            window.location.href = '/profile_section/filmbidder_profile.html';  // Redirect to bidder profile
          } else {
            alert('Invalid account type.');
          }
        } else {
          const error = await response.json();
          alert(`Login failed: ${error.message}`);
        }
      } catch (err) {
        console.error('Login error:', err.message);
      }
    });
  } else {
    console.error('Submit button not found');
  }
});
