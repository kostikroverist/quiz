import React, { useState, useEffect } from "react";
import { QuizFormValues } from "../../interface/Quiz";
import { useQuiz } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";

const ListQuizzes: React.FC = () => {
  const { setQuizId } = useQuiz();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<QuizFormValues[]>([]);

  useEffect(() => {
    const storedQuizzes = localStorage.getItem("quizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  }, []);

  const handleEdit = (id: string) => {
    setQuizId(id);
    navigate("/addquiz");
  };

  const handleDelete = (id: string) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="border p-4 mb-2">
              <h3 className="text-xl">{quiz.name}</h3>
              <button
                onClick={() => handleEdit(quiz.id)}
                className="text-blue-500 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListQuizzes;
