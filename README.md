# Netflix Clone with Movie Recommender

A full-stack Netflix-style web app with movie browsing, search, user authentication, and a content-based recommendation engine.

- **Frontend:** React + Redux Toolkit + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB (authentication and user data)
- **ML service:** Python + FastAPI (TF-IDF content-based recommender, TMDB proxy)

## Screenshots

| Login | Signup |
|-------|--------|
| ![Login]<img width="1865" height="907" alt="Screenshot 2026-10-24 215856" src="https://github.com/user-attachments/assets/dee80b01-0798-4559-a645-d3292df08c8e" />

 | ![Signup]<img width="1877" height="946" alt="Screenshot 2026-10-24 215846" src="https://github.com/user-attachments/assets/0443cccc-6e00-45f4-a107-211e2a2ac525" />
 |

| Movie details with recommendations | Recommendations loading state |
|------------------------------------|-------------------------------|
| ![Movie details](docs/screenshots/movie-details.png) | ![Loading](docs/screenshots/recommendations-loading.png) |

## Architecture

```
                        ┌──────────────────────┐
                        │   Node/Express API   │──── MongoDB
                        │  (auth, user data)   │     (users)
                        └──────────▲───────────┘
                                   │
┌────────────────────┐             │
│  React + Redux UI  │─────────────┘
│                    │
│                    │─────────────┐
└────────┬───────────┘             │
         │                ┌────────▼───────────┐
         │                │   FastAPI service  │
         │                │ TF-IDF recommender │
         │                └────────┬───────────┘
         │                         │
         └──────────┬──────────────┘
                    ▼
               TMDB API
     (movie details, posters, search)
```

1. The React app handles login/signup against the Node backend and keeps the user in Redux.
2. Movie data (details, posters, search) comes from the TMDB API.
3. On a movie details page, the frontend asks the FastAPI service for similar movies.
4. FastAPI computes cosine similarity on a pre-built TF-IDF matrix, then looks up posters on TMDB and returns ready-to-render cards.
5. The frontend maps those cards into the shape `MovieList` expects and renders a "Similar Movies" row, with a skeleton loader while the request is in flight.

## Project structure

