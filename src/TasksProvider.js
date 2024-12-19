import { createContext, useContext, useReducer } from "react";

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "add": {
      const id = tasks.length ? tasks[tasks.length - 1][0] + 1 : 1;

      return (tasks = [...tasks, [id, action.content]]);
    }
    case "edit": {
      return tasks.map((item) => {
        if (item[0] === action.id) {
          return [action.id, action.content];
        } else {
          return item;
        }
      });
    }
    case "delete": {
      return tasks.filter((item) => item[0] !== action.id);
    }
    default: {
      throw Error("Unknown Action: " + action.type);
    }
  }
}

const tasksInfo = [
  [1, "Write a letter"],
  [2, "Eat lunch"],
  [3, "Get a haircut"],
];

const TaskListContext = createContext(tasksInfo);
const TaskDispatch = createContext(null);

export default function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, tasksInfo);

  return (
    <TaskDispatch.Provider value={dispatch}>
      <TaskListContext.Provider value={tasks}>
        {children}
      </TaskListContext.Provider>
    </TaskDispatch.Provider>
  );
}

export function useDispatch() {
  const dispatch = useContext(TaskDispatch);

  return dispatch;
}

export function useTasks() {
  const tasks = useContext(TaskListContext);
  return tasks;
}
