import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores } = location.state as { scores: number[] };

  const totalScore = scores.reduce((acc, score) => acc + score, 0);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
      <p className="text-lg mb-6">Your Total Score: {totalScore}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Result;
