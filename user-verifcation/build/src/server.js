'use strict';

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http2.default.createServer(_index2.default).listen(_index2.default.get('port'));

console.info('app is running on port : ' + _index2.default.get('port'));