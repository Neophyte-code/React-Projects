import { useState } from "react";

const Calculator = () => {

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleClick = (value) => {
  if (value === "=") {
    try {
      // Replace display symbols with JS operators
      const expression = input.replace(/÷/g, "/").replace(/x/g, "*");
      setResult(eval(expression).toString());
    } catch (error) {
      setResult("Error");
    }
  } else if (value.toLowerCase() === "c") {
    setInput("");
    setResult("");
  } else {
    setInput((prev) => prev + value);
  }
};

    const getButtonClasses = (btn) => {
        if (btn === '=') return "bg-blue-600 text-white shadow-md shadow-gray-600/50";
        if (btn === 'c') return "bg-red-500 text-white shadow-md shadow-gray-600/50";
        return "bg-white-200 text-gray-800 hover:bg-gray-300 shadow-md shadow-gray-600/50";
    };

    return(
        <div className="bg-neutral-100 max-w-md mx-auto p-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Calculator</h2>

            {/* display panel */}
            <div className="h-auto bg-neutral-200 rounded text-right p-4 inset-shadow-sm inset-shadow-gray-800/50 ">
                <div className="text-xl font-medium text-gray-600 min-h-6 mb-2 truncate">{input || '0'}</div>
                <div className="text-xl font-medium min-h-10 mb-2 truncate">{result}</div>
            </div>
            
            {/* keyboard screen */}
            <div className="grid grid-cols-4 gap-4 mt-5">
                {['7', '8', '9', '÷', '4', '5', '6', 'x', '1', '2', '3', '-', 'c', '0', '+', '=' ].map((btn) => (
                    <button key={btn}  onClick={() => handleClick(btn)} className={`p-3 rounded-md text-lg font-medium ${getButtonClasses(btn)}`} >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Calculator;