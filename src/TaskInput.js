import { useState } from "react";
import { useDispatch } from "./TasksProvider";

export default function TaskInput() {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (taskText !== "") {
      dispatch({
        type: "add",
        content: taskText,
      });
    }

    setTaskText("");
  }

  function handleChange(e) {
    setTaskText(e.target.value);
  }

  return (
    <form className="py-3 flex mx-4 w-full">
      <input
        type="text"
        onChange={handleChange}
        value={taskText}
        className="px-2 py-1 grow bg-gray-100 dark:bg-gray-700 rounded-l-lg focus:outline-none focus:ring-2 ring-amber-200 dark:ring-amber-300"
        name="add item"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-2 py-1 flex-none mr-2 bg-amber-300 hover:bg-amber-400 dark:text-white dark:bg-amber-500 dark:hover:bg-amber-600 rounded-r-lg"
      >
        Add
      </button>
    </form>
  );
}
