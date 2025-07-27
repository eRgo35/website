const root = document.documentElement;
const themeText = document.querySelector(".theme-text");
const themeIcon = document.querySelector(".material-icons");

const THEMES = {
  light: { class: "", text: "Light Mode", icon: "☀️" },
  dark: { class: "dark", text: "Dark Mode", icon: "🌙" },
};

function updateTheme(mode) {
  root.classList.toggle("dark", mode === "dark");
  themeText.textContent = THEMES[mode].text;
  themeIcon.textContent = THEMES[mode].icon;
  localStorage.setItem("preferredTheme", mode);
}

function getPreferredTheme() {
  const stored = localStorage.getItem("preferredTheme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

navigator.serviceWorker.addEventListener("controllerchange", () => {
  console.log("New version available, reloading...");
  window.location.reload();
});

updateTheme(getPreferredTheme());
