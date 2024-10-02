document.getElementById('add-listing-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
    const budget = document.getElementById('budget').value;
    const genre = document.getElementById('genre').value;
    const product = document.getElementById('product').value;

    // Create a new listing object
    const newListing = {
        name: projectName,
        description: projectDescription,
        budget: budget,
        genre: genre,
        product: product
    };

    // Save the listing to localStorage (or send to the backend)
    let listings = JSON.parse(localStorage.getItem('listings')) || [];
    listings.push(newListing);
    localStorage.setItem('listings', JSON.stringify(listings));

    // Redirect back to the filmmaker profile page
    window.location.href = "filmmaker_profile.html";
});
