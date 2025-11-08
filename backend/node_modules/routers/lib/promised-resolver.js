"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function promisedResolver(resolve, handleResponse, handleError) {
  return function (handler) {
    if (resolve) {
      handler = resolve(handler);
    }

    if (handler.length > 1) {
      return handler;
    }

    return function (req, res, next) {
      Promise.resolve(handler(req)).then(function (data) {
        return handleResponse(data, res, next);
      }, function (err) {
        return handleError(err, res, next);
      });
    };
  };
}

exports.default = promisedResolver;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9taXNlZC1yZXNvbHZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsY0FBbkMsRUFBbUQsV0FBbkQsRUFBZ0U7QUFDOUQsU0FBTyxVQUFTLE9BQVQsRUFBa0I7QUFDdkIsUUFBSSxPQUFKLEVBQWE7QUFDWCxnQkFBVSxRQUFRLE9BQVIsQ0FBVixDQURXO0tBQWI7O0FBSUEsUUFBSSxRQUFRLE1BQVIsR0FBaUIsQ0FBakIsRUFBb0I7QUFBRSxhQUFPLE9BQVAsQ0FBRjtLQUF4Qjs7QUFFQSxXQUFPLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUI7QUFDOUIsY0FBUSxPQUFSLENBQWdCLFFBQVEsR0FBUixDQUFoQixFQUE4QixJQUE5QixDQUNFLFVBQUMsSUFBRDtlQUFVLGVBQWUsSUFBZixFQUFxQixHQUFyQixFQUEwQixJQUExQjtPQUFWLEVBQ0EsVUFBQyxHQUFEO2VBQVMsWUFBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCO09BQVQsQ0FGRixDQUQ4QjtLQUF6QixDQVBnQjtHQUFsQixDQUR1RDtDQUFoRTs7a0JBaUJlIiwiZmlsZSI6InByb21pc2VkLXJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHJvbWlzZWRSZXNvbHZlcihyZXNvbHZlLCBoYW5kbGVSZXNwb25zZSwgaGFuZGxlRXJyb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgaGFuZGxlciA9IHJlc29sdmUoaGFuZGxlcik7XG4gICAgfVxuXG4gICAgaWYgKGhhbmRsZXIubGVuZ3RoID4gMSkgeyByZXR1cm4gaGFuZGxlcjsgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoaGFuZGxlcihyZXEpKS50aGVuKFxuICAgICAgICAoZGF0YSkgPT4gaGFuZGxlUmVzcG9uc2UoZGF0YSwgcmVzLCBuZXh0KSxcbiAgICAgICAgKGVycikgPT4gaGFuZGxlRXJyb3IoZXJyLCByZXMsIG5leHQpXG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJvbWlzZWRSZXNvbHZlcjtcbiJdfQ==