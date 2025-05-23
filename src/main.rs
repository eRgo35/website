use crate::pages::about::About;
use crate::pages::certifications::Certifications;
use crate::pages::contact::Contact;
use crate::pages::education::Education;
use crate::pages::home::Home;
use crate::pages::projects::Projects;

use dioxus::prelude::*;
use dioxus_material_icons::{MaterialIcon, MaterialIconStylesheet};
use dioxus_motion::prelude::*;

mod pages;

#[derive(Debug, Clone, Routable, PartialEq, MotionTransitions)]
#[rustfmt::skip]
enum Route {
    #[layout(Navbar)]
        #[route("/")]
        #[transition(Fade)]
        Home {},
        #[route("/about")]
        About {},
        #[route("/projects")]
        Projects {},
        #[route("/education")]
        Education {},
        #[route("/certifications")]
        Certifications {},
        #[route("/contact")]
        Contact {},
}

const FAVICON: Asset = asset!("/assets/favicon.ico");
const MAIN_CSS: Asset = asset!("/assets/main.css");

fn PageNotFound(_route: Vec<String>) -> Element {
    rsx! {
        div { "404 Not Found" }
    }
}

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    rsx! {
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: MAIN_CSS }
        MaterialIconStylesheet {}
        Router::<Route> {}
    }
}

/// Shared navbar component.
#[component]
fn Navbar() -> Element {
    rsx! {
        div { id: "navbar",
            div { class: "navbar-start",
                Link { class: "navbar-main", to: Route::Home {}, "Michał Czyż" }
            }
            div { class: "navbar-end",
                Link { to: Route::Home {}, "Home" }
                Link { to: Route::About {}, "About" }
                Link { to: Route::Projects {}, "Projects" }
                Link { to: Route::Education {}, "Education" }
                Link { to: Route::Certifications {}, "Certifications" }
                Link { to: Route::Contact {}, "Contact" }
                button { class: "navbar-theme",
                    MaterialIcon { size: 24, name: "light_mode" }
                }
            }
        }
        div { class: "content-wrapper", AnimatedOutlet::<Route> {} }
    }
}
