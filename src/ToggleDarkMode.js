import { useEffect, useState } from "react";

export default function ToggleDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const bodyClassList = document.body.classList;
    const darkClassList = ["dark", "bg-gray-800", "text-gray-200"];
    const lightClassList = ["bg-gray-200", "text-gray-800"];

    if (darkMode) {
      if (bodyClassList.contains(...lightClassList)) {
        bodyClassList.remove(...lightClassList);
      }
      bodyClassList.add(...darkClassList);
    } else {
      if (bodyClassList.contains(...darkClassList)) {
        bodyClassList.remove(...darkClassList);
      }
      bodyClassList.add(...lightClassList);
    }
  }, [darkMode]);

  function handleClick() {
    setDarkMode(!darkMode);
  }

  return (
    <label className="relative">
      <input
        type="checkbox"
        name="darkmode"
        className="peer opacity-0 w-0 h-0"
        onChange={handleClick}
      />
      <span className="absolute cursor-pointer border-2 rounded-full bg-gray-300 w-9 h-5 shadow-inner after:content-[''] after:absolute after:bg-white after:w-4 after:h-4 after:rounded-full peer-checked:after:translate-x-4 after:transition-all peer-checked:bg-amber-300 dark:after:bg-gray-700 dark:border-amber-400 dark:peer-checked:bg-amber-400"></span>
    </label>
  );
}
