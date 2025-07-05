const root = document.documentElement;
const themeText = document.querySelector('.theme-text');
const themeIcon = document.querySelector('.material-icons');

const isDarkMode = () => root.classList.contains('dark');

const setDarkMode = () => {
  root.classList.add('dark');
  themeText.textContent = 'Dark Mode';
  themeIcon.innerHTML = '&#xe51c';
};

const setLightMode = () => {
  root.classList.remove('dark');
  themeText.textContent = 'Light Mode';
  themeIcon.innerHTML = '&#xe518';
};

const toggleTheme = () => {
  if (isDarkMode()) {
    setLightMode();
    localStorage.setItem('preferredTheme', 'light');
  } else {
    setDarkMode();
    localStorage.setItem('preferredTheme', 'dark');
  }
};

const checkPreferredTheme = () => {
  const preferredTheme = localStorage.getItem('preferredTheme');
  if (preferredTheme === 'dark') {
    setDarkMode();
  } else if (preferredTheme === 'light') {
    setLightMode();
  } else {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkScheme) {
      setDarkMode();
    } else {
      setLightMode();
    }
  }
};

document.querySelector("#year").innerHTML = new Date().getFullYear();

checkPreferredTheme();

const themeButton = document.querySelector('.theme');
themeButton.addEventListener('click', toggleTheme);
