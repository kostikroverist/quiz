import { FaPlus } from "react-icons/fa";
import NavButton from "../components/Buttons/NavButton";

const ManageQuiz = () => {
  return (
    <>
      <div>
        <NavButton
          icon={<FaPlus size={64} />}
          text="Add your Quiz"
          to="/addquiz"
        />
      </div>
      <div>
        <h3 className="text-center font-bold text-3xl">List of Quiz</h3>
        <div></div>
      </div>
    </>
  );
};

export default ManageQuiz;
