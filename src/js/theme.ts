import { Theme } from "src/interface";

const initialTheme: Theme = "dracula";

const addThemeLocalStorage = (theme: Theme) => {
  localStorage.setItem("threeJsCourseTheme", theme);
};

const getThemeLocalStorage = () => {
  const theme = localStorage.getItem("threeJsCourseTheme") as Theme;

  if (theme) {
    return theme;
  } else {
    addThemeLocalStorage(initialTheme);
    return initialTheme;
  }
};

const applyTheme = (theme: Theme) => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
};

const init = () => {
  const theme = getThemeLocalStorage();
  applyTheme(theme);

  const checkboxTheme = document.getElementById(
    "modify-theme",
  ) as HTMLInputElement;

  checkboxTheme.checked = theme === "light";

  checkboxTheme.addEventListener("click", (e: Event) => {
    console.dir(e.target);
    if (checkboxTheme.checked) {
      addThemeLocalStorage("light");
      applyTheme("light");
    } else {
      addThemeLocalStorage("dracula");
      applyTheme("dracula");
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
