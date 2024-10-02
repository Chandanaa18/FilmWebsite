document.addEventListener('DOMContentLoaded', () => {
    // Get stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
        alert("No user found. Please log in.");
        window.location.href = 'login.html'; // Redirect to login page if no user found
        return;
    }

    // Get the account type from stored user data
    const accountType = storedUser.accountType;

    console.log("Account type found:", accountType); // For debugging purposes

    // Redirect based on account type
    if (accountType === 'filmmaker') {
        window.location.href = 'filmmaker_profile.html'; // Redirect to filmmaker dashboard
    } else if (accountType === 'bidder') {
        window.location.href = 'filmbidder_profile.html'; // Redirect to bidder dashboard
    } else {
        alert("Invalid account type.");
    }
});
