import React, { useState } from 'react';
import { calculateSum } from '@repo/shared-lib';

import { env } from '@/lib/env.js';

export function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (!isNaN(number1) && !isNaN(number2)) {
      setResult(calculateSum(number1, number2));
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Calculator (Node Environment: {env.NODE_ENV}, Foo: {env.VITE_FOO})
      </h2>

      <div className="mb-4">
        <label htmlFor="num1" className="block text-sm font-medium text-gray-700 mb-2">
          First Number
        </label>
        <input
          id="num1"
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
          placeholder="Enter first number"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="num2" className="block text-sm font-medium text-gray-700 mb-2">
          Second Number
        </label>
        <input
          id="num2"
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
          placeholder="Enter second number"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg mb-6"
      >
        Calculate Sum
      </button>

      {result !== null && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-sm text-green-700 font-medium mb-1">Result</div>
          <div className="text-2xl font-bold text-green-800">{result}</div>
        </div>
      )}
    </div>
  );
}
