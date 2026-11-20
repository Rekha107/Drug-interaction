import { app, BrowserWindow } from "electron";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let backendProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  const indexPath = path.join(__dirname, "dist", "index.html");
  win.loadFile(indexPath);
}

app.whenReady().then(() => {
  const backendDir = path.join(__dirname, "backend");
  const venvPython = path.join(
    backendDir,
    "venv",
    "Scripts",
    "python.exe"
  );
  const pythonExecutable = fs.existsSync(venvPython)
    ? venvPython
    : process.platform === "win32"
      ? "py"
      : "python";

  backendProcess = spawn(
    pythonExecutable,
    ["-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
    {
      cwd: backendDir,
      shell: false,
    }
  );

  backendProcess.stdout.on("data", (data) => {
    console.log(`[Backend] ${data}`);
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(`[Backend error] ${data}`);
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    backendProcess?.kill();
    app.quit();
  }
});
