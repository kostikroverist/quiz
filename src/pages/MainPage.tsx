import NavButton from "../components/Buttons/NavButton";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
const MainPage = () => {
  return (
    <div className="flex justify-center">
      <NavButton
        icon={<MdOutlineQuiz size={64} />}
        text="Quizs"
        to="/allquiz"
      />
      <NavButton
        icon={<MdManageAccounts size={64} />}
        text="Manage your Quiz"
        to="/managequiz"
      />
    </div>
  );
};

export default MainPage;
