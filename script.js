console.log('script.js loaded and running!');

// Song Database
const songDatabase = [
    {
        id: "blinding-lights",
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        genre: "Synthwave",
        releaseDate: "November 29, 2019",
        description: "Blinding Lights is a hit song by The Weeknd known for its retro synthwave vibes.",
        image: "assets/images/song1.jpg",
        rating: 8.5,
        totalRatings: 100,
        ratingSum: 850,
    },
    {
        id: "shallow",
        title: "Shallow",
        artist: "Lady Gaga & Bradley Cooper",
        album: "A Star Is Born",
        genre: "Pop",
        releaseDate: "October 5, 2018",
        description: "Shallow is a song from the movie 'A Star Is Born', featuring powerful vocals and emotional depth.",
        image: "assets/images/song2.jpg",
        rating: 9.0,
        totalRatings: 50,
        ratingSum: 450,
    },
    {
        id: "levitating",
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        genre: "Disco-pop",
        releaseDate: "October 1, 2020",
        description: "Levitating is a funky disco-pop hit by Dua Lipa, featuring upbeat rhythms and catchy lyrics.",
        image: "assets/images/song3.jpg",
        rating: 8.8,
        totalRatings: 80,
        ratingSum: 640,
    },
];

// Redirect to Home Page
function redirectToHome() {
    window.location.href = "index.html";
}

// Handle Search Functionality
function handleSearch(event) {
    if (event.key === "Enter") {
        const query = document.getElementById("search-bar").value.trim().toLowerCase();
        const searchResults = document.getElementById("search-results");
        searchResults.innerHTML = ""; // Clear previous results

        const result = songs.find(song => song.title.toLowerCase() === query);

        if (result) {
            searchResults.innerHTML = `
                <h2>Search Results</h2>
                <p><strong>Title:</strong> ${result.title}</p>
                <p><strong>Artist:</strong> ${result.artist}</p>
                <p><strong>Album:</strong> ${result.album}</p>
                <p><strong>Year:</strong> ${result.year}</p>
                <p><strong>Description:</strong> ${result.description}</p>
            `;
        } else {
            searchResults.innerHTML = `
                <h2>Search Results</h2>
                <p class="no-results">No results found for "${query}". Try another song!</p>
            `;
        }
    }
}

// Display Search Results
function displaySearchResults(results) {
    const resultsHTML = results
        .map(
            (song) => `
        <div class="search-result-card">
            <img src="${song.image}" alt="${song.title}" />
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <a href="song-details.html?song=${song.id}" class="btn">View Details</a>
        </div>
    `
        )
        .join("");

    const resultsContainer = document.createElement("div");
    resultsContainer.innerHTML = `
        <h2>Search Results</h2>
        <div class="search-results-container">
            ${resultsHTML}
        </div>
    `;

    const header = document.querySelector("header");
    document.body.innerHTML = "";
    document.body.appendChild(header);
    document.body.appendChild(resultsContainer);
}

// Placeholder for song details
const songData = {
    title: "Song Title",
    artist: "John Doe",
    album: "Sample Album",
    genre: "Pop",
    releaseDate: "Jan 1, 2024",
    description: "This is a sample description of the song.",
    cover: "cover.jpg",
    ratings: [5, 4, 3, 4, 5], // Existing ratings
};

// Authentication State with Local Storage
let authState = {
    isAuthenticated: false,
    currentUser: null
};

// Initialize auth state from localStorage
function initAuthState() {
    const savedAuth = localStorage.getItem('authState');
    if (savedAuth) {
        authState = JSON.parse(savedAuth);
        updateUIForAuth();
    }
}

// Save auth state to localStorage
function saveAuthState() {
    localStorage.setItem('authState', JSON.stringify(authState));
}

