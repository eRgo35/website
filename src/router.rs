use crate::pages::certifications::Certifications;
use crate::pages::contact::Contact;
use crate::pages::education::Education;
use crate::pages::home::Home;
use crate::pages::notfound::PageNotFound;
use crate::pages::projects::Projects;
use crate::{components::navbar::Navbar, pages::about::About};

use dioxus::prelude::*;
use dioxus_motion::prelude::*;

#[derive(Debug, Clone, Routable, PartialEq, MotionTransitions)]
#[rustfmt::skip]
pub enum Route {
    #[layout(MotionTransitionBuilder)]
        #[route("/")]
        #[transition(Fade)]
        Home {},

        #[route("/about")]
        #[transition(Fade)]
        About {},
        
        #[route("/projects")]
        #[transition(Fade)]
        Projects {},
        
        #[route("/education")]
        #[transition(Fade)]
        Education {},
        
        #[route("/certifications")]
        #[transition(Fade)]
        Certifications {},
        
        #[route("/contact")]
        #[transition(Fade)]
        Contact {},
    #[end_layout]
    #[route("/:..route")]
    PageNotFound { route: Vec<String> },
}

#[component]
pub fn MotionTransitionBuilder() -> Element {
    rsx! {
        AnimatedOutlet::<Route> {}
    }
}
