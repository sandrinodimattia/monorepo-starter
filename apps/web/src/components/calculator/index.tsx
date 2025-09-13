import { useState } from 'react';
import { add } from '@packages/math';

export function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (!Number.isNaN(a) && !Number.isNaN(b)) {
      setResult(add(a, b));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="border border-gray-200 p-8">
      <div className="space-y-8">
        <div className="flex items-center justify-center gap-8">
          <input
            type="number"
            placeholder="0"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-20 h-12 text-center text-lg bg-transparent border border-gray-300 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
          />
          <span className="text-xl text-gray-400 select-none font-light">
            +
          </span>
          <input
            type="number"
            placeholder="0"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-20 h-12 text-center text-lg bg-transparent border border-gray-300 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCalculate}
            className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none"
          >
            Calculate
          </button>
        </div>

        {result !== null && (
          <div className="text-center pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-500 mb-2 font-light">Result</div>
            <div className="text-4xl font-light">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
