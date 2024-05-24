// ListQuizzes.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QuizFormValues } from "../../interface/Quiz";
import { useQuiz } from "../../context/QuizContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Spinner from "../Spinner/Spinner";

const ListQuizzes: React.FC = () => {
  const { setQuizId } = useQuiz();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    storedValue: quizzes,
    setValue: setQuizzes,
    loading,
  } = useLocalStorage<QuizFormValues[]>("quizzes", []);

  const handleEdit = (id: string) => {
    setQuizId(id);
    navigate("/addquiz");
  };

  const handleDelete = (id: string) => {
    if (quizzes) {
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
      setQuizzes(updatedQuizzes);
    }
  };

  const handleStart = (id: string) => {
    setQuizId(id);
    navigate("/takequiz");
  };

  const filteredQuizzes = quizzes
    ? quizzes.filter((quiz) =>
        quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Quizzes</h2>
      <input
        type="text"
        placeholder="Search quizzes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {loading && <Spinner />}
      {filteredQuizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul>
          {filteredQuizzes.map((quiz) => (
            <li key={quiz.id} className="border p-4 mb-2">
              <h3 className="text-xl">{quiz.name}</h3>
              {location.pathname === "/managequiz" ? (
                <>
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
                </>
              ) : (
                <button
                  onClick={() => handleStart(quiz.id)}
                  className="text-blue-500"
                >
                  Start
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListQuizzes;
