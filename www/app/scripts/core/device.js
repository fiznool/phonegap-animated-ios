/**
 * Feature control according to device.
 */
define(function(require) {
  
  var device = require('recognizr');

  // Set CSS classes from recognizr
  var classStr = '';

  if (device.browser && device.browser.family) {
    classStr += ' ' + device.browser.family;
  }

  if (device.scroll) {
    if (device.scroll.toolbar) {
      classStr += ' ' + device.scroll.toolbar + 'bar';
    }

    if (device.scroll.form) {
      classStr += ' ' + device.scroll.form + 'form';
    }

  }

  if (device.animations) {
    classStr += ' ' + 'animations';
  }

  // Set the correct class on the root HTML element.
  document.documentElement.className += classStr;

  return device;

});