// Handle Authentication
async function handleAuth(formType) {
    try {
        const form = document.getElementById(`${formType}Form`);
        form.classList.add('loading');
        let formData;
        if (formType === 'login') {
            formData = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };
        } else {
            formData = {
                name: document.getElementById('signupName').value,
                email: document.getElementById('signupEmail').value,
                password: document.getElementById('signupPassword').value
            };
        }
        // Validate form data
        if (!validateFormData(formData)) {
            throw new Error('Invalid form data');
        }
        // Simulate API call (replace with actual API call)
        const response = await simulateAuthAPI(formType, formData);
        if (response.success) {
            authState.isAuthenticated = true;
            authState.currentUser = response.user;
            saveAuthState();
            showAuthFeedback(`${formType === 'login' ? 'Welcome back, ' + response.user.name + '!' : 'Account created! Welcome, ' + response.user.name + '!'}`, 'success');
            setTimeout(() => {
                closeAuthInterface();
                updateUIForAuth();
            }, 1200);
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        showAuthFeedback(error.message, 'error');
    } finally {
        const form = document.getElementById(`${formType}Form`);
        form.classList.remove('loading');
    }
}

// Form Validation
function validateFormData(formData) {
    const { email, password, name } = formData;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    // Password validation
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

    // Name validation for signup
    if (formData.name && name.length < 2) {
        throw new Error('Name must be at least 2 characters long');
    }

    return true;
}

// Simulate API call (replace with actual API call)
async function simulateAuthAPI(formType, formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (formType === 'login') {
                // Check if user exists in localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === formData.email && u.password === formData.password);
                
                if (user) {
                    resolve({
                        success: true,
                        user: {
                            name: user.name,
                            email: user.email
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid email or password'
                    });
                }
            } else {
                // Signup - save user to localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.some(u => u.email === formData.email)) {
                    resolve({
                        success: false,
                        message: 'Email already registered'
                    });
                } else {
                    users.push({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    });
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    resolve({
                        success: true,
                        user: {
                            name: formData.name,
                            email: formData.email
                        }
                    });
                }
            }
        }, 1000);
    });
}

