// Search Configuration
const searchConfig = {
    minQueryLength: 2,
    maxResults: 10,
    fuzzyThreshold: 0.6
};

// Enhanced Song Database
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
        tags: ["pop", "synthwave", "retro", "80s"]
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
        tags: ["pop", "soundtrack", "ballad", "duet"]
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
        tags: ["pop", "disco", "dance", "funk"]
    }
];

// Fuzzy Search Implementation
function fuzzyMatch(query, text) {
    const queryWords = query.toLowerCase().split(' ');
    const textWords = text.toLowerCase().split(' ');
    
    return queryWords.some(qWord => 
        textWords.some(tWord => 
            tWord.includes(qWord) || 
            calculateSimilarity(qWord, tWord) > searchConfig.fuzzyThreshold
        )
    );
}

// Calculate string similarity using Levenshtein distance
function calculateSimilarity(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    const distance = matrix[len1][len2];
    const maxLength = Math.max(len1, len2);
    return 1 - distance / maxLength;
}

// Enhanced Search Function
function searchSongs(query) {
    try {
        if (!query || query.length < searchConfig.minQueryLength) {
            throw new Error(`Please enter at least ${searchConfig.minQueryLength} characters`);
        }

        const results = songDatabase.filter(song => {
            const searchableText = [
                song.title,
                song.artist,
                song.album,
                song.genre,
                ...song.tags
            ].join(' ').toLowerCase();

            return fuzzyMatch(query, searchableText);
        });

        if (results.length === 0) {
            throw new Error(`No results found for "${query}"`);
        }

        return results.slice(0, searchConfig.maxResults);
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}

// Handle Search
function handleSearch(event) {
    try {
        if (event.key === "Enter") {
            const query = event.target.value.trim();
            const results = searchSongs(query);
            displaySearchResults(results);
        }
    } catch (error) {
        displaySearchError(error.message);
    }
}

// Display Search Results
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
        return;
    }

    const resultsHTML = results.map(song => `
        <div class="search-result-card">
            <img src="${song.image}" alt="${song.title}" loading="lazy">
            <div class="result-info">
                <h3>${song.title}</h3>
                <p class="artist">${song.artist}</p>
                <p class="album">${song.album}</p>
                <div class="tags">
                    ${song.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.round(song.rating))}${'☆'.repeat(5 - Math.round(song.rating))}</span>
                    <span class="rating-count">(${song.totalRatings} ratings)</span>
                </div>
            </div>
            <a href="song-details.html?song=${song.id}" class="view-details-btn">View Details</a>
        </div>
    `).join('');

    resultsContainer.innerHTML = `
        <h2>Search Results</h2>
        <div class="search-results-grid">
            ${resultsHTML}
        </div>
    `;
}

// Display Search Error
function displaySearchError(message) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = `
        <div class="search-error">
            <p>${message}</p>
            <button onclick="clearSearch()" class="clear-search-btn">Clear Search</button>
        </div>
    `;
}

// Clear Search
function clearSearch() {
    const searchInput = document.getElementById('search-bar');
    const resultsContainer = document.getElementById('search-results');
    
    searchInput.value = '';
    resultsContainer.innerHTML = '';
}

// Initialize Search
function initSearch() {
    const searchInput = document.getElementById('search-bar');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);