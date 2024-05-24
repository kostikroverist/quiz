import "./index.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import Quizs from "./pages/Quizs";
import ManageQuiz from "./pages/ManageQuiz";
import AddQuiz from "./pages/AddQuiz";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="managequiz" element={<ManageQuiz />} />
        <Route path="addquiz" element={<AddQuiz />} />
        <Route path="allquiz" element={<Quizs />} />
      </Route>
    </Routes>
  );
}

export default App;
