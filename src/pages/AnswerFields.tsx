import { FC } from "react";
import {
  useFieldArray,
  Controller,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { QuizFormValues } from "../interface/Quiz";

interface AnswerFieldsProps {
  control: Control<QuizFormValues>;
  register: UseFormRegister<QuizFormValues>;
  questionIndex: number;
  typeAnswer: "select" | "multi-select" | "text";
}

const AnswerFields: FC<AnswerFieldsProps> = ({
  control,
  register,
  questionIndex,
  typeAnswer,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers` as const,
  });

  return (
    <div className="space-y-2">
      {fields.map((answer, answerIndex) => (
        <div key={answer.id} className="flex items-center space-x-2">
          <input
            {...register(
              `questions.${questionIndex}.answers.${answerIndex}.value`
            )}
            className="border p-2 w-full"
          />
          <Controller
            control={control}
            name={`questions.${questionIndex}.answers.${answerIndex}.isCorrect`}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <input
            type="number"
            {...register(
              `questions.${questionIndex}.answers.${answerIndex}.pointsPerQuestion`
            )}
            className="border p-2 w-full"
            placeholder="Points"
          />
          {answerIndex !== 0 ? (
            <button
              type="button"
              onClick={() => remove(answerIndex)}
              className="text-red-500"
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      ))}
      {typeAnswer === "text" && fields.length > 0 ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            {...register(
              `questions.${questionIndex}.answers.${
                fields.length - 1
              }.correctAnswer`
            )}
            className="border p-2 w-full"
            placeholder="Correct Answer"
          />
        </div>
      ) : null}
      {typeAnswer !== "text" && (
        <button
          type="button"
          onClick={() =>
            append({ value: "", isCorrect: false, pointsPerQuestion: 0 })
          }
          className="text-blue-500"
        >
          + Add Answer
        </button>
      )}
    </div>
  );
};

export default AnswerFields;
