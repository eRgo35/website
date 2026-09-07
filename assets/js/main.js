import { ThemeToggle } from "./ThemeToggle.js";
import { SplitText } from "./SplitText.js";
import { MagneticButton } from "./MagneticButton.js";
import { KonamiEgg } from "./KonamiEgg.js";
import { YearStamp } from "./YearStamp.js";

/** selector → component registry; every component attaches to markup
 * that already exists in the HTML. */
const REGISTRY = [
    ['[data-component="theme-toggle"]', ThemeToggle],
    ["[data-split]", SplitText],
    ["[data-magnetic]", MagneticButton],
];

function mount() {
    for (const [selector, Ctor] of REGISTRY) {
        for (const el of document.querySelectorAll(selector)) {
            try {
                new Ctor(/** @type {HTMLElement} */ (el)).mount();
            } catch (err) {
                console.error(err);
            }
        }
    }

    const year = document.querySelector("[data-year]");
    if (year instanceof HTMLElement) {
        new YearStamp(year).mount();
    }

    /* The one easter egg listens site-wide. */
    new KonamiEgg(document.documentElement).mount();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
    mount();
}