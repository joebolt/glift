glift.controllers.processOptions = function(rawOptions) {
  // Default options
  var defaults = {
    // intersections: 19, -- intersections is not necessary, since it's set via
    // the SGF (and the default is 19 anyway).
    initialPosition: [], // user can pass in a string?
    sgfString: ''
  };
  for (var key in rawOptions) {
    var value = rawOptions[key];
    switch(key) {
      case 'initialPosition':
        if (glift.util.typeOf(value) === 'string') {
          // If there's an error, a ParseError will be thrown.
          defaults.initialPosition =
              glift.treepath.rules.parseInitPosition(value);
        } else if (glift.util.typeOf(value) === 'array') {
          defaults.initialPosition = value;
        } else {
          throw "Unknown type for option initialPosition: " + value;
        }
        break;

      case 'sgfString':
        if (glift.util.typeOf(value) === 'string') {
          defaults.sgfString = value;
        } else {
          throw "Bad type for sgfString -- was expecting an SGF string: " + value;
        }
        break;

      default:
        // Don't do anything.  This is really convenient for widgets.
    }
  }
  return defaults;
};
