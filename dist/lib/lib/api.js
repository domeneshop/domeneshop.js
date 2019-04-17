"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Class for Domeneshop API calls.
 */
var Api =
/*#__PURE__*/
function () {
  /**
   * Set up token and secret for API access.
   * 
   * @param token API token
   * @param secret API secret
   */
  function Api(token, secret) {
    _classCallCheck(this, Api);

    _defineProperty(this, "apiURL", "https://api.domeneshop.no/v0");

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "secret", void 0);

    this.token = token;
    this.secret = secret;
  }
  /**
   * Do an API call.
   * 
   * @param method Method for the request
   * @param endpoint Request endpoint
   * @param data Content of the request
   * @param params Params for the request
   */


  _createClass(Api, [{
    key: "apiCall",
    value: function apiCall() {
      var _this = this;

      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "GET";
      var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      var data = arguments.length > 2 ? arguments[2] : undefined;
      var params = arguments.length > 3 ? arguments[3] : undefined;
      return new Promise(function (resolve, reject) {
        var url = _this.apiURL + endpoint;
        var reqOptions = {
          method: method,
          headers: {
            "Authorization": 'Basic ' + Buffer.from(_this.token + ':' + _this.secret, 'binary').toString('base64'),
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: ''
        };

        if (params) {
          var query = Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
          }).join('&');
          url += '?' + query;
        }

        if (data) {
          reqOptions.body = JSON.stringify(data);
        }

        fetch(url, reqOptions).then(function (res) {
          if (res.status < 200 || res.status > 399) {
            reject(res);
          } else {
            resolve(res);
          }
        })["catch"](reject);
      });
    }
  }]);

  return Api;
}();

