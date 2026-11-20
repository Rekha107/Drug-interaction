from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DrugRequest(BaseModel):
    drugs: list[str]

@app.post("/predict")
def predict_interaction(request: DrugRequest):
    drug1, drug2 = request.drugs

    # ⚠️ Simple demo logic (replace with ML/DB later)
    if drug1.lower() == "paracetamol" and drug2.lower() == "ibuprofen":
        return {
            "severity": "severe",
            "details": "Combining Paracetamol and Ibuprofen may increase the risk of stomach bleeding.",
            "reason": "Both drugs affect the gastrointestinal tract, making them risky when taken together in high doses."
        }
    elif drug1.lower() == "paracetamol" and drug2.lower() == "aspirin":
        return {
            "severity": "moderate",
            "details": "Paracetamol and Aspirin may increase liver strain if taken together.",
            "reason": "Both drugs are processed by the liver, raising the risk of liver toxicity."
        }
    else:
        return {
            "severity": "safe",
            "details": f"No significant interaction found between {drug1} and {drug2}.",
            "reason": "No overlapping metabolic or adverse pathways detected."
        }
