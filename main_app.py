import webview
import subprocess
import os
import time

# Path to backend
BACKEND_PATH = os.path.join(os.getcwd(), "drug-predictor-backend")

# Start backend with Uvicorn
backend = subprocess.Popen(
    ["uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
    cwd=BACKEND_PATH
)

# Give backend a moment to start
time.sleep(3)

# Path to frontend build (dist/index.html)
FRONTEND_PATH = os.path.join(os.getcwd(), "drug-predictor-app", "dist", "index.html")

if not os.path.exists(FRONTEND_PATH):
    raise FileNotFoundError("⚠️ Run `npm run build` in drug-predictor-app to generate dist/ folder first!")

# Open frontend in a desktop window
webview.create_window("Drug Predictor", FRONTEND_PATH)
webview.start()

# Kill backend when window closes
backend.kill()
