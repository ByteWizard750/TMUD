# 🎵 TMUD – The Music Universe Database

TMUD is a clean, professional-grade web platform that connects users to an extensive world of music, metadata, and discovery. Built using the Spotify API, TMUD empowers users to explore tracks, artists, and albums with ease and precision.

---

## 🚀 Features

- 🔍 Search songs, albums, or artists from Spotify's global catalog
- 🎧 Access full metadata: album art, duration, release date, genres, etc.
- 🎨 Modern, responsive UI for immersive browsing
- 🔐 Secure OAuth login via Spotify
- 🛠️ Modular backend architecture (API-ready)

---

## 📦 Tech Stack

| Frontend           | Backend (Upcoming)    | Integrations   |
|--------------------|------------------------|----------------|
| HTML, CSS, JavaScript | FastAPI / Django (in progress) | Spotify Web API |

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/ByteWizard750/TMUD.git
cd TMUD

# Set up virtual environment (Mac/Linux)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file for environment variables
touch .env

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:5000/callback
