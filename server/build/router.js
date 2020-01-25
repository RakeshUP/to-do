"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controller = require("./controller");

const router = (0, _express.Router)();
router.get('/', _controller.getTodo);
router.post('/', _controller.addTodo);
router.put('/:id', _controller.modifyTodo);
router.delete('/:id', _controller.deleteTodo);
var _default = router;
exports.default = _default;