```
Netflix/
├── netflix/                # Frontend (React + Redux)
│   └── src/
│       ├── components/     # Browse, Header, Login, MovieDetails,
│       │                   # MovieList, MovieCard, ...
│       ├── redux/          # userSlice.js, movieSlice.js, store
│       └── uitils/         # constant.js (TMDB options, API endpoints)
├── backend/                # Node + Express + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── ml-service/             # FastAPI recommender
│   ├── main.py             # FastAPI app
│   ├── df.pkl              # Movie dataframe (must contain a "title" column)
│   ├── indices.pkl         # title -> row index mapping
│   ├── tfidf_matrix.pkl    # TF-IDF matrix (scipy sparse)
│   ├── tfidf.pkl           # Fitted TF-IDF vectorizer
│   ├── requirements.txt
│   └── .env                # TMDB_API_KEY (not committed)
├── docs/screenshots/
└── README.md
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Redux Toolkit, React Router, Tailwind CSS, Axios, react-hot-toast |
| Backend | Node.js, Express, MongoDB (Mongoose) |
| ML service | Python, FastAPI, Uvicorn, pandas, NumPy, scikit-learn, httpx, python-dotenv |
| Movie data | TMDB API (live data), TMDB movie dataset (recommender training) |

## Features

- User signup, login, and logout
- Home feed by category (popular, top rated, upcoming, now playing, trending)
- Movie search by name
- Movie details page with backdrop, poster, overview, rating, and genres
- "Similar Movies" row powered by TF-IDF cosine similarity
- Loading skeletons while recommendations are fetched (no false "not found" message)
- Genre-based recommendations from TMDB as a second signal
- Redux-managed user and UI state

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.10+
- A MongoDB instance (local or Atlas)
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone

```bash
git clone https://github.com/PARTH-THAPS/Netflix-Clone.git
cd Netflix-Clone
```

### 2. ML service

Create `ml-service/.env`:

```
TMDB_API_KEY=your_tmdb_api_key
```

Make sure the four pickle files (`df.pkl`, `indices.pkl`, `tfidf_matrix.pkl`, `tfidf.pkl`) are in the `ml-service/` folder next to `main.py`. The service loads them at startup and will fail to boot if any are missing.

Then:

```bash
cd ml-service
pip install -r requirements.txt
python -m uvicorn main:app --port 8001 --reload
```

Health check: http://127.0.0.1:8001/health
Interactive API docs: http://127.0.0.1:8001/docs

### 3. Backend

Create `backend/.env` with your MongoDB connection string and JWT secret (use the variable names your code reads), then:

```bash
cd backend
npm install
npm start
```

### 4. Frontend

Create `netflix/.env`:

```
VITE_ML_API_URL=http://127.0.0.1:8001
```

Put your TMDB bearer token in the `options` object in `src/uitils/constant.js`, and set `API_END_POINT` to your backend URL.

```bash
cd netflix
npm install
npm run dev
```

Restart the dev server after changing `.env`, since environment variables are only read at startup.

## API reference

### ML service (FastAPI, port 8001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Service health check |
| GET | `/home?category=popular&limit=24` | Home feed (`trending`, `popular`, `top_rated`, `upcoming`, `now_playing`) |
| GET | `/tmdb/search?query=avatar&page=1` | Raw TMDB keyword search (multiple results) |
| GET | `/movie/id/{tmdb_id}` | Movie details by TMDB ID |
| GET | `/recommend/genre?tmdb_id=603&limit=18` | Popular movies from the movie's first genre |
| GET | `/recommend/tfidf?title=Inception&top_n=10` | TF-IDF similar titles with scores (debug) |
| GET | `/movie/search?query=Inception` | Bundle: best TMDB match, TF-IDF recommendations with posters, genre recommendations |

Example response from `/movie/search` (trimmed):

```json
{
  "query": "Lord Of The Rings",
  "movie_details": { "tmdb_id": 120, "title": "The Lord of the Rings: The Fellowship of the Ring" },
  "tfidf_recommendations": [
    {
      "title": "The Lord of the Rings: The Return of the King",
      "score": 0.212,
      "tmdb": {
        "tmdb_id": 122,
        "title": "The Lord of the Rings: The Return of the King",
        "poster_url": "https://image.tmdb.org/t/p/w500/....jpg",
        "release_date": "2003-12-17",
        "vote_average": 8.5
      }
    }
  ],
  "genre_recommendations": []
}
```

### Backend (Express)

Authentication routes (register, login, logout). See `backend/routes/` for the exact paths.

## Frontend data flow

1. The user opens a movie, and `MovieDetails` fetches its details from TMDB.
2. It then calls the ML service `/movie/search` with the movie title.
3. FastAPI looks the title up in the local TF-IDF index, ranks the most similar movies, and attaches TMDB posters.
4. The frontend converts each result to TMDB's shape (`id`, `poster_path`, ...) and passes it to `MovieList`.
5. While the request is pending, skeleton cards are shown. "No Similar Movies Found." appears only after the request finishes with an empty result.

## Known limitations

- TF-IDF recommendations only cover titles present in `df.pkl`. Movies outside the dataset (for example, very recent releases) return no similar movies.
- Title matching is an exact, case-insensitive lookup, so title variants can miss. Matching on TMDB ID would be more reliable.
- `/movie/search` fetches posters one at a time, which can be slow. A dedicated endpoint that fetches them in parallel is a planned improvement.
- CORS is currently open (`allow_origins=["*"]`) for local development. Restrict it before deploying.

## Roadmap

- [ ] Dedicated `/recommend/similar?tmdb_id=` endpoint with parallel poster fetching
- [ ] Route recommendation requests through the Node backend
- [ ] Match on TMDB ID instead of title
- [ ] Caching for TMDB poster lookups

## .gitignore

Keep secrets and large files out of the repo:

```
node_modules/
.env
__pycache__/
*.pyc
.venv/
dist/
build/
```

Consider using Git LFS or a download script for the `.pkl` files if they are large.

## Author

Parth Thaps
