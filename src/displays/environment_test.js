glift.displays.environmentTest = function() {
  module('Environment Test Suite');
  var util = glift.util,
      displays = glift.displays,
      enums = glift.enums,
      env = glift.displays.environment,
      cropbox = displays.cropbox,
      WIDTH = 300,
      HEIGHT = 400;

  test('Creation of env object', function() {
    var envObj = env.get({
      heightOverride: HEIGHT,
      widthOverride: WIDTH
    });
    deepEqual(envObj.bbox.width(), WIDTH);
    deepEqual(envObj.bbox.height(), HEIGHT);
    deepEqual(envObj.divId, 'glift_display');
    deepEqual(envObj.divWidth, WIDTH);
    deepEqual(envObj.divHeight, HEIGHT);
    deepEqual(envObj.boardRegion, glift.enums.boardRegions.ALL);
    deepEqual(envObj.intersections, 19);
    deepEqual(envObj.drawBoardCoords, false);
  });

  test('Creation of square go board box', function() {
    //glift.util.logz('farfar');
    var guiEnv = env.getInitialized({
        divId: 'glift_display',
        heightOverride: HEIGHT,
        widthOverride: WIDTH
    });
    deepEqual(guiEnv.goBoardBox.height(), guiEnv.goBoardBox.width(),
        'Must create a square board for a long box');

    var guiEnv = env.getInitialized({
        divId: 'glift_display',
        heightOverride: WIDTH,
        widthOverride: HEIGHT
    });
    deepEqual(
        Math.round(guiEnv.goBoardBox.height()),
        Math.round(guiEnv.goBoardBox.width()),
        'Must create a square board for a tall box');
  });

  test('Test creation: tall div, square board', function() {
    var e = env.getInitialized({
        heightOverride: 400,
        widthOverride: 200
    });
    deepEqual(e.divBox.width(), 200, 'divBox width');
    deepEqual(e.divBox.height(), 400, 'divBox height');
    deepEqual(e.goBoardBox.height(), 200, 'goBoardBox height');
    deepEqual(e.goBoardBox.width(), 200, 'goBoardBox width');
    deepEqual(e.goBoardBox.topLeft().x(), 0, 'topLeft x');
    deepEqual(e.goBoardBox.topLeft().y(), 100, 'topLeft y');
    deepEqual(e.goBoardBox.botRight().x(), 200, 'botRight x');
    deepEqual(e.goBoardBox.botRight().y(), 300, 'botRight y');
  });

  test('Test creation: wide div, square board', function() {
    var e = env.getInitialized({
        heightOverride: 200,
        widthOverride: 400
    });
    deepEqual(e.divBox.width(), 400, 'divBox width');
    deepEqual(e.divBox.height(), 200, 'divBox height');
    deepEqual(e.goBoardBox.height(), 200, 'goBoardBox height');
    deepEqual(e.goBoardBox.width(), 200, 'goBoardBox width');
    deepEqual(e.goBoardBox.topLeft().x(), 100, 'topLeft x');
    deepEqual(e.goBoardBox.topLeft().y(), 0, 'topLeft y');
    deepEqual(e.goBoardBox.botRight().x(), 300, 'botRight x');
    deepEqual(e.goBoardBox.botRight().y(), 200, 'botRight y');
  });

  test('Test with real (square) div', function() {
    var env1 = env.getInitialized({
      divId: 'glift_display'
    });
    deepEqual(env1.divHeight, 400);
    deepEqual(env1.divWidth, 400);
    ok(env1.divBox !== undefined);
    deepEqual(env1.divBox.width(), 400);
    deepEqual(env1.divBox.height(), 400);
  });
};
