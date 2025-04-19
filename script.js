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

/// Toggle the display of the auth interface
function toggleAuthInterface() {
    const authInterface = document.getElementById("authInterface");
    authInterface.classList.toggle("hidden");
}

// Switch between login and signup tabs
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