var _default = Api;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYXBpLnRzIl0sIm5hbWVzIjpbIkFwaSIsInRva2VuIiwic2VjcmV0IiwibWV0aG9kIiwiZW5kcG9pbnQiLCJkYXRhIiwicGFyYW1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ1cmwiLCJhcGlVUkwiLCJyZXFPcHRpb25zIiwiaGVhZGVycyIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsImJvZHkiLCJxdWVyeSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiSlNPTiIsInN0cmluZ2lmeSIsImZldGNoIiwidGhlbiIsInJlcyIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztJQUdNQSxHOzs7QUFLRjs7Ozs7O0FBTUEsZUFBWUMsS0FBWixFQUEwQkMsTUFBMUIsRUFBeUM7QUFBQTs7QUFBQSxvQ0FWVCw4QkFVUzs7QUFBQTs7QUFBQTs7QUFDckMsU0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7OzhCQVF3RztBQUFBOztBQUFBLFVBQXpGQyxNQUF5Rix1RUFBekUsS0FBeUU7QUFBQSxVQUFsRUMsUUFBa0UsdUVBQWhELEdBQWdEO0FBQUEsVUFBM0NDLElBQTJDO0FBQUEsVUFBaENDLE1BQWdDO0FBQ3BHLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyxZQUFJQyxHQUFVLEdBQUcsS0FBSSxDQUFDQyxNQUFMLEdBQWNQLFFBQS9CO0FBQ0EsWUFBSVEsVUFBc0IsR0FBRztBQUN6QlQsVUFBQUEsTUFBTSxFQUFFQSxNQURpQjtBQUV6QlUsVUFBQUEsT0FBTyxFQUFFO0FBQ0wsNkJBQWlCLFdBQVVDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUksQ0FBQ2QsS0FBTCxHQUFhLEdBQWIsR0FBbUIsS0FBSSxDQUFDQyxNQUFwQyxFQUEyQyxRQUEzQyxFQUFxRGMsUUFBckQsQ0FBOEQsUUFBOUQsQ0FEdEI7QUFFTCw0QkFBZ0Isa0JBRlg7QUFHTCxzQkFBVTtBQUhMLFdBRmdCO0FBT3pCQyxVQUFBQSxJQUFJLEVBQUU7QUFQbUIsU0FBN0I7O0FBU0EsWUFBR1gsTUFBSCxFQUFXO0FBQ1AsY0FBSVksS0FBWSxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWWQsTUFBWixFQUNsQmUsR0FEa0IsQ0FDZCxVQUFBQyxHQUFHO0FBQUEsbUJBQUlDLGtCQUFrQixDQUFDRCxHQUFELENBQWxCLEdBQTBCLEdBQTFCLEdBQWdDQyxrQkFBa0IsQ0FBQ2pCLE1BQU0sQ0FBQ2dCLEdBQUQsQ0FBUCxDQUF0RDtBQUFBLFdBRFcsRUFFbEJFLElBRmtCLENBRWIsR0FGYSxDQUFuQjtBQUdBZCxVQUFBQSxHQUFHLElBQUksTUFBTVEsS0FBYjtBQUNIOztBQUNELFlBQUdiLElBQUgsRUFBUztBQUNMTyxVQUFBQSxVQUFVLENBQUNLLElBQVgsR0FBa0JRLElBQUksQ0FBQ0MsU0FBTCxDQUFlckIsSUFBZixDQUFsQjtBQUNIOztBQUNEc0IsUUFBQUEsS0FBSyxDQUFDakIsR0FBRCxFQUFLRSxVQUFMLENBQUwsQ0FBc0JnQixJQUF0QixDQUEyQixVQUFDQyxHQUFELEVBQVM7QUFDaEMsY0FBR0EsR0FBRyxDQUFDQyxNQUFKLEdBQWEsR0FBYixJQUFvQkQsR0FBRyxDQUFDQyxNQUFKLEdBQWEsR0FBcEMsRUFBeUM7QUFDckNyQixZQUFBQSxNQUFNLENBQUNvQixHQUFELENBQU47QUFDSCxXQUZELE1BRU87QUFDSHJCLFlBQUFBLE9BQU8sQ0FBQ3FCLEdBQUQsQ0FBUDtBQUNIO0FBQ0osU0FORCxXQU1TcEIsTUFOVDtBQU9ILE9BM0JNLENBQVA7QUE0Qkg7Ozs7OztlQUdVVCxHIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDbGFzcyBmb3IgRG9tZW5lc2hvcCBBUEkgY2FsbHMuXG4gKi9cbmNsYXNzIEFwaSB7XG4gICAgcHVibGljIHJlYWRvbmx5IGFwaVVSTDpzdHJpbmcgPSBcImh0dHBzOi8vYXBpLmRvbWVuZXNob3Aubm8vdjBcIjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgdG9rZW46c3RyaW5nO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VjcmV0OnN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCB0b2tlbiBhbmQgc2VjcmV0IGZvciBBUEkgYWNjZXNzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB0b2tlbiBBUEkgdG9rZW5cbiAgICAgKiBAcGFyYW0gc2VjcmV0IEFQSSBzZWNyZXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0b2tlbjpzdHJpbmcsIHNlY3JldDpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgICAgICB0aGlzLnNlY3JldCA9IHNlY3JldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEbyBhbiBBUEkgY2FsbC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbWV0aG9kIE1ldGhvZCBmb3IgdGhlIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgUmVxdWVzdCBlbmRwb2ludFxuICAgICAqIEBwYXJhbSBkYXRhIENvbnRlbnQgb2YgdGhlIHJlcXVlc3RcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFBhcmFtcyBmb3IgdGhlIHJlcXVlc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgYXBpQ2FsbChtZXRob2Q6c3RyaW5nID0gXCJHRVRcIiwgZW5kcG9pbnQ6c3RyaW5nID0gXCIvXCIsIGRhdGE/OmFueSwgcGFyYW1zPzphbnkpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsOnN0cmluZyA9IHRoaXMuYXBpVVJMICsgZW5kcG9pbnQ7XG4gICAgICAgICAgICBsZXQgcmVxT3B0aW9uczpSZXF1ZXN0SW5pdCA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiAnQmFzaWMgJysgQnVmZmVyLmZyb20odGhpcy50b2tlbiArICc6JyArIHRoaXMuc2VjcmV0LCdiaW5hcnknKS50b1N0cmluZygnYmFzZTY0JyksIFxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiAnJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKHBhcmFtcykge1xuICAgICAgICAgICAgICAgIGxldCBxdWVyeTpzdHJpbmcgPSBPYmplY3Qua2V5cyhwYXJhbXMpXG4gICAgICAgICAgICAgICAgLm1hcChrZXkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0pKVxuICAgICAgICAgICAgICAgIC5qb2luKCcmJyk7XG4gICAgICAgICAgICAgICAgdXJsICs9ICc/JyArIHF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGF0YSkge1xuICAgICAgICAgICAgICAgIHJlcU9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmV0Y2godXJsLHJlcU9wdGlvbnMpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXMgPCAyMDAgfHwgcmVzLnN0YXR1cyA+IDM5OSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcGk7Il19