(function() {

  // Fix Android JSON.parse bug
  // http://code.google.com/p/android/issues/detail?id=11973
  JSON.originalParse = JSON.parse;

  JSON.parse = function(text) {
    if(text) {
      return JSON.originalParse(text);
    } else {
      return text;
    }
  };

})();