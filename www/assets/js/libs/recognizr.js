/*
 * Recognizr
 * v0.4.0
 *
 * A small library to detect the capabilities of mobile web browsers.
 *
 * Mobile browsers are a bit of a pain. Some support native scrolling, others proclaim to support animations.
 * Real-world usage, however is patchy. This library uses UA sniffing (gosh!) to check what type of mobile browser
 * is present, and returns a simple object to indicate its capabilities.
 *
 * If AMD is present, it will not expose a global variable. Otherwise, Recognizr can be accessed using the Recognizr global.
 *
 * Thanks to @jtward for much hours of headscratching and frustration in debugging various browsers!
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.Recognizr = factory();
    }
}(window, function () {
    
  // Recognizr

  var Device = function(browserFamily, browserVersion, toolbar, form, animations, audio) {
    this.browser = {
      'family': browserFamily,
      'version': browserVersion
    };
    this.scroll = {
      'toolbar': toolbar,
      'form': form
    };
    this.animations = animations;
    this.audio = audio;
  };

  // Calculates what the deive is capable of, depending on the UA string.
  // It would be nice to use Modernizr, but somethings can't be feature detected
  // reliably (e.g. overflow:scroll support). Other things (e.g. animations) will
  // work in theory on some devices, but really shouldn't be, for performance reasons.
  var Recognizr = (function(ua) {

    // UA regexes from https://raw.github.com/tobie/ua-parser/master/regexes.yaml
    var webkit = ua.match(/AppleWebKit\/([0-9]+)/);
    var wkversion = webkit && webkit[1];
    var ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?.*AppleWebKit/);
    var iosversion = ios && ios.slice(1);
    // android versions are required because 2.2-3.2 have the same webkit version
    var android = ua.match(/Android (\d+)\.(\d+)(?:[.\-]([a-z0-9]+))?/);
    var androidversion = android && android.slice(1);
    var msie = ua.match(/MSIE (\d+)\.(\d+).*IEMobile/);
    var msieversion = msie && msie.slice(1);
    var blackberry = ua.match(/Blackberry.*Version\/(\d+)\.(\d+)(?:\.(\d+))?/);
    var bbversion = blackberry && blackberry.slice(1);
    var firefox = ua.match(/rv:(\d+)\.(\d+).*Firefox/);
    var ffversion = firefox && firefox.slice(1);
    var chrome = ua.match(/Chrome\/(\d+)\.(\d+)/) || ua.match(/Chromium\/(\d+)\.(\d+)/);
    var chromeversion = chrome && chrome.slice(1);

    // iOS: Mobile Safari or Chrome for iOS
    if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
      if (iosversion[0] >= 5) {
        // iOS 5/6
        // Supports pos:fixed but needs to be disabled when forms are present
        // as toolbars will start scrolling inline when form elements are active
        return new Device('ios', iosversion, 'fixed', 'inline', true, true);
        
      } else if(iosversion[0] >= 4) {
        // iOS 4.x
        // We no longer like iScroll, so scroll inline. Animations are out, too.
        return new Device('ios', iosversion, 'inline', 'inline', false, true);

      } else {
        // iOS < 4
        // Now audio is out.
        return new Device('ios', iosversion, 'inline', 'inline', false, false);
      }
    }

    // FIREFOX
    // Platforms: Windows/Macintosh/Linux/Android (not present for B2G)
    // Form factors: Tablet/Mobile (not present for desktop)
    // see https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference for info
    if (firefox) {
      // as of FF16, nearly good enough for fixed forms: the footer does not return to
      // the bottom of the page after the keyboard is hidden until the page is scrolled
      return new Device('firefox', ffversion, 'fixed', 'inline', true, true);

    }

    // ANDROID: Stock Browser
    if (ua.indexOf('Android') > -1) {
      if(androidversion[0] >= 4) {
        if(androidversion[0] >= 5 || androidversion[1] >= 1) {
          // 4.1 (jellybean) or higher; TODO: check form scrolling
           return new Device('android', androidversion, 'fixed', 'inline', true, true);

        } else {
          // 4.0 (ice-cream sandwich)
          // Supports pos:fixed but needs to be disabled when forms are present
          // as input element scrolls on top of the toolbar.
          // Animations are OK.
          return new Device('android', androidversion, 'fixed', 'inline', true, true);

        }

      } else if (wkversion && wkversion >= 533) { // Android 2.2+
        if(androidversion[0] >= 3 || androidversion[1] >= 3) {
          // Android 2.3 - 3.2
          // Supports pos:fixed but needs to be disabled when forms are present
          // as input element scrolls on top of the toolbar.
          // Animations are disabled.
          // Audio is enabled.
          return new Device('android', androidversion, 'fixed', 'inline', false, true);

        } else {
          // Android 2.2
          // as 2.3 - 3.2, except that audio is disabled, and use inline scrolling.
          return new Device('android', androidversion, 'inline', 'inline', false, false);

        }
      } else {
        // Sucky Android version. Minimal anything.
        return new Device('android', androidversion, 'inline', 'inline', false, false);

      }
    }

    // CHROME / CHROMIUM
    // Well supported, even form fields can be scrolled.
    if (ua.indexOf('Chrome') > -1 || ua.indexOf('Chromium') > -1) {
      return new Device('chrome', chromeversion, 'fixed', 'fixed', true, true);

    }

    // EVERYTHING ELSE
    // Basics. Inline scrolling, no animations, no audio.
    return new Device('unknown', '', 'inline', 'inline', false, false);

  })(navigator.userAgent);


  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return Recognizr;
    
}));