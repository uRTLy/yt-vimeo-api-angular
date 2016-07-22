"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require("angular");

var _angular2 = _interopRequireDefault(_angular);

var _inputUrlComponent = require("./inputUrl.component.js");

var _inputUrlComponent2 = _interopRequireDefault(_inputUrlComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UI = _angular2.default.module("UI", []).component("inputUrl", _inputUrlComponent2.default).name;

exports.default = UI;