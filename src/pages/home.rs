use dioxus::prelude::*;

/// Home page
#[component]
pub fn Home() -> Element {
    rsx! {
        div { class: "home-card",
            div { class: "home-card-image", "Image" }
            div { class: "home-card-content",
                div { class: "home-card-hi", "Hi, I'm ..." }
                div { class: "home-card-name", "Michał Czyż" }
                div { class: "home-card-bio", "Information about me..." }
                div { class: "home-card-buttons",
                    button { "Download CV" }
                    button { "Contact" }
                }
                div { class: "home-card-social",
                    button { "LinkedIn" }
                    button { "GitHub" }
                    button { "YouTube" }
                    button { "Email me!" }
                }
            }
        }
    }
}
