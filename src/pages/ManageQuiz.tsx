import { FaPlus } from "react-icons/fa";
import NavButton from "../components/Buttons/NavButton";
import ListQuizzes from "../components/Quizs/ListQuizzes";
import BackButton from "../components/Buttons/BackButton";
import { useQuiz } from "../context/QuizContext";

const ManageQuiz = () => {
  const { setQuizId } = useQuiz();

  return (
    <>
      <BackButton />

      <div>
        <NavButton
          icon={<FaPlus size={64} />}
          text="Add your Quiz"
          to="/addquiz"
          onClick={() => setQuizId(null)}
        />
      </div>
      <div>
        <h3 className="text-center font-bold text-3xl">List of Quiz</h3>
        <div>
          <ListQuizzes />
        </div>
      </div>
    </>
  );
};

export default ManageQuiz;
