import joblib
from fastapi import FastAPI,HTTPException
from sklearn.metrics.pairwise import cosine_similarity

app=FastAPI()

movies = joblib.load("movies.pkl")
vectors = joblib.load("vectors.pkl")