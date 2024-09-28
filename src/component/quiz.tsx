import { useState } from "react";

type quizProps = {
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
  setSection: React.Dispatch<React.SetStateAction<number | null>>;
};

const Quiz = ({ questions, setSection }: quizProps) => {
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Handle the selection of an option
  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = option;
    setUserAnswers(newAnswers);
  };

  // Grade the quiz
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newScore = 0;

    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        newScore += 1;
      }
    });

    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div>
      <button type="submit" onClick={() => setSection(null)}>
        Reset
      </button>

      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: "3rem" }}>
            <p className="questions">
              {index + 1}. {question.question}
            </p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="label-container">
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    disabled={submitted} // Disable after submission
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}

        <button type="submit" onClick={() => setSection(null)}>
          Reset
        </button>
        {!submitted ? (
          <button type="submit">Submit</button>
        ) : (
          <div>
            <h2>Results</h2>
            <p>
              You scored {score} out of {questions.length}
            </p>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>
                  {question.question}
                  <br />
                  <strong>Your Answer: </strong>
                  {userAnswers[index] || "No answer selected"}
                  <br />
                  <strong>Correct Answer: </strong>
                  {question.answer}
                  <br />
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default Quiz;
