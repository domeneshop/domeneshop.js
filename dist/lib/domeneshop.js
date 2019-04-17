"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./lib/api"));

var _dns = _interopRequireDefault(require("./lib/dns"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Domeneshop =
/*#__PURE__*/
function () {
  function Domeneshop(token, secret) {
    _classCallCheck(this, Domeneshop);

    _defineProperty(this, "version", "0.1.0");

    _defineProperty(this, "dns", void 0);

    _defineProperty(this, "api", void 0);

    this.api = new _api["default"](token, secret);
    this.dns = new _dns["default"](this.api);
  }
  /**
   * getDomains
   */


  _createClass(Domeneshop, [{
    key: "getDomains",
    value: function () {
      var _getDomains = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.api.apiCall("GET", "/domains");

              case 2:
                res = _context.sent;
                return _context.abrupt("return", res.json());

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDomains() {
        return _getDomains.apply(this, arguments);
      }

      return getDomains;
    }()
    /**
     * getDomain
     * 
     * @param id The ID number of domain.
     */

  }, {
    key: "getDomain",
    value: function () {
      var _getDomain = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.api.apiCall("GET", "/domains/".concat(id));

              case 2:
                res = _context2.sent;
                return _context2.abrupt("return", res.json());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDomain(_x) {
        return _getDomain.apply(this, arguments);
      }

      return getDomain;
    }()
  }]);

  return Domeneshop;
}();

var _default = Domeneshop;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb21lbmVzaG9wLnRzIl0sIm5hbWVzIjpbIkRvbWVuZXNob3AiLCJ0b2tlbiIsInNlY3JldCIsImFwaSIsIkFwaSIsImRucyIsIkRucyIsImFwaUNhbGwiLCJyZXMiLCJqc29uIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxVOzs7QUFNRixzQkFBWUMsS0FBWixFQUEwQkMsTUFBMUIsRUFBeUM7QUFBQTs7QUFBQSxxQ0FMUixPQUtROztBQUFBOztBQUFBOztBQUNyQyxTQUFLQyxHQUFMLEdBQVcsSUFBSUMsZUFBSixDQUFRSCxLQUFSLEVBQWNDLE1BQWQsQ0FBWDtBQUNBLFNBQUtHLEdBQUwsR0FBVyxJQUFJQyxlQUFKLENBQVEsS0FBS0gsR0FBYixDQUFYO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBSW9CLEtBQUtBLEdBQUwsQ0FBU0ksT0FBVCxDQUFpQixLQUFqQixFQUF3QixVQUF4QixDOzs7QUFBWkMsZ0JBQUFBLEc7aURBQ0dBLEdBQUcsQ0FBQ0MsSUFBSixFOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1g7Ozs7Ozs7Ozs7O2dEQUt1QkMsRTs7Ozs7Ozt1QkFDSCxLQUFLUCxHQUFMLENBQVNJLE9BQVQsQ0FBaUIsS0FBakIscUJBQW9DRyxFQUFwQyxFOzs7QUFBWkYsZ0JBQUFBLEc7a0RBQ0dBLEdBQUcsQ0FBQ0MsSUFBSixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFJQVQsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGkgZnJvbSBcIi4vbGliL2FwaVwiXG5pbXBvcnQgRG5zIGZyb20gXCIuL2xpYi9kbnNcIlxuXG5jbGFzcyBEb21lbmVzaG9wIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgdmVyc2lvbjpTdHJpbmcgPSBcIjAuMS4wXCI7XG4gICAgcHVibGljIGRuczpEbnM7XG5cbiAgICBwcml2YXRlIGFwaTpBcGk7XG5cbiAgICBjb25zdHJ1Y3Rvcih0b2tlbjpzdHJpbmcsIHNlY3JldDpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hcGkgPSBuZXcgQXBpKHRva2VuLHNlY3JldCk7XG4gICAgICAgIHRoaXMuZG5zID0gbmV3IERucyh0aGlzLmFwaSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0RG9tYWluc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXREb21haW5zKCkge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5hcGkuYXBpQ2FsbChcIkdFVFwiLCBcIi9kb21haW5zXCIpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXREb21haW5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gaWQgVGhlIElEIG51bWJlciBvZiBkb21haW4uXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldERvbWFpbihpZDpudW1iZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYXBpLmFwaUNhbGwoXCJHRVRcIiwgYC9kb21haW5zLyR7aWR9YCk7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9tZW5lc2hvcDsiXX0=