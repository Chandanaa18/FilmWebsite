document.addEventListener('DOMContentLoaded', function() {
    // Simulated bid data (this can be replaced with an API call or dynamic data from a backend)
    const bids = [
        { id: 1, projectName: "Action Thriller", amount: 500, status: "active", date: "2024-09-15" },
        { id: 2, projectName: "Comedy Special", amount: 200, status: "active", date: "2024-09-20" },
        { id: 3, projectName: "Documentary Series", amount: 1000, status: "past", date: "2024-08-05" },
        { id: 4, projectName: "Romantic Drama", amount: 700, status: "past", date: "2024-08-25" }
    ];

    const activeBidsList = document.getElementById('active-bids-list');
    const pastBidsList = document.getElementById('past-bids-list');
    const activeBidsCount = document.getElementById('active-bids-count');
    const pastBidsCount = document.getElementById('past-bids-count');
    const highestBidValue = document.getElementById('highest-bid-value');

    // Filter bids into active and past
    const activeBids = bids.filter(bid => bid.status === "active");
    const pastBids = bids.filter(bid => bid.status === "past");

    // Display active bids
    activeBids.forEach(bid => {
        const bidItem = `
            <div>
                <h3>${bid.projectName}</h3>
                <p>Bid Amount: $${bid.amount}</p>
                <p>Date: ${bid.date}</p>
                <p>Status: Active</p>
            </div>`;
        activeBidsList.innerHTML += bidItem;
    });

    // Display past bids
    pastBids.forEach(bid => {
        const bidItem = `
            <div>
                <h3>${bid.projectName}</h3>
                <p>Bid Amount: $${bid.amount}</p>
                <p>Date: ${bid.date}</p>
                <p>Status: Completed</p>
            </div>`;
        pastBidsList.innerHTML += bidItem;
    });

    // Update counts
    activeBidsCount.textContent = activeBids.length;
    pastBidsCount.textContent = pastBids.length;

    // Find highest bid
    const highestBid = Math.max(...bids.map(bid => bid.amount));
    highestBidValue.textContent = `$${highestBid}`;

    
});


