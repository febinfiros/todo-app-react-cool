import "./App.css";
import TasksProvider from "./TasksProvider";
import TaskInput from "./TaskInput";
import TaskList from "./TasksList";
import ToggleDarkMode from "./ToggleDarkMode";

function App() {
  return (
    <div className="flex justify-center mt-2 mb-4">
      <div className="max-w-96">
        <TasksProvider>
          <TodoHead>
            <TaskInput />
          </TodoHead>
          <TodoBody>
            <TaskList />
          </TodoBody>
        </TasksProvider>
      </div>
    </div>
  );
}

function TodoHead({ children }) {
  return (
    <header className="flex flex-wrap p-2 w-full">
      <h1 className="text-3xl font-bold">Todo App</h1>
      <div className="flex flex-grow justify-end pr-9 pt-3">
        <ToggleDarkMode />
      </div>
      {children}
    </header>
  );
}

function TodoBody({ children }) {
  return <main className="flex flex-wrap pb-2">{children}</main>;
}

export default App;
