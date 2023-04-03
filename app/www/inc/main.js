/*jslint browser: true */
/*global Aerophane */

var aero;

(function init() {
    "use strict";

    if (aero) {
        return;
    }

    aero = new Aerophane("Rhodes Event Page", [
        {"name": "Feed", "href": "../feed/feed.html"},
        {"name": "Calendar", "href": "../tabs/tabs.html"},
        {"name": "Profile", "href": "../form/form.html"},
        {"name": "Login/Register", "href": "../auth/auth.html"},
    ]);
}());
