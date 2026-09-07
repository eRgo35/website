import { Component } from "./Component.js";

/** Magnetic hover: buttons lean toward the pointer, then ease back.
 * Fine pointers only, honors prefers-reduced-motion. */
export class MagneticButton extends Component {
    static #MAX = 6; /* px of pull */

    bind() {
        if (!matchMedia("(pointer: fine)").matches) {
            return;
        }
        if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) {
            return;
        }

        this.el.addEventListener("pointermove", (e) => {
            const r = this.el.getBoundingClientRect();
            const dx = ((e.clientX - r.left) / r.width - 0.5) * 2; /* −1…1 */
            const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
            this.el.style.translate = `${(dx * MagneticButton.#MAX).toFixed(1)}px ${(dy * MagneticButton.#MAX).toFixed(1)}px`;
        });
        this.el.addEventListener("pointerleave", () => {
            this.el.style.translate = "0px 0px";
        });
    }
}