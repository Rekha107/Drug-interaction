# Drug Interaction Predictor

A React/Vite frontend with a FastAPI backend. The desktop app uses Electron.

## Requirements

- Node.js and npm
- Python 3.11

## Install

From the project root, install the frontend dependencies:

```powershell
npm install
```

Set up the backend virtual environment and dependencies:

```powershell
py -3.11 -m venv backend\venv
backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

## Run the desktop app

```powershell
npm start
```

Electron starts the backend automatically.

## Run in a browser

Start the backend in one terminal:

```powershell
backend\venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000
```

Start the frontend in another terminal:

```powershell
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).
