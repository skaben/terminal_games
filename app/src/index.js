require(/* webpackPrefetch: true */ "./router/router.js");
require(/* webpackPrefetch: true */ "./util/calls.js");

import("./assets/styles/fonts.scss");
import("./assets/styles/style.scss");

window.addEventListener("contextmenu", event => { event.preventDefault(); });
