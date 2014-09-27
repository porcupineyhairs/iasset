/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// ----- vendor css/font imports ----- //
app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
app.import('bower_components/fontawesome/css/font-awesome.min.css');
app.import('bower_components/ember-spin-box/dist/ember-spin-box.min.css');
app.import('bower_components/ember-date-picker/dist/ember-date-picker.min.css');
app.import('bower_components/morrisjs/morris.css');
app.import('bower_components/fontawesome/fonts/fontawesome-webfont.woff', { destDir: 'fonts' });
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', { destDir: 'fonts' });

// ----- vendor js imports ----- //
app.import('bower_components/jquery/dist/jquery.min.js');
app.import('bower_components/ic-ajax/dist/globals/main.js');
app.import('bower_components/ember-addons.bs_for_ember/dist/js/bs-core.min.js');
app.import('bower_components/ember-addons.bs_for_ember/dist/js/bs-button.min.js');
app.import('bower_components/ember-simple-auth/simple-auth.amd.js');
app.import('bower_components/ember-forms/dist/globals/main.js');
app.import('bower_components/JavaScript-MD5/js/md5.min.js');
app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
app.import('bower_components/momentjs/min/moment.min.js');
app.import('bower_components/ember-spin-box/dist/ember-spin-box.min.js');
app.import('bower_components/ember-date-picker/dist/ember-date-picker.min.js');
app.import('bower_components/morrisjs/morris.min.js');
app.import('bower_components/raphael/raphael-min.js');


module.exports = app.toTree();
