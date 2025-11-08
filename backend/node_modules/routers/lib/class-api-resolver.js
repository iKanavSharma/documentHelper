'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _apiResolver = require('./api-resolver');

var _apiResolver2 = _interopRequireDefault(_apiResolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function classApiResolver(pathname) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var dataType = _ref.dataType;

  return (0, _apiResolver2.default)(pathname, {
    dataType: dataType,
    descriptorToHandler: function descriptorToHandler(context, _ref2) {
      var controller = _ref2.controller;
      var action = _ref2.action;

      if (!context.handlerFiles) {
        context.handlerFiles = {};
      }
      if (!context.handlerFiles[controller]) {
        var handlerFile = require.resolve(_path2.default.join(context.root, controller));
        var handlerModule = require(handlerFile);

        if (typeof handlerModule !== 'function') {
          throw new Error('Controllers must export a class (' + handlerFile + ')');
        }

        context.handlerFiles[controller] = new handlerModule();
      }

      if (!context.handlerFiles[controller][action]) {
        throw new Error('Could not find a method named ' + action + ' in the class exported from the ' + controller + ' controller');
      }

      var instance = context.handlerFiles[controller];
      return instance[action].bind(instance);
    }
  });
}

exports.default = classApiResolver;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGFzcy1hcGktcmVzb2x2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFNBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBdUQ7bUVBQUosa0JBQUk7O01BQWpCLHlCQUFpQjs7QUFDckQsU0FBTywyQkFBWSxRQUFaLEVBQXNCO0FBQzNCLHNCQUQyQjtBQUUzQixzREFBb0IsZ0JBQWlDO1VBQXRCLDhCQUFzQjtVQUFWLHNCQUFVOztBQUNuRCxVQUFJLENBQUMsUUFBUSxZQUFSLEVBQXNCO0FBQUUsZ0JBQVEsWUFBUixHQUF1QixFQUF2QixDQUFGO09BQTNCO0FBQ0EsVUFBSSxDQUFDLFFBQVEsWUFBUixDQUFxQixVQUFyQixDQUFELEVBQW1DO0FBQ3JDLFlBQU0sY0FBYyxRQUFRLE9BQVIsQ0FBZ0IsZUFBSyxJQUFMLENBQVUsUUFBUSxJQUFSLEVBQWMsVUFBeEIsQ0FBaEIsQ0FBZCxDQUQrQjtBQUVyQyxZQUFNLGdCQUFnQixRQUFRLFdBQVIsQ0FBaEIsQ0FGK0I7O0FBSXJDLFlBQUksT0FBTyxhQUFQLEtBQTBCLFVBQTFCLEVBQXNDO0FBQ3hDLGdCQUFNLElBQUksS0FBSix1Q0FBOEMsaUJBQTlDLENBQU4sQ0FEd0M7U0FBMUM7O0FBSUEsZ0JBQVEsWUFBUixDQUFxQixVQUFyQixJQUFtQyxJQUFJLGFBQUosRUFBbkMsQ0FScUM7T0FBdkM7O0FBV0EsVUFBSSxDQUFDLFFBQVEsWUFBUixDQUFxQixVQUFyQixFQUFpQyxNQUFqQyxDQUFELEVBQTJDO0FBQzdDLGNBQU0sSUFBSSxLQUFKLG9DQUEyQyw4Q0FBeUMsMEJBQXBGLENBQU4sQ0FENkM7T0FBL0M7O0FBSUEsVUFBTSxXQUFXLFFBQVEsWUFBUixDQUFxQixVQUFyQixDQUFYLENBakI2QztBQWtCbkQsYUFBTyxTQUFTLE1BQVQsRUFBaUIsSUFBakIsQ0FBc0IsUUFBdEIsQ0FBUCxDQWxCbUQ7S0FGMUI7R0FBdEIsQ0FBUCxDQURxRDtDQUF2RDs7a0JBMEJlIiwiZmlsZSI6ImNsYXNzLWFwaS1yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGFwaVJlc29sdmVyIGZyb20gJy4vYXBpLXJlc29sdmVyJztcblxuZnVuY3Rpb24gY2xhc3NBcGlSZXNvbHZlcihwYXRobmFtZSwgeyBkYXRhVHlwZSB9ID0ge30pIHtcbiAgcmV0dXJuIGFwaVJlc29sdmVyKHBhdGhuYW1lLCB7XG4gICAgZGF0YVR5cGUsXG4gICAgZGVzY3JpcHRvclRvSGFuZGxlcihjb250ZXh0LCB7IGNvbnRyb2xsZXIsIGFjdGlvbiB9KSB7XG4gICAgICBpZiAoIWNvbnRleHQuaGFuZGxlckZpbGVzKSB7IGNvbnRleHQuaGFuZGxlckZpbGVzID0ge30gfVxuICAgICAgaWYgKCFjb250ZXh0LmhhbmRsZXJGaWxlc1tjb250cm9sbGVyXSkge1xuICAgICAgICBjb25zdCBoYW5kbGVyRmlsZSA9IHJlcXVpcmUucmVzb2x2ZShwYXRoLmpvaW4oY29udGV4dC5yb290LCBjb250cm9sbGVyKSk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJNb2R1bGUgPSByZXF1aXJlKGhhbmRsZXJGaWxlKTtcblxuICAgICAgICBpZiAodHlwZW9mKGhhbmRsZXJNb2R1bGUpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb250cm9sbGVycyBtdXN0IGV4cG9ydCBhIGNsYXNzICgke2hhbmRsZXJGaWxlfSlgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuaGFuZGxlckZpbGVzW2NvbnRyb2xsZXJdID0gbmV3IGhhbmRsZXJNb2R1bGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjb250ZXh0LmhhbmRsZXJGaWxlc1tjb250cm9sbGVyXVthY3Rpb25dKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBtZXRob2QgbmFtZWQgJHthY3Rpb259IGluIHRoZSBjbGFzcyBleHBvcnRlZCBmcm9tIHRoZSAke2NvbnRyb2xsZXJ9IGNvbnRyb2xsZXJgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBjb250ZXh0LmhhbmRsZXJGaWxlc1tjb250cm9sbGVyXTtcbiAgICAgIHJldHVybiBpbnN0YW5jZVthY3Rpb25dLmJpbmQoaW5zdGFuY2UpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzQXBpUmVzb2x2ZXI7XG4iXX0=