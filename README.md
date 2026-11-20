# Drug Interaction Predictor

A desktop and web demo for entering two medicines and viewing a sample interaction result. The interface is built with React and Vite, the API uses FastAPI, and Electron can launch the built frontend as a desktop window.

> **Important:** This is an educational demo, not a medical device or a source of medical advice. Its current `/predict` endpoint uses a few hard-coded examples and returns a default result for other pairs. It does not currently use the bundled `ddi_model.pkl` file and must not be used to make treatment decisions. Ask a pharmacist or other qualified healthcare professional about possible drug interactions.

## Features

- Enter two drug names in the web interface.
- Get a JSON response containing a severity, details, and reason.
- Call the FastAPI endpoint directly or inspect it through its interactive API docs.
- Launch the built frontend in an Electron desktop window.

## Technology

- React 19, Vite 7, and JavaScript
- Electron 41
- Python 3.11, FastAPI, and Uvicorn

## Requirements

- Node.js 20.19+ or 22.12+ and npm (required by Vite 7)
- Python 3.11
- Windows PowerShell instructions are shown below; macOS/Linux users can substitute their Python executable and virtual-environment activation commands.

## Setup

Run these commands from the repository root:

```powershell
npm install
py -3.11 -m venv backend\venv
backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

If `py -3.11` is unavailable, install Python 3.11 or replace it with a Python 3.11 executable on your PATH.

## Run in a browser

Open two terminals in the repository root. Start the API in the first:

```powershell
backend\venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000
```

Start the frontend in the second:

```powershell
npm run dev
```

Open the local address printed by Vite (usually http://localhost:5173). The API documentation is available at http://127.0.0.1:8000/docs.

## Run as a desktop app

Build the frontend once, then launch Electron:

```powershell
npm run build
npm start
```

Electron loads the generated `dist` page and starts the backend from `backend`. Keep the Python environment created during setup so Electron can use its `backend\venv`.

## API

`POST /predict` accepts two drug names:

```json
{
  "drugs": ["paracetamol", "ibuprofen"]
}
```

The response has this shape:

```json
{
  "severity": "severe",
  "details": "Example interaction details.",
  "reason": "Example explanation."
}
```

The sample rules are defined in `backend/main.py`; they are not a clinically validated interaction database. The API currently expects exactly two strings in `drugs`.

## Useful commands

```powershell
npm run dev       # Start the Vite development server
npm run build     # Build the frontend into dist
npm run preview   # Preview the production frontend
npm run lint      # Run ESLint
npm start         # Launch the Electron desktop app
```

## Project layout

```text
backend/
  main.py             FastAPI application
  requirements.txt    Python dependencies
  ddi_model.pkl       Bundled model artifact (not used by the current endpoint)
src/                  React application
electron.js           Electron main process
package.json          Frontend and desktop scripts/dependencies
```

## Current limitations

- The interaction examples are hard-coded and do not cover all drug pairs.
- The included model artifact is not connected to the API yet.
- This repository does not include automated tests or a clinically validated data source.
- The desktop app expects a built frontend and a locally installed Python environment.
