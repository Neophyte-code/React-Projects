import { useState, useEffect } from "react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [name, setName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  // Original questions array
  const originalQuestions = [
    { id: 1, text: "JavaScript is a compiled language.", type: "trueFalse", answer: false },
    { id: 2, text: "The 'let' keyword allows variable redeclaration.", type: "trueFalse", answer: false },
    { id: 3, text: "JavaScript is case-sensitive.", type: "trueFalse", answer: true },
    { id: 4, text: "Null and undefined are the same in JavaScript.", type: "trueFalse", answer: false },
    { id: 5, text: "Functions in JavaScript can be assigned to variables.", type: "trueFalse", answer: true },
    { id: 6, text: "JavaScript supports block-scoped variables with 'var'.", type: "trueFalse", answer: false },
    { id: 7, text: "The '===' operator checks both value and type.", type: "trueFalse", answer: true },
    { id: 8, text: "JavaScript arrays are objects.", type: "trueFalse", answer: true },
    { id: 9, text: "Promises are used for synchronous operations.", type: "trueFalse", answer: false },
    { id: 10, text: "The 'this' keyword refers to the global object in a function by default.", type: "trueFalse", answer: true },
    // Multiple Choice Questions
    { id: 11, text: "What is the output of 'typeof null'?", type: "multipleChoice", options: ["null", "object", "undefined", "number"], answer: "object" },
    { id: 12, text: "Which method adds an element to the end of an array?", type: "multipleChoice", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
    { id: 13, text: "What does 'NaN' stand for?", type: "multipleChoice", options: ["Not a Number", "Null and None", "New Array Number", "No Assignment Needed"], answer: "Not a Number" },
    { id: 14, text: "Which keyword declares a block-scoped variable?", type: "multipleChoice", options: ["var", "let", "const", "all of the above"], answer: "let" },
    { id: 15, text: "What is the result of '2' + 2 in JavaScript?", type: "multipleChoice", options: ["4", "22", "NaN", "undefined"], answer: "22" },
    { id: 16, text: "Which event is triggered when a user clicks an element?", type: "multipleChoice", options: ["onchange", "onclick", "onhover", "onfocus"], answer: "onclick" },
    { id: 17, text: "What does JSON stand for?", type: "multipleChoice", options: ["JavaScript Object Notation", "Java Standard Object Name", "JavaScript Oriented Notation", "Java Simple Object Node"], answer: "JavaScript Object Notation" },
    { id: 18, text: "Which method converts a string to an integer?", type: "multipleChoice", options: ["parseInt()", "toString()", "parseFloat()", "Number()"], answer: "parseInt()" },
    { id: 19, text: "What is the purpose of 'async/await'?", type: "multipleChoice", options: ["Synchronous coding", "Handling promises", "Looping", "Variable declaration"], answer: "Handling promises" },
    { id: 20, text: "Which operator is used for string concatenation?", type: "multipleChoice", options: ["+", "-", "*", "/"], answer: "+" },
  ];

  // Function to shuffle questions
  const shuffleQuestions = (questions) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize quiz with shuffled questions
  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(originalQuestions));
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === shuffledQuestions[currentQuestion]?.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizStarted(false);
    setName("");
    setShuffledQuestions(shuffleQuestions(originalQuestions));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const startQuiz = () => {
    if (name.trim() !== "") {
      setQuizStarted(true);
    }
  };

  // SEPARATE FUNCTIONS FOR EACH SCREEN
  
  const renderWelcomeScreen = () => {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to the JavaScript Quiz!</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Please enter your name to begin:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <button
          onClick={startQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!name.trim()}
        >
          Start Quiz
        </button>
      </div>
    );
  };

  const renderResultScreen = () => {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed, {name}!</h2>
        <p className="text-lg mb-4">Your Score: {score} / {shuffledQuestions.length}</p>
        <button
          onClick={restartQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    );
  };

  const renderTrueFalseButtons = () => {
    return (
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={() => handleAnswer(true)}
          className={`px-4 py-2 rounded ${selectedAnswer === true ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          True
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className={`px-4 py-2 rounded ${selectedAnswer === false ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          False
        </button>
      </div>
    );
  };

  const renderMultipleChoiceButtons = () => {
    return (
      <div className="flex flex-col gap-2">
        {shuffledQuestions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`px-4 py-2 rounded text-left ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  const renderNextButton = () => {
    if (selectedAnswer === null) return null;
    
    return (
      <button
        onClick={nextQuestion}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {currentQuestion + 1 < shuffledQuestions.length ? "Next Question" : "Finish Quiz"}
      </button>
    );
  };

  const renderQuestionScreen = () => {
    const question = shuffledQuestions[currentQuestion];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Question {currentQuestion + 1}
          </h2>
          <span className="text-sm text-gray-600">Student: {name}</span>
        </div>
        
        <p className="mb-4 text-lg font-medium">{question.text}</p>
        
        {question.type === "trueFalse" ? renderTrueFalseButtons() : renderMultipleChoiceButtons()}
        
        {renderNextButton()}
      </div>
    );
  };

  // SIMPLE RETURN STATEMENT - No confusing nested conditions!
  if (shuffledQuestions.length === 0) {
    return <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">Loading questions...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {!quizStarted && renderWelcomeScreen()}
      {showResult && renderResultScreen()}
      {quizStarted && !showResult && renderQuestionScreen()}
    </div>
  );
};

export default Quiz;