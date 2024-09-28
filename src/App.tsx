import "./App.css";
import Quiz from "./component/quiz";
import { quizData } from "./data/ges-questions.data";
import { splitQuestions } from "./utils/split-questions";
import { useState } from "react";

function App() {
  const [section, setSection] = useState<null | number>(null);
  const questions = splitQuestions(quizData, 50);

  const handleClick = (index: number) => {
    setSection(index);
  };

  if (section === null)
    return (
      <div className="sections-btn-container">
        {questions.map((_, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            <h3>section {index + 1}</h3>
          </button>
        ))}
      </div>
    );

  return (
    <>
      <Quiz questions={questions[section]} setSection={setSection} />
    </>
  );
}

export default App;
