import { Component } from "./Component.js";

/** The site's single easter egg: ↑ ↑ ↓ ↓ ← → ← → B A re-skins the site as
 * its v1 self ("museum of my past self" — Rosé Pine + Coiny). Temporary
 * pick; see notes/website-deferred-decisions.md §2. */
export class KonamiEgg extends Component {
    static #CODE = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ];

    #pos = 0;
    /** @type {HTMLElement | null} */
    #toast;
    /** @type {number | undefined} */
    #timer;

    bind() {
        this.#toast = document.querySelector(".toast");
        document.addEventListener("keydown", (e) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            this.#pos =
                key === KonamiEgg.#CODE[this.#pos]
                    ? this.#pos + 1
                    : key === KonamiEgg.#CODE[0]
                      ? 1
                      : 0;
            if (this.#pos === KonamiEgg.#CODE.length) {
                this.#pos = 0;
                this.#fire();
            }
        });
    }

    #fire() {
        document.documentElement.classList.toggle("retro");
        if (this.#toast) {
            this.#toast.hidden = false;
            clearTimeout(this.#timer);
            this.#timer = setTimeout(() => {
                this.#toast.hidden = true;
            }, 2800);
        }
    }
}