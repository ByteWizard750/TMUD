# 🎵 TMUD – The Music Universe Database

TMUD is an elegant and powerful platform that connects music lovers with a vast universe of tracks, artists, lyrics, and metadata using the Spotify API.

---

## 🚀 Features

- 🔍 Search songs, albums, or artists from Spotify's massive library
- 🎧 Get metadata like genre, album cover, release date, and duration
- 💬 Lyric-based song discovery *(coming soon)*
- 🎨 Clean, responsive UI for a seamless user experience
- 🔐 OAuth-based Spotify Login
- 🌐 Built with modern web technologies

---

## 📦 Tech Stack

| Frontend | Backend | APIs     |
|----------|---------|----------|
| HTML, CSS, JS | To be decided (current: Flask, switching soon) | Spotify API |

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/ByteWizard750/TMUD.git
cd TMUD

# Install dependencies
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create your .env file
touch .env
# Add your credentials:
# SPOTIFY_CLIENT_ID=your_id
# SPOTIFY_CLIENT_SECRET=your_secret
# SPOTIFY_REDIRECT_URI=http://localhost:5000/callback

# Run the server
python3 app.py
