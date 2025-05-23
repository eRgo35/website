use crate::router::Route;

use dioxus::prelude::*;
use dioxus_material_icons::MaterialIconStylesheet;

mod components;
mod pages;
mod router;

const FAVICON: Asset = asset!("/assets/favicon.ico");
const MAIN_CSS: Asset = asset!("/assets/main.css");

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
