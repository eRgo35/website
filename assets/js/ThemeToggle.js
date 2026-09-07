import { Component } from "./Component.js";

/** Dark/light toggle. Persists the explicit choice; the stylesheet
 * follows `prefers-color-scheme` when no explicit choice is stored. */
export class ThemeToggle extends Component {
    static KEY = "preferredTheme";

    /** @type {HTMLElement | null} */
    #icon;

    render() {
        this.#icon = this.el.querySelector(".theme-icon");
    }

    bind() {
        this.el.addEventListener("click", () => this.#toggle());
    }

    /** @returns {"dark" | "light"} */
    #effective() {
        const attr = document.documentElement.dataset.theme;
        if (attr === "dark" || attr === "light") {
            return attr;
        }
        return matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    #sync() {
        if (this.#icon) {
            this.#icon.textContent = this.#effective() === "dark" ? "☀️" : "🌙";
        }
    }

    #toggle() {
        const next = this.#effective() === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem(ThemeToggle.KEY, next);
        } catch {}
        this.#sync();
    }

    mount() {
        super.mount();
        this.#sync();
    }
}