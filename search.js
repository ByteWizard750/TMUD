// Mock database of songs
const songs = {
    "Blinding Lights": {
        artist: "The Weeknd",
        album: "After Hours",
        releaseYear: 2020,
        genre: "Synthwave, Pop",
        cover: "assets/images/song1.jpg",
        lyrics: "I've been tryna call...<br>I've been on my own for long enough...<br>Maybe you can show me how to love, maybe...",
        ratings: [8, 9, 7, 10] // Pre-existing ratings
    },
    "Shallow": {
        artist: "Lady Gaga & Bradley Cooper",
        album: "A Star is Born",
        releaseYear: 2018,
        genre: "Pop",
        cover: "assets/images/song2.jpg",
        lyrics: "Tell me something, girl...<br>Are you happy in this modern world?...",
        ratings: [9, 10, 10]
    },
    "Levitating": {
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        releaseYear: 2020,
        genre: "Pop",
        cover: "assets/images/song3.jpg",
        lyrics: "If you wanna run away with me, I know a galaxy and I can take you for a ride...",
        ratings: [7, 8, 8]
    }
};

// Handle the search functionality
function handleSearch(event) {
    if (event.key === "Enter") {
        const query = event.target.value.trim();
        if (songs[query]) {
            loadSongDetails(query);
        } else {
            document.getElementById("song-details").innerHTML = `<h2>No results found for "${query}"</h2>`;
        }
    }
}

// Dynamically load song details
function loadSongDetails(songName) {
    const song = songs[songName];
    const avgRating = calculateAverage(song.ratings);

    document.getElementById("song-details").innerHTML = `
        <div class="song-header">
            <img src="${song.cover}" alt="${songName} Cover">
            <div class="song-info">
                <h1>${songName}</h1>
                <p>by ${song.artist}</p>
            </div>
        </div>
        <div class="song-meta">
            <p><strong>Album:</strong> ${song.album}</p>
            <p><strong>Released:</strong> ${song.releaseYear}</p>
            <p><strong>Genre:</strong> ${song.genre}</p>
        </div>
        <div class="lyrics">
            <h3>Lyrics:</h3>
            <p>${song.lyrics}</p>
        </div>
        <div class="rating-section">
            <h3>Average Rating: <span id="average-rating">${avgRating.toFixed(1)}</span>/10</h3>
            <label for="new-rating">Rate this song:</label>
            <input type="number" id="new-rating" min="1" max="10" placeholder="1-10">
            <button onclick="addRating('${songName}')">Submit Rating</button>
        </div>
    `;
}

// Calculate average rating
function calculateAverage(ratings) {
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    return total / ratings.length;
}

// Add a new rating
function addRating(songName) {
    const newRating = parseInt(document.getElementById("new-rating").value);
    if (newRating >= 1 && newRating <= 10) {
        songs[songName].ratings.push(newRating);
        const updatedAvg = calculateAverage(songs[songName].ratings);
        document.getElementById("average-rating").innerText = updatedAvg.toFixed(1);
        alert("Thank you for your rating!");
    } else {
        alert("Please enter a valid rating between 1 and 10.");
    }
}