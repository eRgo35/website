import { Component } from "./Component.js";

/** Keeps the footer © year current. */
export class YearStamp extends Component {
    bind() {
        this.el.textContent = String(new Date().getFullYear());
    }
}