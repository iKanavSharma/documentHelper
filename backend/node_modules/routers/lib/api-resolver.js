'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorHandler = require('./error-handler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _handlerResolver = require('./handler-resolver');

var _handlerResolver2 = _interopRequireDefault(_handlerResolver);

var _promisedResolver = require('./promised-resolver');

var _promisedResolver2 = _interopRequireDefault(_promisedResolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var formatters = {
  json: function json(res, statusCode, data) {
    res.status(statusCode);
    res.json(data);
  }
};

function apiResolver(pathname) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var dataType = _ref.dataType;

  var opts = _objectWithoutProperties(_ref, ['dataType']);

  var resolver = (0, _handlerResolver2.default)(pathname, opts);
  var formatter = formatters[dataType || 'json'];
  var handleError = (0, _errorHandler2.default)('boom');

  var resolve = (0, _promisedResolver2.default)(resolver, function (data, res, next) {
    formatter(res, 200, data);
  }, function (err, res, next) {
    console.log('error', err.stack);
    var data = handleError(err);
    formatter(res, data.statusCode, data);
  });

  resolve.resolver = resolver;
  resolve.formatter = formatter;
  resolve.handleError = handleError;

  resolve.errorHandler = function (err, req, res, next) {
    console.log('error', err.stack);
    var data = handleError(err);
    formatter(res, data.statusCode, data);
  };

  return resolve;
}

apiResolver.formatters = formatters;

exports.default = apiResolver;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGktcmVzb2x2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU0sYUFBYTtBQUNqQixzQkFBSyxLQUFLLFlBQVksTUFBTTtBQUMxQixRQUFJLE1BQUosQ0FBVyxVQUFYLEVBRDBCO0FBRTFCLFFBQUksSUFBSixDQUFTLElBQVQsRUFGMEI7R0FEWDtDQUFiOztBQU9OLFNBQVMsV0FBVCxDQUFxQixRQUFyQixFQUEyRDttRUFBSixrQkFBSTs7TUFBMUIseUJBQTBCOztNQUFiLG9EQUFhOztBQUN6RCxNQUFNLFdBQVcsK0JBQWdCLFFBQWhCLEVBQTBCLElBQTFCLENBQVgsQ0FEbUQ7QUFFekQsTUFBTSxZQUFZLFdBQVcsWUFBWSxNQUFaLENBQXZCLENBRm1EO0FBR3pELE1BQU0sY0FBYyw0QkFBYSxNQUFiLENBQWQsQ0FIbUQ7O0FBS3pELE1BQU0sVUFBVSxnQ0FDZCxRQURjLEVBRWQsVUFBVSxJQUFWLEVBQWdCLEdBQWhCLEVBQXFCLElBQXJCLEVBQTJCO0FBQ3pCLGNBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0IsSUFBcEIsRUFEeUI7R0FBM0IsRUFHQSxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLElBQXBCLEVBQTBCO0FBQ3hCLFlBQVEsR0FBUixDQUFZLE9BQVosRUFBcUIsSUFBSSxLQUFKLENBQXJCLENBRHdCO0FBRXhCLFFBQU0sT0FBTyxZQUFZLEdBQVosQ0FBUCxDQUZrQjtBQUd4QixjQUFVLEdBQVYsRUFBZSxLQUFLLFVBQUwsRUFBaUIsSUFBaEMsRUFId0I7R0FBMUIsQ0FMSSxDQUxtRDs7QUFpQnpELFVBQVEsUUFBUixHQUFtQixRQUFuQixDQWpCeUQ7QUFrQnpELFVBQVEsU0FBUixHQUFvQixTQUFwQixDQWxCeUQ7QUFtQnpELFVBQVEsV0FBUixHQUFzQixXQUF0QixDQW5CeUQ7O0FBcUJ6RCxVQUFRLFlBQVIsR0FBdUIsVUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixJQUF4QixFQUE4QjtBQUNuRCxZQUFRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLElBQUksS0FBSixDQUFyQixDQURtRDtBQUVuRCxRQUFNLE9BQU8sWUFBWSxHQUFaLENBQVAsQ0FGNkM7QUFHbkQsY0FBVSxHQUFWLEVBQWUsS0FBSyxVQUFMLEVBQWlCLElBQWhDLEVBSG1EO0dBQTlCLENBckJrQzs7QUEyQnpELFNBQU8sT0FBUCxDQTNCeUQ7Q0FBM0Q7O0FBOEJBLFlBQVksVUFBWixHQUF5QixVQUF6Qjs7a0JBRWUiLCJmaWxlIjoiYXBpLXJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVycm9ySGFuZGxlciBmcm9tICcuL2Vycm9yLWhhbmRsZXInO1xuaW1wb3J0IGhhbmRsZXJSZXNvbHZlciBmcm9tICcuL2hhbmRsZXItcmVzb2x2ZXInO1xuaW1wb3J0IHByb21pc2VkUmVzb2x2ZXIgZnJvbSAnLi9wcm9taXNlZC1yZXNvbHZlcic7XG5cbmNvbnN0IGZvcm1hdHRlcnMgPSB7XG4gIGpzb24ocmVzLCBzdGF0dXNDb2RlLCBkYXRhKSB7XG4gICAgcmVzLnN0YXR1cyhzdGF0dXNDb2RlKTtcbiAgICByZXMuanNvbihkYXRhKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gYXBpUmVzb2x2ZXIocGF0aG5hbWUsIHsgZGF0YVR5cGUsIC4uLm9wdHMgfSA9IHt9KSB7XG4gIGNvbnN0IHJlc29sdmVyID0gaGFuZGxlclJlc29sdmVyKHBhdGhuYW1lLCBvcHRzKTtcbiAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1tkYXRhVHlwZSB8fCAnanNvbiddO1xuICBjb25zdCBoYW5kbGVFcnJvciA9IGVycm9ySGFuZGxlcignYm9vbScpO1xuXG4gIGNvbnN0IHJlc29sdmUgPSBwcm9taXNlZFJlc29sdmVyKFxuICAgIHJlc29sdmVyLFxuICAgIGZ1bmN0aW9uIChkYXRhLCByZXMsIG5leHQpIHtcbiAgICAgIGZvcm1hdHRlcihyZXMsIDIwMCwgZGF0YSk7XG4gICAgfSxcbiAgICBmdW5jdGlvbiAoZXJyLCByZXMsIG5leHQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVyci5zdGFjayk7XG4gICAgICBjb25zdCBkYXRhID0gaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgIGZvcm1hdHRlcihyZXMsIGRhdGEuc3RhdHVzQ29kZSwgZGF0YSk7XG4gICAgfVxuICApO1xuXG4gIHJlc29sdmUucmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgcmVzb2x2ZS5mb3JtYXR0ZXIgPSBmb3JtYXR0ZXI7XG4gIHJlc29sdmUuaGFuZGxlRXJyb3IgPSBoYW5kbGVFcnJvcjtcblxuICByZXNvbHZlLmVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnIuc3RhY2spO1xuICAgIGNvbnN0IGRhdGEgPSBoYW5kbGVFcnJvcihlcnIpO1xuICAgIGZvcm1hdHRlcihyZXMsIGRhdGEuc3RhdHVzQ29kZSwgZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIHJlc29sdmU7XG59XG5cbmFwaVJlc29sdmVyLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuXG5leHBvcnQgZGVmYXVsdCBhcGlSZXNvbHZlcjtcbiJdfQ==