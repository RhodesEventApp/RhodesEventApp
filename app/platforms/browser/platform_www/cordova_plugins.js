cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
        "id": "cordova-plugin-calendar.Calendar",
        "pluginId": "cordova-plugin-calendar",
        "clobbers": [
            "Calendar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
        "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
        "pluginId": "cordova-plugin-firebase-authentication",
        "merges": [
            "cordova.plugins.firebase.auth"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-calendar": "5.1.6",
    "cordova-plugin-firebase-authentication": "7.0.1"
}
// BOTTOM OF METADATA
});