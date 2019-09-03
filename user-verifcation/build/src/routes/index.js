'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user.route');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', 3000);

(0, _user2.default)(app);

exports.default = app;