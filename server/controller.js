import { getDB } from './dbutil';
import { ObjectID } from 'mongodb';

const dbName = 'toDo';

const getTodos = async () => getDB().db(dbName).collection('todos').find().toArray();

const getTodo = async (req, res) => res.send(await getTodos());

const addTodo = async (req, res) => {
  const db = getDB();
  await db.db(dbName).collection('todos').insertOne(req.body);
  res.send(await getTodos());
};

const modifyTodo = async (req, res) => {
  const id = new ObjectID(req.params.id);
  const { _id, ...updateObject } = req.body;
  await getDB().db(dbName).collection('todos').updateOne({ _id: id }, { $set: updateObject });
  res.send(await getTodos());
};

const deleteTodo = async (req, res) => {
  const id = new ObjectID(req.params.id);
  await getDB().db(dbName).collection('todos').deleteOne({ _id: id });
  res.send(await getTodos());
};

export {
  getTodo,
  addTodo,
  modifyTodo,
  deleteTodo,
};