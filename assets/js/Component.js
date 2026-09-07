/**
 * Abstract base class for progressive-enhancement components.
 * Template-method lifecycle: mount() → render() → bind().
 *
 * Content lives in plain semantic HTML; components attach behavior only.
 * @abstract
 */
export class Component {
    /** @type {HTMLElement} */
    #el;

    /** @param {HTMLElement} el Root element the component attaches to. */
    constructor(el) {
        if (new.target === Component) {
            throw new TypeError(
                "Component is abstract — subclass it, don't instantiate.",
            );
        }
        if (!(el instanceof HTMLElement)) {
            throw new TypeError("Component expects an HTMLElement root.");
        }
        this.#el = el;
    }

    /** Root element. @returns {HTMLElement} */
    get el() {
        return this.#el;
    }

    /** Template method: run the lifecycle in order. */
    mount() {
        this.render();
        this.bind();
    }

    /** Lifecycle hook: prepare derived markup (default: none). */
    render() {}

    /** Lifecycle hook: attach listeners (default: none). */
    bind() {}
}