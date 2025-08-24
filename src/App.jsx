import { useState } from "react";
import './App.css'
import Calculator from './components/Calculator.jsx'
import Quiz from './components/Quiz.jsx'

function App(){
  
  const [activeTab, setActiveTab] = useState('calculator')

  return(
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white shadow-2xl rounded-2xl">
        <div className="container mx-auto p-4">
          <div className="flex justify-between">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-bold">AP 6</h1>
            </div>

            <div className="flex space-x-4">
              <button className={`px-4 py-2 rounded-md ${activeTab === 'calculator' ? 'bg-blue-800' : 'hover:bg-blue-700'}`} onClick={() => setActiveTab('calculator')}>
                Calculator
              </button>
              <button className={`px-4 py-2 rounded-md ${activeTab === 'quiz' ? 'bg-blue-800' : 'hover:bg-blue-700'}`} onClick={() => setActiveTab('quiz')}>
                Quiz App
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'calculator' && <Calculator/>}
        {activeTab === 'quiz' && <Quiz/>}
      </main>
    </div>
  )
}

export default App