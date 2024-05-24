import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded flex items-center justify-between"
    >
      <IoChevronBackCircleSharp size={22} className="mr-2"/>
      Back
    </button>
  );
};

export default BackButton;
