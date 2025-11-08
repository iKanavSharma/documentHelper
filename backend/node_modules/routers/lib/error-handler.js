'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlers = {
  boom: function boom(err) {
    if (err.isBoom) {
      var _err$output$payload = err.output.payload;
      var statusCode = _err$output$payload.statusCode;
      var error = _err$output$payload.error;
      var message = _err$output$payload.message;


      return {
        statusCode: statusCode,
        error: error,
        message: message
      };
    }
  }
};

function createHandler(handlerNames) {
  var handlerList = handlerNames.map(function (name) {
    if (!handlers[name]) {
      var availableHandlers = Object.keys(handlers).join(', ');
      throw new Error('No error handler named ' + name + '. Available are ' + availableHandlers);
    }
    return handlers[name];
  });

  handlerList.push(function (err) {
    return {
      statusCode: 500,
      message: err.message
    };
  });

  return function (err) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = handlerList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var handler = _step.value;

        var res = handler(err);
        if (res !== undefined) {
          return res;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
}

function errorHandler() {
  for (var _len = arguments.length, handlerNames = Array(_len), _key = 0; _key < _len; _key++) {
    handlerNames[_key] = arguments[_key];
  }

  return createHandler(handlerNames);
}

errorHandler.handlers = handlers;

exports.default = errorHandler;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvci1oYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sV0FBVztBQUNmLHNCQUFLLEtBQUs7QUFDUixRQUFJLElBQUksTUFBSixFQUFZO2dDQUN1QixJQUFJLE1BQUosQ0FBVyxPQUFYLENBRHZCO1VBQ1IsNENBRFE7VUFDSSxrQ0FESjtVQUNXLHNDQURYOzs7QUFHZCxhQUFPO0FBQ0wsOEJBREs7QUFFTCxvQkFGSztBQUdMLHdCQUhLO09BQVAsQ0FIYztLQUFoQjtHQUZhO0NBQVg7O0FBY04sU0FBUyxhQUFULENBQXVCLFlBQXZCLEVBQXFDO0FBQ25DLE1BQU0sY0FBYyxhQUFhLEdBQWIsQ0FBaUIsVUFBQyxJQUFELEVBQVU7QUFDN0MsUUFBSSxDQUFDLFNBQVMsSUFBVCxDQUFELEVBQWlCO0FBQ25CLFVBQU0sb0JBQW9CLE9BQU8sSUFBUCxDQUFZLFFBQVosRUFBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBcEIsQ0FEYTtBQUVuQixZQUFNLElBQUksS0FBSiw2QkFBb0MsNEJBQXVCLGlCQUEzRCxDQUFOLENBRm1CO0tBQXJCO0FBSUEsV0FBTyxTQUFTLElBQVQsQ0FBUCxDQUw2QztHQUFWLENBQS9CLENBRDZCOztBQVNuQyxjQUFZLElBQVosQ0FBaUIsVUFBQyxHQUFEO1dBQVU7QUFDekIsa0JBQVksR0FBWjtBQUNBLGVBQVMsSUFBSSxPQUFKOztHQUZNLENBQWpCLENBVG1DOztBQWNuQyxTQUFPLFVBQVMsR0FBVCxFQUFjOzs7Ozs7QUFDbkIsMkJBQXNCLHFDQUF0QixvR0FBbUM7WUFBeEIsc0JBQXdCOztBQUNqQyxZQUFNLE1BQU0sUUFBUSxHQUFSLENBQU4sQ0FEMkI7QUFFakMsWUFBSSxRQUFRLFNBQVIsRUFBbUI7QUFBRSxpQkFBTyxHQUFQLENBQUY7U0FBdkI7T0FGRjs7Ozs7Ozs7Ozs7Ozs7S0FEbUI7R0FBZCxDQWQ0QjtDQUFyQzs7QUFzQkEsU0FBUyxZQUFULEdBQXVDO29DQUFkOztHQUFjOztBQUNyQyxTQUFPLGNBQWMsWUFBZCxDQUFQLENBRHFDO0NBQXZDOztBQUlBLGFBQWEsUUFBYixHQUF3QixRQUF4Qjs7a0JBRWUiLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcblxuY29uc3QgaGFuZGxlcnMgPSB7XG4gIGJvb20oZXJyKSB7XG4gICAgaWYgKGVyci5pc0Jvb20pIHtcbiAgICAgIGxldCB7IHN0YXR1c0NvZGUsIGVycm9yLCBtZXNzYWdlIH0gPSBlcnIub3V0cHV0LnBheWxvYWQ7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgIGVycm9yLFxuICAgICAgICBtZXNzYWdlXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlSGFuZGxlcihoYW5kbGVyTmFtZXMpIHtcbiAgY29uc3QgaGFuZGxlckxpc3QgPSBoYW5kbGVyTmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgaWYgKCFoYW5kbGVyc1tuYW1lXSkge1xuICAgICAgY29uc3QgYXZhaWxhYmxlSGFuZGxlcnMgPSBPYmplY3Qua2V5cyhoYW5kbGVycykuam9pbignLCAnKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZXJyb3IgaGFuZGxlciBuYW1lZCAke25hbWV9LiBBdmFpbGFibGUgYXJlICR7YXZhaWxhYmxlSGFuZGxlcnN9YCk7XG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVyc1tuYW1lXTtcbiAgfSk7XG5cbiAgaGFuZGxlckxpc3QucHVzaCgoZXJyKSA9PiAoe1xuICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGVycikge1xuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiBoYW5kbGVyTGlzdCkge1xuICAgICAgY29uc3QgcmVzID0gaGFuZGxlcihlcnIpO1xuICAgICAgaWYgKHJlcyAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiByZXM7IH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKC4uLmhhbmRsZXJOYW1lcykge1xuICByZXR1cm4gY3JlYXRlSGFuZGxlcihoYW5kbGVyTmFtZXMpO1xufVxuXG5lcnJvckhhbmRsZXIuaGFuZGxlcnMgPSBoYW5kbGVycztcblxuZXhwb3J0IGRlZmF1bHQgZXJyb3JIYW5kbGVyO1xuIl19