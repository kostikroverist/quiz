import { useForm, useFieldArray, Controller } from "react-hook-form";
import { QuizFormValues } from "../interface/Quiz";
import AnswerFields from "./AnswerFields";

const AddQuiz: React.FC = () => {
  const { control, register, handleSubmit, watch, setValue } =
    useForm<QuizFormValues>({
      defaultValues: {
        name: "",
        timer: 31,
        questions: [
          {
            question: "",
            type: "select",
            answers: [],
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");

  const handleTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].type = e.target.value as
      | "select"
      | "multi-select"
      | "text";
    setValue("questions", newQuestions);
  };

  const onSubmit = (data: QuizFormValues) => {
    console.log(data);
    //  save to localStorage
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div>
        <label className="block">Name Quiz</label>
        <input {...register("name")} className="border p-2 w-full" />
      </div>
      <div>
        <label className="block">Have timer?</label>
        <input {...register("timer")} className="border p-2 w-full" />
      </div>

      {fields.map((item, index) => (
        <div key={item.id} className="border p-4 space-y-2">
          <div className="flex justify-between">
            <label>Question {index + 1}</label>
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                Delete
              </button>
            )}
          </div>
          <input
            {...register(`questions.${index}.question`)}
            className="border p-2 w-full"
          />
          <div>
            <label>What type answer</label>
            <Controller
              control={control}
              name={`questions.${index}.type`}
              render={({ field }) => (
                <select
                  {...field}
                  className="border p-2 w-full"
                  onChange={(e) => handleTypeChange(e, index)}
                >
                  <option value="select">Select</option>
                  <option value="multi-select">Multi-select</option>
                  <option value="text">Text</option>
                </select>
              )}
            />
          </div>
          <AnswerFields
            control={control}
            register={register}
            questionIndex={index}
            typeAnswer={questions[index]?.type || "select"}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          append({
            question: "",
            type: "select",
            answers: [{ value: "", isCorrect: false, pointsPerQuestion: 1 }],
          });
        }}
        className="text-blue-500"
      >
        + Add Question
      </button>
        <div></div>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit
      </button>
    </form>
  );
};

export default AddQuiz;
