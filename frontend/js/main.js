require.config({
    paths: {
        "jquery": "jquery",
        "knockout": "knockout-3.2.0",
        "jqx-all": "jqx-all"
    },
    shim: {
        "jqx-all": {
            export: "$",
            deps: ['jquery']
        }
    }
});
require(["app"], function (App) {
    App.initialize();
});

