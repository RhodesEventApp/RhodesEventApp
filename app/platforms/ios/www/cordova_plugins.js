cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-calendar.Calendar",
      "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
      "pluginId": "cordova-plugin-calendar",
      "clobbers": [
        "Calendar"
      ]
    },
    {
      "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
      "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
      "pluginId": "cordova-plugin-firebase-authentication",
      "merges": [
        "cordova.plugins.firebase.auth"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-calendar": "5.1.6",
    "cordova-plugin-firebase-authentication": "7.0.1"
  };
});