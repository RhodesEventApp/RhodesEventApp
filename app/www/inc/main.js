/*jslint browser: true */
/*global Aerophane */

var aero;

(function init() {
    "use strict";

    if (aero) {
        return;
    }

    aero = new Aerophane("Rhodes Event Page", [
        {"name": "Feed", "href": "index.html"},
        {"name": "Calendar", "href": "tabs.html"},
        {"name": "Profile", "href": "form.html"},
        {"name": "Login/Register", "href": "auth.html"},
    ]);
}());
