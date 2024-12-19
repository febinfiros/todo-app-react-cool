import { useTasks, useDispatch } from "./TasksProvider";
import { useState } from "react";

export default function TaskList() {
  const tasks = useTasks();

  const list = (
    <ul className="p-2 w-full">
      {tasks.map((item) => {
        return <TaskItem item={item} key={item[0]} />;
      })}
    </ul>
  );
  return list;
}

function TaskItem({ item }) {
  const [editing, setEditing] = useState(false);

  function handleClick() {
    setEditing(!editing);
  }

  return (
    <>
      {editing ? (
        <EditItem item={item} handleClick={handleClick} />
      ) : (
        <ListItem item={item} handleClick={handleClick} />
      )}
    </>
  );
}

function ListItem({ item, handleClick }) {
  return (
    <li className="bg-gray-100 dark:bg-gray-700 py-3 px-4 first:rounded-t-3xl last:rounded-b-3xl border-b border-gray-300 last:border-0">
      <div className="flex mb-3">
        <input
          className="accent-amber-300 dark:accent-amber-400 ml-1"
          type="checkbox"
          name="check box"
        />
        <div className="flex justify-end flex-grow">
          <EditButton id={item[0]} handleClick={handleClick} />
          <DeleteButton id={item[0]} />
        </div>
      </div>

      <p className="pl-2 overflow-hidden">{item[1]}</p>
    </li>
  );
}

function EditButton({ id, handleClick }) {
  return (
    <button
      type="submit"
      className="px-2 py-1 bg-amber-300 hover:bg-amber-400 dark:text-white dark:bg-amber-500 dark:hover:bg-amber-600 rounded-l-lg"
      onClick={handleClick}
      value={id}
    >
      Edit
    </button>
  );
}

function DeleteButton({ id }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch({
      type: "delete",
      id: id,
    });
  }
  return (
    <button
      type="submit"
      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-r-lg"
      value={id}
      onClick={handleClick}
    >
      Delete
    </button>
  );
}

function EditItem({ item, handleClick }) {
  const [taskText, setTaskText] = useState(item[1]);

  function handleChange(e) {
    setTaskText(e.target.value);
  }

  return (
    <li className="bg-gray-100 dark:bg-gray-700 py-3 px-4 first:rounded-t-3xl last:rounded-b-3xl border-b border-gray-300 last:border-0">
      <div className="flex mb-3">
        <div className="flex justify-end flex-grow">
          <SaveButton id={item[0]} saveClick={handleClick} task={taskText} />
          <DeleteButton id={item[0]} />
        </div>
      </div>

      <textarea
        autoFocus
        onChange={handleChange}
        value={taskText}
        className="dark:bg-gray-600 pl-2 rounded-lg focus:outline-none focus:ring-2 ring-amber-200 dark:ring-amber-400 w-full resize-none"
        name="edit task"
      />
    </li>
  );
}

function SaveButton({ id, saveClick, task }) {
  const dispatch = useDispatch();

  function handleClick() {
    if (task !== "") {
      dispatch({
        type: "edit",
        id: id,
        content: task,
      });
    }

    saveClick();
  }

  return (
    <button
      type="submit"
      className="px-2 py-1 bg-amber-300 hover:bg-amber-400 dark:text-white dark:bg-amber-500 dark:hover:bg-amber-600 rounded-l-lg"
      onClick={handleClick}
      value={id}
    >
      Save
    </button>
  );
}
