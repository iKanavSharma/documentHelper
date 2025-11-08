'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (root, opts) {
  var resolver = new HandlerResolver(root, opts);
  return resolver.resolve.bind(resolver);
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultParseSpecToDescriptor(spec) {
  var matches = spec.match(/^([^#]+)(#(.+))?$/);
  if (!matches) {
    throw new Error('Invalid handler format');
  }

  return {
    controller: matches[1],
    action: matches[3]
  };
}

function defaultDescriptorToHandler(_ref, _ref2) {
  var root = _ref.root;
  var controller = _ref2.controller;
  var action = _ref2.action;

  var handlerFile = require.resolve(_path2.default.join(root, controller));
  var handlerModule = require(handlerFile);
  if (!handlerModule[action]) {
    throw new Error('Could not find a method named ' + action + ' in ' + handlerFile);
  }

  return handlerModule[action];
}

var HandlerResolver = function () {
  function HandlerResolver(root) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, HandlerResolver);

    this.root = _path2.default.resolve(process.cwd(), root || '');
    this.opts = {
      parseSpecToDescriptor: opts.parseSpecToDescriptor || defaultParseSpecToDescriptor,
      descriptorToHandler: opts.descriptorToHandler || defaultDescriptorToHandler
    };
  }

  _createClass(HandlerResolver, [{
    key: 'resolve',
    value: function resolve(spec) {
      if (typeof spec === 'string') {
        var _opts$parseSpecToDesc = this.opts.parseSpecToDescriptor(spec);

        var controller = _opts$parseSpecToDesc.controller;
        var _opts$parseSpecToDesc2 = _opts$parseSpecToDesc.action;
        var action = _opts$parseSpecToDesc2 === undefined ? 'index' : _opts$parseSpecToDesc2;

        return this.opts.descriptorToHandler(this, { controller: controller, action: action });
      }

      return spec;
    }
  }]);

  return HandlerResolver;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oYW5kbGVyLXJlc29sdmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQXlDZSxVQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCO0FBQ2xDLE1BQU0sV0FBVyxJQUFJLGVBQUosQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsQ0FBWCxDQUQ0QjtBQUVsQyxTQUFPLFNBQVMsT0FBVCxDQUFpQixJQUFqQixDQUFzQixRQUF0QixDQUFQLENBRmtDO0NBQXJCOzs7Ozs7Ozs7O0FBdkNmLFNBQVMsNEJBQVQsQ0FBc0MsSUFBdEMsRUFBNEM7QUFDMUMsTUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLG1CQUFYLENBQVYsQ0FEc0M7QUFFMUMsTUFBSSxDQUFDLE9BQUQsRUFBVTtBQUFFLFVBQU0sSUFBSSxLQUFKLENBQVUsd0JBQVYsQ0FBTixDQUFGO0dBQWQ7O0FBRUEsU0FBTztBQUNMLGdCQUFZLFFBQVEsQ0FBUixDQUFaO0FBQ0EsWUFBUSxRQUFRLENBQVIsQ0FBUjtHQUZGLENBSjBDO0NBQTVDOztBQVVBLFNBQVMsMEJBQVQsY0FBc0U7TUFBaEMsaUJBQWdDO01BQXRCLDhCQUFzQjtNQUFWLHNCQUFVOztBQUNwRSxNQUFJLGNBQWMsUUFBUSxPQUFSLENBQWdCLGVBQUssSUFBTCxDQUFVLElBQVYsRUFBZ0IsVUFBaEIsQ0FBaEIsQ0FBZCxDQURnRTtBQUVwRSxNQUFJLGdCQUFnQixRQUFRLFdBQVIsQ0FBaEIsQ0FGZ0U7QUFHcEUsTUFBSSxDQUFDLGNBQWMsTUFBZCxDQUFELEVBQXdCO0FBQzFCLFVBQU0sSUFBSSxLQUFKLG9DQUEyQyxrQkFBYSxXQUF4RCxDQUFOLENBRDBCO0dBQTVCOztBQUlBLFNBQU8sY0FBYyxNQUFkLENBQVAsQ0FQb0U7Q0FBdEU7O0lBVU07QUFDSixXQURJLGVBQ0osQ0FBWSxJQUFaLEVBQTZCO1FBQVgsNkRBQU8sa0JBQUk7OzBCQUR6QixpQkFDeUI7O0FBQzNCLFNBQUssSUFBTCxHQUFZLGVBQUssT0FBTCxDQUFhLFFBQVEsR0FBUixFQUFiLEVBQTRCLFFBQVEsRUFBUixDQUF4QyxDQUQyQjtBQUUzQixTQUFLLElBQUwsR0FBWTtBQUNWLDZCQUF1QixLQUFLLHFCQUFMLElBQThCLDRCQUE5QjtBQUN2QiwyQkFBcUIsS0FBSyxtQkFBTCxJQUE0QiwwQkFBNUI7S0FGdkIsQ0FGMkI7R0FBN0I7O2VBREk7OzRCQVNJLE1BQU07QUFDWixVQUFJLE9BQU8sSUFBUCxLQUFpQixRQUFqQixFQUEyQjtvQ0FDWSxLQUFLLElBQUwsQ0FBVSxxQkFBVixDQUFnQyxJQUFoQyxFQURaOztZQUNyQiw4Q0FEcUI7MkRBQ1QsT0FEUztZQUNULGdEQUFTLGlDQURBOztBQUU3QixlQUFPLEtBQUssSUFBTCxDQUFVLG1CQUFWLENBQThCLElBQTlCLEVBQW9DLEVBQUUsc0JBQUYsRUFBYyxjQUFkLEVBQXBDLENBQVAsQ0FGNkI7T0FBL0I7O0FBS0EsYUFBTyxJQUFQLENBTlk7Ozs7U0FUViIsImZpbGUiOiJoYW5kbGVyLXJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmZ1bmN0aW9uIGRlZmF1bHRQYXJzZVNwZWNUb0Rlc2NyaXB0b3Ioc3BlYykge1xuICB2YXIgbWF0Y2hlcyA9IHNwZWMubWF0Y2goL14oW14jXSspKCMoLispKT8kLyk7XG4gIGlmICghbWF0Y2hlcykgeyB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaGFuZGxlciBmb3JtYXQnKTsgfVxuXG4gIHJldHVybiB7XG4gICAgY29udHJvbGxlcjogbWF0Y2hlc1sxXSxcbiAgICBhY3Rpb246IG1hdGNoZXNbM11cbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdERlc2NyaXB0b3JUb0hhbmRsZXIoeyByb290IH0sIHsgY29udHJvbGxlciwgYWN0aW9uIH0pIHtcbiAgdmFyIGhhbmRsZXJGaWxlID0gcmVxdWlyZS5yZXNvbHZlKHBhdGguam9pbihyb290LCBjb250cm9sbGVyKSk7XG4gIHZhciBoYW5kbGVyTW9kdWxlID0gcmVxdWlyZShoYW5kbGVyRmlsZSk7XG4gIGlmICghaGFuZGxlck1vZHVsZVthY3Rpb25dKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhIG1ldGhvZCBuYW1lZCAke2FjdGlvbn0gaW4gJHtoYW5kbGVyRmlsZX1gKTtcbiAgfVxuXG4gIHJldHVybiBoYW5kbGVyTW9kdWxlW2FjdGlvbl07XG59XG5cbmNsYXNzIEhhbmRsZXJSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIG9wdHMgPSB7fSkge1xuICAgIHRoaXMucm9vdCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByb290IHx8ICcnKTtcbiAgICB0aGlzLm9wdHMgPSB7XG4gICAgICBwYXJzZVNwZWNUb0Rlc2NyaXB0b3I6IG9wdHMucGFyc2VTcGVjVG9EZXNjcmlwdG9yIHx8IGRlZmF1bHRQYXJzZVNwZWNUb0Rlc2NyaXB0b3IsXG4gICAgICBkZXNjcmlwdG9yVG9IYW5kbGVyOiBvcHRzLmRlc2NyaXB0b3JUb0hhbmRsZXIgfHwgZGVmYXVsdERlc2NyaXB0b3JUb0hhbmRsZXJcbiAgICB9O1xuICB9XG5cbiAgcmVzb2x2ZShzcGVjKSB7XG4gICAgaWYgKHR5cGVvZihzcGVjKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHsgY29udHJvbGxlciwgYWN0aW9uID0gJ2luZGV4JyB9ID0gdGhpcy5vcHRzLnBhcnNlU3BlY1RvRGVzY3JpcHRvcihzcGVjKTtcbiAgICAgIHJldHVybiB0aGlzLm9wdHMuZGVzY3JpcHRvclRvSGFuZGxlcih0aGlzLCB7IGNvbnRyb2xsZXIsIGFjdGlvbiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BlYztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyb290LCBvcHRzKSB7XG4gIGNvbnN0IHJlc29sdmVyID0gbmV3IEhhbmRsZXJSZXNvbHZlcihyb290LCBvcHRzKTtcbiAgcmV0dXJuIHJlc29sdmVyLnJlc29sdmUuYmluZChyZXNvbHZlcik7XG59XG4iXX0=