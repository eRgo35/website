import { Component } from "./Component.js";

/** Kinetic headline entrances: wraps the text that is already in the HTML
 * into per-character spans (grapheme-safe). Without JS the headline is
 * plain text; without motion support it is never hidden. */
export class SplitText extends Component {
    bind() {
        if (typeof Intl === "undefined" || !Intl.Segmenter) {
            return;
        }
        /** @type {string} */
        const text = this.el.textContent ?? "";
        const segments = new Intl.Segmenter(undefined, {
            granularity: "grapheme",
        }).segment(text);

        let i = 0;
        const frag = document.createDocumentFragment();
        for (const { segment } of segments) {
            if (/\s/u.test(segment)) {
                frag.append(document.createTextNode(segment));
            } else {
                const span = document.createElement("span");
                span.className = "ch";
                span.style.setProperty("--i", String(i));
                span.textContent = segment;
                frag.append(span);
            }
            i += 1;
        }
        this.el.replaceChildren(frag);
    }
}