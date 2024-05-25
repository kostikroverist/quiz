import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type PropsButton = {
  text: string;
  icon?: ReactNode;
  to: string;
  onClick?: () => void;
};

const NavButton: FC<PropsButton> = ({ text, icon, to, onClick }) => {
  return (
    <Link to={to} className="inline-block m-5">
      <button onClick={onClick} className=" bg-white rounded-md shadow-lg border border-gray-300 px-4 py-2 flex flex-col items-center justify-center space-x-2 hover:shadow-xl h-64 w-52">
        {icon && <span>{icon}</span>}
        <span className="pt-5 text-2xl font-bold">{text}</span>
      </button>
    </Link>
  );
};

export default NavButton;
