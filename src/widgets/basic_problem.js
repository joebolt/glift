glift.widgets.createBasicProblem = function(options) {
  var displayTypes = glift.enums.displayTypes;
  var boardRegions = glift.enums.boardRegions;
  var point = glift.util.point;
  var divId = options.divId;

  options.controllerType = "STATIC_PROBLEM_STUDY";
  var controller = glift.createController(options);
  var cropping = glift.bridge.getFromMovetree(controller.movetree);
  var display = glift.createDisplay(options);
  glift.bridge.setDisplayState(controller.getEntireBoardState(), display);
  return new glift.widgets._BasicProblem(display, controller);
};

// Basic problem function object.  Meant to be private;
glift.widgets._BasicProblem = function(display, controller) {
  this.display = display;
  this.controller = controller;

  var hoverColors = {
    "BLACK": "BLACK_HOVER",
    "WHITE": "WHITE_HOVER"
  };

  display.setClickHandler(function(pt) {
    var currentPlayer = controller.getCurrentPlayer();
    var data = controller.addStone(pt, currentPlayer);
    $('#extra_info').text(data.message + '//' + (data.result || ''));
    if (data.data !== undefined) {
      glift.bridge.setDisplayState(data.data, display);
    }
  });

  display.setHoverInHandler(function(pt) {
    var currentPlayer = controller.getCurrentPlayer();
    if (controller.canAddStone(pt, currentPlayer)) {
      display.setColor(pt, hoverColors[currentPlayer]);
    }
  });

  display.setHoverOutHandler(function(pt) {
    var currentPlayer = controller.getCurrentPlayer();
    if (controller.canAddStone(pt, currentPlayer)) {
      display.setColor(pt, 'EMPTY');
    }
  });
};

glift.widgets._BasicProblem.prototype = {
  enableAutoResizing: function() {
    this.display.enableAutoResizing();
  }
}