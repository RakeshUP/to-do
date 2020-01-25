"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTodo = exports.modifyTodo = exports.addTodo = exports.getTodo = void 0;

var _dbutil = require("./dbutil");

var _mongodb = require("mongodb");

const dbName = 'toDo';

const getTodos = async () => (0, _dbutil.getDB)().db(dbName).collection('todos').find().toArray();

const getTodo = async (req, res) => res.send((await getTodos()));

exports.getTodo = getTodo;

const addTodo = async (req, res) => {
  const db = (0, _dbutil.getDB)();
  await db.db(dbName).collection('todos').insertOne(req.body);
  res.send((await getTodos()));
};

exports.addTodo = addTodo;

const modifyTodo = async (req, res) => {
  const id = new _mongodb.ObjectID(req.params.id);
  const {
    _id,
    ...updateObject
  } = req.body;
  await (0, _dbutil.getDB)().db(dbName).collection('todos').updateOne({
    _id: id
  }, {
    $set: updateObject
  });
  res.send((await getTodos()));
};

exports.modifyTodo = modifyTodo;

const deleteTodo = async (req, res) => {
  const id = new _mongodb.ObjectID(req.params.id);
  await (0, _dbutil.getDB)().db(dbName).collection('todos').deleteOne({
    _id: id
  });
  res.send((await getTodos()));
};

exports.deleteTodo = deleteTodo;