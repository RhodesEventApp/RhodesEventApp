/*jslint browser: true */
/*global Aerophane */

var aero;

(function init() {
    "use strict";

    if (aero) {
        return;
    }

    aero = new Aerophane("Rhodes Event Page", [
        {"name": "Home", "href": "../home/home.html"},
        {"name": "List", "href": "../list/list.html"},
        {"name": "Tabs", "href": "../tabs/tabs.html"},
        {"name": "Profile", "href": "../form/form.html"}
    ]);

}());
