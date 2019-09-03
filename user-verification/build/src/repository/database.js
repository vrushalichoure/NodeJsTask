'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mysql = require('mysql');

var mysql = _interopRequireWildcard(_mysql);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = mysql.createConnection({
    host: 'localhost',
    database: 'demodb',
    user: 'root',
    password: 'root'
});

var Database = function () {
    function Database() {
        (0, _classCallCheck3.default)(this, Database);

        this.getConnection();
    }

    (0, _createClass3.default)(Database, [{
        key: 'getConnection',
        value: function getConnection() {
            pool.connect(function (err, connection) {
                if (err) {
                    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                        console.error('Database connection was closed.');
                    }
                    if (err.code === 'ER_CON_COUNT_ERROR') {
                        console.error('Database has too many connections.');
                    }
                    if (err.code === 'ECONNREFUSED') {
                        console.error('Database connection was refused.');
                    }
                }
                if (connection) {
                    console.log('Db-Connected');
                    connection.release();
                }
                return;
            });
        }
    }], [{
        key: 'query',
        value: function query(sql) {
            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return new _promise2.default(function (resolve, reject) {
                pool.query(sql, args, function (err, rows) {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });
        }
    }, {
        key: 'Execute',
        value: function Execute(procedureName) {
            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return this.queryDB(this.formatProcedure(procedureName, args), args);
        }
    }, {
        key: 'formatProcedure',
        value: function formatProcedure(procedureName, args) {
            var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var procedure = 'call ' + procedureName + '(';
            if (args != null) {
                args.forEach(function (value, index) {
                    procedure += index === args.length - 1 ? '?' : '?, ';
                });
            }

            if (result) {
                procedure += ', @result);select @result';
            } else {
                procedure += ');';
            }
            return procedure;
        }
    }, {
        key: 'queryDB',
        value: function queryDB(sql) {
            var _this = this;

            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return new _promise2.default(function (resolve, reject) {
                pool.query(sql, args, function (err, rows, cols) {
                    if (err) return reject(err);
                    rows = _this.removeByKey(rows, {
                        key: 'protocol41'
                    });
                    var result = rows.length > 1 ? JSON.parse((0, _stringify2.default)(rows)) : JSON.parse((0, _stringify2.default)(rows[0]));
                    resolve(result);
                });
            });
        }
    }, {
        key: 'removeByKey',
        value: function removeByKey(array, params) {
            if (array.length) {
                array.some(function (item, index) {
                    return array[index][params.key] ? !!array.splice(index, 1) : false;
                });

                return array;
            }
            return [{ result: 1 }];
        }
    }]);
    return Database;
}();

exports.default = Database;