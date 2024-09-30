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

  return (
    <>
      <div style={{ marginBottom: "4rem" }}>
        {section === null ? (
          <div className="sections-btn-container">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className="button-section"
              >
                <h3>section {index + 1}</h3>
              </button>
            ))}
          </div>
        ) : (
          <Quiz questions={questions[section]} setSection={setSection} />
        )}
      </div>

      <a href="https://wa.me/2347017962215" style={{ color: "black" }}>
        Site made by Samuel Kime
      </a>
      <p>
        These are previous exam questions, not the ones for the upcoming exam.
        Use them wisely.
      </p>
    </>
  );
}

export default App;
