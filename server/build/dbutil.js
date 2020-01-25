"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDB = exports.setDB = void 0;
let mongodb;

const setDB = db => mongodb = db;

exports.setDB = setDB;

const getDB = () => mongodb;

exports.getDB = getDB;