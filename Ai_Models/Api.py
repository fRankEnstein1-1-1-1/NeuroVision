import json
import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

model = joblib.load("neuro_model.pkl")
meta = json.load(open("model_meta.json"))
FEATURES = meta["features"]

LABELS = {
    "rest": "Baseline / Low Arousal",
    "easy_task": "Moderate Arousal",
    "difficult_task": "Elevated Arousal",
}

class Features(BaseModel):
    heart_rate: float
    rmssd: float
    sdnn: float
    blink_rate: float
    eye_closure_pct: float
    head_movement: float
    rppg_hr: float

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(f: Features):
    X = pd.DataFrame([f.model_dump()])[FEATURES]
    state = model.predict(X)[0]
    probs = dict(zip(model.classes_, model.predict_proba(X)[0].round(3).tolist()))
    return {"state": state, "label": LABELS[state], "probabilities": probs}