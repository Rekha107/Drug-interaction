import { useState } from "react";

function App() {
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drugs: [drug1, drug2] }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">💊 Drug Interaction Predictor</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter first drug"
          value={drug1}
          onChange={(e) => setDrug1(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Enter second drug"
          value={drug2}
          onChange={(e) => setDrug2(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Predict
        </button>
      </div>

      {result && (
        <div className="bg-white shadow rounded p-4 w-1/2">
          <h2 className="text-xl font-semibold mb-2">Prediction Result:</h2>
          <pre className="text-gray-700">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
