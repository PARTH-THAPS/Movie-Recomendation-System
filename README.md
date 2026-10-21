# Netflix Clone with Movie Recommender

A full-stack Netflix-style web app with movie browsing, search, and a content-based recommendation engine.

- **Frontend:** React + Redux Toolkit
- **Backend:** Node.js + Express + MongoDB
- **ML service:** Python + FastAPI (content-based recommender)

## Architecture

```
React + Redux  -->  Node/Express API  -->  FastAPI ML service
   (UI, state)         |                     (recommendations)
                       v
                    MongoDB
                 (users, data)
```

1. The React app shows movies, search results, and a "More like this" row.
2. The Node backend handles API routes and database access, and forwards recommendation requests to the ML service.
3. The FastAPI service finds movies similar to a given movie and returns their TMDB IDs.
4. The frontend uses those IDs to fetch posters and details from TMDB and renders them with `MovieList`.

## Project structure

```
Netflix/
├── netflix/            # Frontend (React + Redux)
│   ├── public/
│   └── src/
│       ├── components/ # Browse, MainContainer, VideoBackground,
│       │               # MovieList, MovieCard, SearchMovie
│       ├── redux/      # movieSlice.js and store
│       └── App.js
├── backend/            # Node + Express + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── ml-service/         # FastAPI recommender
│   ├── data/           # TMDB CSV files (not committed)
│   ├── build_model.py  # Trains the model, creates .pkl files
│   ├── main.py         # FastAPI app
│   └── requirements.txt
└── README.md
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express, MongoDB (Mongoose), Axios |
| ML service | Python, FastAPI, Uvicorn, pandas, scikit-learn, joblib |
| Movie data | TMDB API (live data), TMDB 5000 dataset (recommender training) |

## Features

- Browse movies by category with a video background hero section
- Search movies by name
- Redux-managed movie state (`movieSlice.js`)
- Backend REST API with MongoDB storage
- Content-based "More like this" recommendations powered by a FastAPI microservice



### 1. Clone

```bash
git clone https://github.com/PARTH-THAPS/Netflix-Clone.git
cd Netflix-Clone
```

### 2. ML service

Download the **TMDB 5000 Movie Dataset** from Kaggle:

Place these files in `ml-service/data/`:

- `tmdb_5000_movies.csv`
- `tmdb_5000_credits.csv`

Then:

```bash
cd ml-service
pip install -r requirements.txt
python build_model.py                                # creates movies.pkl and vectors.pkl
python -m uvicorn main:app --port 8000 --reload
```

Interactive API docs: http://localhost:8000/docs

### 3. Backend

```bash
cd backend
npm install
npm start
```


### 4. Frontend

```bash
cd netflix
npm install
npm start
```

Add your TMDB key to the frontend environment/config, for example:

```
REACT_APP_TMDB_KEY=your_tmdb_api_key
```

## API reference

### ML service (FastAPI, port 8000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/recommend?title=Avatar&n=10` | Similar movies by title |
| GET | `/recommend/id/{movie_id}?n=10` | Similar movies by TMDB ID |

Example response:

```json
[
  { "id": 285, "title": "Pirates of the Caribbean: At World's End", "score": 0.42 }
]
```

### Backend (Express)



## Frontend data flow

1. A user opens a movie or searches for one.
2. The frontend calls the backend `/api/recommend/:id`. (In Progress)
3. The backend calls FastAPI and returns the recommended TMDB IDs. (In Progress)
4. The frontend fetches details and posters from TMDB for each ID. 
5. Results are stored in Redux (`movieSlice`) and rendered in a `MovieList` row.

## .gitignore

Keep large or private files out of the repo




## Author

Parth Thaps
