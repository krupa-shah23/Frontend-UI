const { useState, useEffect } = React;

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (height && weight) calculateBMI();
  }, [height, weight, unit]);

  const handleUnitToggle = () => {
    if (unit === 'metric') {
      setHeight((prev) => (prev ? (prev / 2.54).toFixed(2) : ''));
      setWeight((prev) => (prev ? (prev / 0.453592).toFixed(2) : ''));
      setUnit('imperial');
    } else {
      setHeight((prev) => (prev ? (prev * 2.54).toFixed(2) : ''));
      setWeight((prev) => (prev ? (prev * 0.453592).toFixed(2) : ''));
      setUnit('metric');
    }
  };

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (isNaN(h) || isNaN(w)) return;

    let result = 0;
    if (unit === 'metric') {
      result = w / ((h / 100) ** 2);
    } else {
      result = (w / (h ** 2)) * 703;
    }

    const bmiValue = result.toFixed(1);
    setBmi(bmiValue);
    setCategory(getBMICategory(result));
  };

  const getBMICategory = (value) => {
    if (value < 18.5) return 'Underweight 😕';
    if (value < 25) return 'Normal ✅';
    if (value < 30) return 'Overweight ⚠️';
    return 'Obese 🚨';
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md fade-in">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">BMI Calculator</h1>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Height ({unit === 'metric' ? 'cm' : 'in'}):
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Weight ({unit === 'metric' ? 'kg' : 'lbs'}):
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleUnitToggle}
          className="text-sm text-blue-500 hover:underline"
        >
          Switch to {unit === 'metric' ? 'Imperial' : 'Metric'}
        </button>
        <button
          onClick={reset}
          className="text-sm text-red-500 hover:underline"
        >
          Reset
        </button>
      </div>

      {bmi && (
        <div className="text-center mt-6 fade-in">
          <p className="text-lg font-semibold">Your BMI: <span className="text-blue-600">{bmi}</span></p>
          <p className="mt-1 text-sm text-gray-600">Category: <span className="font-medium">{category}</span></p>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BMICalculator />);
