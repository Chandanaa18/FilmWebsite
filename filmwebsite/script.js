document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    if (token) {
        // display users info
        const emailElement = document.getElementById('email');
        const usernameElement = document.getElementById('username');

        if (emailElement) {
            emailElement.textContent = email;
        }
        if (usernameElement) {
            usernameElement.textContent = username;
        }

        //display/hide concerning button
        document.getElementById('profile-btn').style.display = 'block';
        document.querySelector('a[href="profile_section/signup.html"]').style.display = 'none';
        document.querySelector('a[href="profile_section/login.html"]').style.display = 'none';

        // add logout event listener
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                localStorage.removeItem('username');
                alert('You have been logged out.');
                window.location.href = 'profile_section/login.html';
            });
        }

        // add fetch admin dashboard event listener
        const fetchDashboardButton = document.getElementById('fetchDashboard');
        if (fetchDashboardButton) {
            fetchDashboardButton.addEventListener('click', async () => {
                if (!token) {
                    alert('No token found. Please log in.');
                    return;
                }

                try {
                    const response = await fetch('http://localhost:5000/api/admin/dashboard', {
                        method: 'GET',
                        headers: {
                            'x-auth-token': token
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    document.getElementById('dashboardData').textContent = JSON.stringify(data, null, 2);
                } catch (error) {
                    console.error('Error fetching admin dashboard:', error);
                }
            });
        }

    }
});

// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})



// rotate text js code 
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char, i) =>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");


// switch between about buttons 

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contents.forEach(content => content.style.display = 'none');
        contents[index].style.display = 'block';
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});



// portfolio fillter 

var mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});


// Initialize swiperjs 

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});



//   skill Progress bar 

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
    if (!skillsPlayed)
        skillsCounter();
})


function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum)
        }, 12)
    }
}


let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}


// side progress bar 

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu() {
    let len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) { }
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// scroll reveal

ScrollReveal({
    distance: "90px",
    duration: 2000,
    delay: 200,
    // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });

document.getElementById('filter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect filter data
    const budget = document.getElementById('budget').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    
    // Create an object to store filter criteria
    const filterCriteria = {
        budget: budget,
        genre: genre,
        duration: duration
    };
    
    // Convert object to query string for API request
    const queryString = new URLSearchParams(filterCriteria).toString();
    
    // Send request to the server to fetch filtered data (replace '/api/projects' with actual endpoint)
    fetch(`/api/projects?${queryString}`)
        .then(response => response.json())
        .then(data => {
            // Handle the filtered results (e.g., update the project listings on the page)
            console.log('Filtered results:', data);
        })
        .catch(error => console.error('Error fetching filtered data:', error));
});


document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const videoUpload = document.getElementById('video-upload').files[0];
    const portfolioLink = document.getElementById('portfolio-link').value;
    const filmography = document.getElementById('filmography').value;

    // Handle video upload (you'd need to send this to the backend)
    if (videoUpload) {
        const videoSource = document.getElementById('video-source');
        const uploadedVideo = document.getElementById('uploaded-video');
        const videoURL = URL.createObjectURL(videoUpload);

        videoSource.src = videoURL;
        uploadedVideo.style.display = 'block';
    }

    // Display portfolio link
    if (portfolioLink) {
        const portfolioLinkDisplay = document.getElementById('portfolio-link-display');
        portfolioLinkDisplay.href = portfolioLink;
        portfolioLinkDisplay.innerText = "Visit Your Portfolio";
    }

    // Display filmography
    if (filmography) {
        const filmographyList = document.getElementById('filmography-list');
        filmographyList.innerHTML = '';

        filmography.split('\n').forEach(film => {
            if (film.trim() !== '') {
                const listItem = document.createElement('li');
                listItem.innerText = film;
                filmographyList.appendChild(listItem);
            }
        });
    }
    
    // You would send this data to your backend here
    console.log("Form submitted with:", { videoUpload, portfolioLink, filmography });
});

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


document.addEventListener('DOMContentLoaded', function() {
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    // Clear existing listings
    swiperWrapper.innerHTML = '';

    // Loop through the stored listings and display them
    listings.forEach(listing => {
        const projectItem = `
            <div class="servicesItem swiper-slide">
                <div class="img-serv">
                    <img src="img/blog/tucson.png" alt="Project Image"> <!-- Replace with actual image URL if needed -->
                </div>
                <h3>${listing.name}</h3>
                <p>${listing.description}</p>
                <a href="#" class="readMore">Read More</a>
            </div>`;
        
        swiperWrapper.innerHTML += projectItem; // Append the new item to the swiper wrapper
    });
});

window.location.href = 'profile/filmmaker_profile.html'; 
window.location.href = 'profile/filmbidder_profile.html';