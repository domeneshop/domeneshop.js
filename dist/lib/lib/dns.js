"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dnsrecord = require("./interfaces/dnsrecord");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dns =
/*#__PURE__*/
function () {
  /**
   * Create new DNS object
   * 
   * @param api Instance of Api-class
   */
  function Dns(api) {
    _classCallCheck(this, Dns);

    _defineProperty(this, "api", void 0);

    this.api = api;
  }
  /**
   * Get all DNS records for a domain.
   * @param domainId Domain ID for the domain in question
   */


  _createClass(Dns, [{
    key: "getRecords",
    value: function () {
      var _getRecords = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(domainId) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.api.apiCall("GET", "/domains/".concat(domainId, "/dns"));

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

      function getRecords(_x) {
        return _getRecords.apply(this, arguments);
      }

      return getRecords;
    }()
    /**
     * Get single record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     */

  }, {
    key: "getRecord",
    value: function () {
      var _getRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(domainId, recordId) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.api.apiCall("GET", "/domains/".concat(domainId, "/dns/").concat(recordId));

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

      function getRecord(_x2, _x3) {
        return _getRecord.apply(this, arguments);
      }

      return getRecord;
    }()
    /**
     * Create one record
     * @param domainId Domain ID for the domain in question
     * @param record The record to be crated
     */

  }, {
    key: "createRecord",
    value: function () {
      var _createRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(domainId, record) {
        var res, location;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _dnsrecord.validate)(record);
                _context3.next = 3;
                return this.api.apiCall("POST", "/domains/".concat(domainId, "/dns"), record);

              case 3:
                res = _context3.sent;
                location = res.headers.get('location');

                if (!location) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", location.split('/').slice(-1)[0]);

              case 9:
                throw new Error("This is not happening!!!!");

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createRecord(_x4, _x5) {
        return _createRecord.apply(this, arguments);
      }

      return createRecord;
    }()
    /**
     * Modify one record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     * @param record The new content of the record
     */

  }, {
    key: "modifyRecord",
    value: function () {
      var _modifyRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(domainId, recordId, record) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _dnsrecord.validate)(record);
                _context4.next = 3;
                return this.api.apiCall("PUT", "/domains/".concat(domainId, "/dns/").concat(recordId), record);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function modifyRecord(_x6, _x7, _x8) {
        return _modifyRecord.apply(this, arguments);
      }

      return modifyRecord;
    }()
    /**
     * Delete ove record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     */

  }, {
    key: "deleteRecord",
    value: function () {
      var _deleteRecord = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(domainId, recordId) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.api.apiCall("DELETE", "/domains/".concat(domainId, "/dns/").concat(recordId));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteRecord(_x9, _x10) {
        return _deleteRecord.apply(this, arguments);
      }

      return deleteRecord;
    }()
  }]);

  return Dns;
}();

