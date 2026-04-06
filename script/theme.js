
import { getSavedTheme, saveTheme } from './storage.js';

const htmlEl     = document.documentElement;
const themeImage = document.querySelector('.header__themeImage');
const themeToggle = document.querySelector('.header__theme-toggle');


export function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  themeImage.src = theme === 'dark' ? 'images/icon-sun.svg'  : 'images/icon-moon.svg';
  themeImage.alt = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}


export function initTheme() {
  applyTheme(getSavedTheme());

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });
}
