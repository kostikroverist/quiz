import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white h-20">
      <div>
        <p>&copy; 2024 Quiz App. All rights reserved.</p>
      </div>
      <div>
        <Link to="https://github.com/kostikroverist">Link to GitHub</Link>
      </div>
    </div>
  );
};

export default Footer;
