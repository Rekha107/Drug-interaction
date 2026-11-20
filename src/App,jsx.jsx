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

  // Helper for severity-based colors
  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case "safe":
        return "bg-green-50 border-green-500 text-green-700";
      case "moderate":
        return "bg-yellow-50 border-yellow-500 text-yellow-700";
      case "severe":
        return "bg-red-50 border-red-500 text-red-700";
      default:
        return "bg-gray-50 border-gray-400 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">
        💊 Drug Interaction Predictor
      </h1>

      {/* Input Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter first drug"
          value={drug1}
          onChange={(e) => setDrug1(e.target.value)}
          className="border border-gray-300 p-2 rounded w-48 focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Enter second drug"
          value={drug2}
          onChange={(e) => setDrug2(e.target.value)}
          className="border border-gray-300 p-2 rounded w-48 focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Predict
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            📋 Interaction Report
          </h2>

          <div className="mb-4">
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-medium">Drug 1:</span> {drug1}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-medium">Drug 2:</span> {drug2}
            </p>
          </div>

          {/* Severity box */}
          <div
            className={`border-l-6 p-6 rounded-lg text-lg font-medium ${getSeverityStyles(
              result.severity
            )}`}
          >
            <p>
              {result.severity === "safe" && "✅ These drugs are safe together."}
              {result.severity === "moderate" &&
                "⚠️ Moderate interaction detected."}
              {result.severity === "severe" && "🚨 Severe interaction detected!"}
            </p>
          </div>

          {/* Detailed Explanation */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              🧾 Details:
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {result.details ||
                "This combination may lead to side effects. Please consult a healthcare provider for safe alternatives."}
            </p>

            {result.reason && (
              <p className="text-gray-600 text-lg mt-4 italic">
                💡 Why they are not a perfect duo: {result.reason}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
