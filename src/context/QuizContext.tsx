import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  quizId: string | null;
  setQuizId: (id: string | null) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizId, setQuizId] = useState<string | null>(null);

  return (
    <QuizContext.Provider value={{ quizId, setQuizId }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};