var _default = Dns;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZG5zLnRzIl0sIm5hbWVzIjpbIkRucyIsImFwaSIsImRvbWFpbklkIiwiYXBpQ2FsbCIsInJlcyIsImpzb24iLCJyZWNvcmRJZCIsInJlY29yZCIsImxvY2F0aW9uIiwiaGVhZGVycyIsImdldCIsInNwbGl0Iiwic2xpY2UiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVNQSxHOzs7QUFHRjs7Ozs7QUFLQSxlQUFZQyxHQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ2pCLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OytDQUl3QkMsUTs7Ozs7Ozt1QkFDSixLQUFLRCxHQUFMLENBQVNFLE9BQVQsQ0FBaUIsS0FBakIscUJBQW9DRCxRQUFwQyxVOzs7QUFBWkUsZ0JBQUFBLEc7aURBQ0dBLEdBQUcsQ0FBQ0MsSUFBSixFOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1g7Ozs7Ozs7Ozs7O2dEQUt1QkgsUSxFQUFpQkksUTs7Ozs7Ozt1QkFDcEIsS0FBS0wsR0FBTCxDQUFTRSxPQUFULENBQWlCLEtBQWpCLHFCQUFvQ0QsUUFBcEMsa0JBQW9ESSxRQUFwRCxFOzs7QUFBWkYsZ0JBQUFBLEc7a0RBQ0dBLEdBQUcsQ0FBQ0MsSUFBSixFOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1g7Ozs7Ozs7Ozs7O2dEQUswQkgsUSxFQUFpQkssTTs7Ozs7O0FBQ3ZDLHlDQUFTQSxNQUFUOzt1QkFDZ0IsS0FBS04sR0FBTCxDQUFTRSxPQUFULENBQWlCLE1BQWpCLHFCQUFxQ0QsUUFBckMsV0FBcURLLE1BQXJELEM7OztBQUFaSCxnQkFBQUEsRztBQUNBSSxnQkFBQUEsUSxHQUFXSixHQUFHLENBQUNLLE9BQUosQ0FBWUMsR0FBWixDQUFnQixVQUFoQixDOztxQkFDWkYsUTs7Ozs7a0RBQ1FBLFFBQVEsQ0FBQ0csS0FBVCxDQUFlLEdBQWYsRUFBb0JDLEtBQXBCLENBQTBCLENBQUMsQ0FBM0IsRUFBOEIsQ0FBOUIsQzs7O3NCQUVELElBQUlDLEtBQUosQ0FBVSwyQkFBVixDOzs7Ozs7Ozs7Ozs7Ozs7O0FBR2Q7Ozs7Ozs7Ozs7OztnREFNMEJYLFEsRUFBaUJJLFEsRUFBaUJDLE07Ozs7O0FBQ3hELHlDQUFTQSxNQUFUOzt1QkFDTSxLQUFLTixHQUFMLENBQVNFLE9BQVQsQ0FBaUIsS0FBakIscUJBQW9DRCxRQUFwQyxrQkFBb0RJLFFBQXBELEdBQWdFQyxNQUFoRSxDOzs7Ozs7Ozs7Ozs7Ozs7O0FBR1Y7Ozs7Ozs7Ozs7O2dEQUswQkwsUSxFQUFpQkksUTs7Ozs7O3VCQUNqQyxLQUFLTCxHQUFMLENBQVNFLE9BQVQsQ0FBaUIsUUFBakIscUJBQXVDRCxRQUF2QyxrQkFBdURJLFFBQXZELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQU1DTixHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwaSBmcm9tIFwiLi9hcGlcIlxuaW1wb3J0IHtEbnNSZWNvcmQsIHZhbGlkYXRlfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2Ruc3JlY29yZFwiXG5cbmNsYXNzIERucyB7XG4gICAgcHJpdmF0ZSBhcGk6QXBpO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBETlMgb2JqZWN0XG4gICAgICogXG4gICAgICogQHBhcmFtIGFwaSBJbnN0YW5jZSBvZiBBcGktY2xhc3NcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihhcGk6QXBpKSB7XG4gICAgICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgRE5TIHJlY29yZHMgZm9yIGEgZG9tYWluLlxuICAgICAqIEBwYXJhbSBkb21haW5JZCBEb21haW4gSUQgZm9yIHRoZSBkb21haW4gaW4gcXVlc3Rpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0UmVjb3Jkcyhkb21haW5JZDpudW1iZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IGF3YWl0IHRoaXMuYXBpLmFwaUNhbGwoXCJHRVRcIiwgYC9kb21haW5zLyR7ZG9tYWluSWR9L2Ruc2ApO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgc2luZ2xlIHJlY29yZFxuICAgICAqIEBwYXJhbSBkb21haW5JZCBEb21haW4gSUQgZm9yIHRoZSBkb21haW4gaW4gcXVlc3Rpb25cbiAgICAgKiBAcGFyYW0gcmVjb3JkSWQgUmVjb3JkIElEIGZvciB0aGUgcmVjb3JkIGluIHF1ZXN0aW9uXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldFJlY29yZChkb21haW5JZDpudW1iZXIsIHJlY29yZElkOm51bWJlcikge1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5hcGkuYXBpQ2FsbChcIkdFVFwiLCBgL2RvbWFpbnMvJHtkb21haW5JZH0vZG5zLyR7cmVjb3JkSWR9YCk7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBvbmUgcmVjb3JkXG4gICAgICogQHBhcmFtIGRvbWFpbklkIERvbWFpbiBJRCBmb3IgdGhlIGRvbWFpbiBpbiBxdWVzdGlvblxuICAgICAqIEBwYXJhbSByZWNvcmQgVGhlIHJlY29yZCB0byBiZSBjcmF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlUmVjb3JkKGRvbWFpbklkOm51bWJlciwgcmVjb3JkOkRuc1JlY29yZCkge1xuICAgICAgICB2YWxpZGF0ZShyZWNvcmQpO1xuICAgICAgICB2YXIgcmVzID0gYXdhaXQgdGhpcy5hcGkuYXBpQ2FsbChcIlBPU1RcIiwgYC9kb21haW5zLyR7ZG9tYWluSWR9L2Ruc2AsIHJlY29yZCk7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IHJlcy5oZWFkZXJzLmdldCgnbG9jYXRpb24nKTtcbiAgICAgICAgaWYobG9jYXRpb24pXG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb24uc3BsaXQoJy8nKS5zbGljZSgtMSlbMF07XG4gICAgICAgIGVsc2UgICBcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXMgbm90IGhhcHBlbmluZyEhISFcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW9kaWZ5IG9uZSByZWNvcmRcbiAgICAgKiBAcGFyYW0gZG9tYWluSWQgRG9tYWluIElEIGZvciB0aGUgZG9tYWluIGluIHF1ZXN0aW9uXG4gICAgICogQHBhcmFtIHJlY29yZElkIFJlY29yZCBJRCBmb3IgdGhlIHJlY29yZCBpbiBxdWVzdGlvblxuICAgICAqIEBwYXJhbSByZWNvcmQgVGhlIG5ldyBjb250ZW50IG9mIHRoZSByZWNvcmRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgbW9kaWZ5UmVjb3JkKGRvbWFpbklkOm51bWJlciwgcmVjb3JkSWQ6bnVtYmVyLCByZWNvcmQ6RG5zUmVjb3JkKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdmFsaWRhdGUocmVjb3JkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hcGkuYXBpQ2FsbChcIlBVVFwiLCBgL2RvbWFpbnMvJHtkb21haW5JZH0vZG5zLyR7cmVjb3JkSWR9YCwgcmVjb3JkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgb3ZlIHJlY29yZFxuICAgICAqIEBwYXJhbSBkb21haW5JZCBEb21haW4gSUQgZm9yIHRoZSBkb21haW4gaW4gcXVlc3Rpb25cbiAgICAgKiBAcGFyYW0gcmVjb3JkSWQgUmVjb3JkIElEIGZvciB0aGUgcmVjb3JkIGluIHF1ZXN0aW9uXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlbGV0ZVJlY29yZChkb21haW5JZDpudW1iZXIsIHJlY29yZElkOm51bWJlcik6UHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuYXBpLmFwaUNhbGwoXCJERUxFVEVcIiwgYC9kb21haW5zLyR7ZG9tYWluSWR9L2Rucy8ke3JlY29yZElkfWApO1xuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERuczsiXX0=