// Show Error Message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const authInterface = document.getElementById('authInterface');
    const existingError = authInterface.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    authInterface.insertBefore(errorDiv, authInterface.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Show Success Message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const authInterface = document.getElementById('authInterface');
    const existingSuccess = authInterface.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    authInterface.insertBefore(successDiv, authInterface.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Update UI based on authentication state
function updateUIForAuth() {
    const loginIcon = document.querySelector('.login-icon');
    if (authState.isAuthenticated) {
        loginIcon.src = 'Images/1713924.webp'; // Using existing image
        loginIcon.title = authState.currentUser.name;
        loginIcon.onclick = handleLogout;
        
        // Show user info in console for debugging
        console.log('Current User:', authState.currentUser);
        console.log('All Users:', JSON.parse(localStorage.getItem('users') || '[]'));
    } else {
        loginIcon.src = 'Images/1713924.webp';
        loginIcon.title = 'Login';
        loginIcon.onclick = toggleAuthInterface;
    }
}

// Handle Logout
function handleLogout() {
    authState.isAuthenticated = false;
    authState.currentUser = null;
    saveAuthState();
    updateUIForAuth();
    showSuccessMessage('Logged out successfully!');
}

// Toggle Authentication Interface
function toggleAuthInterface() {
    const authInterface = document.getElementById('authInterface');
    const overlay = document.getElementById('overlay');
    
    authInterface.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    
    // Reset forms when opening
    if (!authInterface.classList.contains('hidden')) {
        document.getElementById('loginForm').reset();
        document.getElementById('signupForm').reset();
    }
}

// Close Authentication Interface
function closeAuthInterface() {
    const authInterface = document.getElementById('authInterface');
    const overlay = document.getElementById('overlay');
    
    authInterface.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Switch Authentication Tab
function switchAuthTab(tab) {
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (tab === "login") {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
    } else {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
    }
}

// Show feedback message in the auth interface
function showAuthFeedback(message, type = 'success') {
    const authInterface = document.getElementById('authInterface');
    let feedback = document.getElementById('authFeedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'authFeedback';
        feedback.style.marginBottom = '15px';
        feedback.style.textAlign = 'center';
        feedback.style.fontWeight = 'bold';
        authInterface.insertBefore(feedback, authInterface.children[1]);
    }
    feedback.textContent = message;
    feedback.style.color = type === 'success' ? '#1DB954' : '#e74c3c';
    feedback.style.background = type === 'success' ? 'rgba(29,185,84,0.1)' : 'rgba(231,76,60,0.1)';
    feedback.style.borderRadius = '6px';
    feedback.style.padding = '8px 0';
    setTimeout(() => {
        if (feedback) feedback.remove();
    }, 2500);
}

// Function to populate song details
function loadSongDetails() {
    document.getElementById("song-title").textContent = songData.title;
    document.getElementById("song-artist").textContent = `Artist: ${songData.artist}`;
    document.getElementById("song-album").textContent = `Album: ${songData.album}`;
    document.getElementById("song-genre").textContent = `Genre: ${songData.genre}`;
    document.getElementById("song-release").textContent = `Release Date: ${songData.releaseDate}`;
    document.getElementById("song-description").textContent = `Description: ${songData.description}`;
    document.getElementById("song-cover").src = songData.cover;
    updateAverageRating();
}

// Example Song Data
const songData = {
    id: "1",
    title: "Blinding Lights",
    ratings: [5, 4, 4, 5], // Example initial ratings
};

// Function to update the average rating dynamically
function updateAverageRating() {
    const avgRating = (
        songData.ratings.reduce((acc, curr) => acc + curr, 0) / songData.ratings.length
    ).toFixed(1);

    document.getElementById("average-rating").innerHTML = `
        Average Rating: <span id="avg-rating">${avgRating}</span> (${songData.ratings.length} ratings)
    `;
}

// Function to handle rating submission
function submitRating() {
    const rating = parseInt(document.getElementById("rating").value); // Get rating from input
    if (rating >= 1 && rating <= 5) {
        songData.ratings.push(rating); // Add the new rating
        updateAverageRating(); // Update the displayed average rating
        alert("Thank you for rating!"); // Confirm to the user
    } else {
        alert("Please select a valid rating between 1 and 5.");
    }
}

// Load song details on page load
function loadSongDetails() {
    document.getElementById("song-title").textContent = songData.title;
    updateAverageRating(); // Initialize the average rating display
}

window.onload = loadSongDetails;

// Event Listeners
if (window.location.pathname.includes("song-details.html")) {
    document.addEventListener("DOMContentLoaded", loadSongDetails);
}

function loadSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query")?.toLowerCase();

    const results = songDatabase.filter(
        (song) =>
            song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );

    const resultsContainer = document.getElementById("search-results");
    if (results.length > 0) {
        resultsContainer.innerHTML = results
            .map(
                (song) => `
            <div class="search-result-card">
                <img src="${song.image}" alt="${song.title}" />
                <h3>${song.title}</h3>
                <p>Artist: ${song.artist}</p>
                <a href="song-details.html?song=${song.id}" class="btn">View Details</a>
            </div>
        `
            )
            .join("");
    } else {
        resultsContainer.innerHTML = `<p>No results found for "${query}". Try another search!</p>`;
    }
}

// Load results when the page loads
document.addEventListener("DOMContentLoaded", loadSearchResults);

// Initialize auth state when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure only login form is visible on load
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    // Add debug button
    const debugButton = document.createElement('button');
    debugButton.textContent = 'View Saved Data';
    debugButton.onclick = viewSavedData;
    debugButton.style.position = 'fixed';
    debugButton.style.bottom = '10px';
    debugButton.style.right = '10px';
    debugButton.style.padding = '10px';
    debugButton.style.background = '#45a29e';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.borderRadius = '5px';
    debugButton.style.cursor = 'pointer';
    document.body.appendChild(debugButton);
});

// View Saved Data (for debugging)
function viewSavedData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const authState = JSON.parse(localStorage.getItem('authState') || '{}');
    
    console.log('All Users:', users);
    console.log('Auth State:', authState);
    
    // Show in UI
    const debugInfo = document.createElement('div');
    debugInfo.className = 'debug-info';
    debugInfo.innerHTML = `
        <h3>Debug Information</h3>
        <p>Total Users: ${users.length}</p>
        <p>Current Auth State: ${JSON.stringify(authState)}</p>
    `;
    
    const existingDebug = document.querySelector('.debug-info');
    if (existingDebug) {
        existingDebug.remove();
    }
    
    document.body.appendChild(debugInfo);
}

