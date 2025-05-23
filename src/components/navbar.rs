use dioxus::prelude::*;
use dioxus_material_icons::MaterialIcon;
use dioxus_motion::prelude::*;

use crate::router::Route;

/// Shared navbar component.
#[component]
pub fn Navbar() -> Element {
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
        div { class: "content-wrapper", {} }
    }
}
