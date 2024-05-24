import React, { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { QuizFormValues, Answer, Question } from "../interface/Quiz";

const TakeQuiz: React.FC = () => {
  const { quizId } = useQuiz();
  const [quiz, setQuiz] = useState<QuizFormValues | null>(null);
  const [answers, setAnswers] = useState<(string | number[])[]>([]);
  const [timer, setTimer] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) {
      const storedQuizzes = localStorage.getItem("quizzes");
      if (storedQuizzes) {
        const quizzes: QuizFormValues[] = JSON.parse(storedQuizzes);
        const quizToTake = quizzes.find((quiz) => quiz.id === quizId);
        if (quizToTake) {
          setQuiz(quizToTake);
          setTimer(quizToTake.timer * 60);
        }
      }
    }
  }, [quizId]);

  useEffect(() => {
    if (timer === 0) {
      calculateResult();
    }
    if (timer !== null && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : null));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const handleAnswerChange = (
    questionIndex: number,
    answer: string | number[]
  ) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    let score = 0;
    quiz?.questions.forEach((question, index) => {
      if (question.type === "text") {
        if (answers[index] === question.answers[0]?.correctAnswer) {
          score += question.answers[0].pointsPerQuestion;
        }
      } else {
        question.answers.forEach((answer, answerIndex) => {
          if (
            Array.isArray(answers[index]) &&
            (answers[index] as number[]).includes(answerIndex) &&
            answer.isCorrect
          ) {
            score += answer.pointsPerQuestion;
          }
        });
      }
    });
    navigate("/result", { state: { score: score.toString() } });
  };

  const renderQuestion = (question: Question, index: number) => {
    switch (question.type) {
      case "select":
        return (
          <div key={index} className="mb-4">
            <p className="font-semibold mb-2">{question.question}</p>
            {question.answers.map((answer: Answer, answerIndex: number) => (
              <div key={answerIndex} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={answerIndex}
                  onChange={() => handleAnswerChange(index, [answerIndex])}
                  className="mr-2"
                />
                <label>{answer.value}</label>
              </div>
            ))}
          </div>
        );
      case "multi-select":
        return (
          <div key={index} className="mb-4">
            <p className="font-semibold mb-2">{question.question}</p>
            {question.answers.map((answer: Answer, answerIndex: number) => (
              <div key={answerIndex} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={answerIndex}
                  onChange={(e) => {
                    const selected = Array.isArray(answers[index])
                      ? (answers[index] as number[])
                      : [];
                    if (e.target.checked) {
                      handleAnswerChange(index, [...selected, answerIndex]);
                    } else {
                      handleAnswerChange(
                        index,
                        selected.filter((i) => i !== answerIndex)
                      );
                    }
                  }}
                  className="mr-2"
                />
                <label>{answer.value}</label>
              </div>
            ))}
          </div>
        );
      case "text":
        return (
          <div key={index} className="mb-4">
            <p className="font-semibold mb-2">{question.question}</p>
            <input
              type="text"
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{quiz.name}</h1>
      <p className="mb-6">
        Time left: {Math.floor((timer ?? 0) / 60)}:
        {(timer ?? 0) % 60 < 10 ? `0${(timer ?? 0) % 60}` : (timer ?? 0) % 60}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateResult();
        }}
      >
        {quiz.questions.map((question, index) =>
          renderQuestion(question, index)
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TakeQuiz;
