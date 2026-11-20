import { useState } from 'react';
   import { Bar } from 'react-chartjs-2';
   import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
   import { saveAs } from 'file-saver';
   import './index.css';

   ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

   function App() {
     const [drugs, setDrugs] = useState([]);
     const [prediction, setPrediction] = useState(null);

     const handlePredict = async () => {
       try {
         const res = await fetch('http://localhost:8000/predict', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ drugs }),
         });
         if (!res.ok) throw new Error('Network error');
         const data = await res.json();
         setPrediction(data);
       } catch (error) {
         console.error('Error fetching prediction:', error);
         setPrediction({ severity: 'Error', explanation: 'Failed to fetch prediction' });
       }
     };

     const downloadChart = () => {
       const canvas = document.getElementsByTagName('canvas')[0];
       if (canvas) canvas.toBlob(blob => saveAs(blob, 'severity_chart.png'));
     };

     const chartData = {
       labels: ['Severity'],
       datasets: [
         {
           label: 'Risk Level',
           data: [prediction ? { High: 2, Medium: 1, Low: 0, Error: -1 }[prediction.severity] || 0 : 0],
           backgroundColor: [
             prediction?.severity === 'High' ? 'rgba(255, 99, 132, 0.5)' :
             prediction?.severity === 'Medium' ? 'rgba(255, 206, 86, 0.5)' :
             prediction?.severity === 'Low' ? 'rgba(75, 192, 192, 0.5)' :
             'rgba(128, 128, 128, 0.5)'
           ],
           borderColor: [
             prediction?.severity === 'High' ? 'rgba(255, 99, 132, 1)' :
             prediction?.severity === 'Medium' ? 'rgba(255, 206, 86, 1)' :
             prediction?.severity === 'Low' ? 'rgba(75, 192, 192, 1)' :
             'rgba(128, 128, 128, 1)'
           ],
           borderWidth: 1,
         },
       ],
     };

     return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <h1 className="text-3xl font-bold text-blue-600 mb-6">Drug Interaction Predictor</h1>
         <input
           type="text"
           placeholder="Enter drug names (e.g., aspirin, warfarin)"
           onChange={(e) => setDrugs(e.target.value.split(',').map(d => d.trim()))}
           className="border p-3 m-2 rounded-md w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
         <button
           onClick={handlePredict}
           className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
         >
           Predict Interaction
         </button>
         {prediction && (
           <div className="mt-6 w-full max-w-md">
             <div
               className={`p-4 rounded-md ${
                 prediction.severity === 'High'
                   ? 'bg-red-100 border-red-500'
                   : prediction.severity === 'Medium'
                   ? 'bg-yellow-100 border-yellow-500'
                   : prediction.severity === 'Low'
                   ? 'bg-green-100 border-green-500'
                   : 'bg-gray-100 border-gray-500'
               } border`}
             >
               <p className="font-semibold text-lg">Severity: {prediction.severity}</p>
               <p className="text-gray-700">Explanation: {prediction.explanation}</p>
             </div>
             <div className="mt-4">
               <Bar
                 data={chartData}
                 options={{
                   scales: { y: { beginAtZero: true, max: 2 } },
                   plugins: { legend: { display: true }, title: { display: true, text: 'Interaction Risk' } },
                 }}
               />
             </div>
             <button
               onClick={downloadChart}
               className="bg-gray-500 text-white p-2 rounded-md mt-2 hover:bg-gray-600 transition duration-200"
             >
               Download Chart
             </button>
           </div>
         )}
       </div>
     );
   }

   export default App;