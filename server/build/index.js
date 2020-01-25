"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongodb = require("mongodb");

var _router = _interopRequireDefault(require("./router"));

var _dbutil = require("./dbutil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 5000;
app.use(_express.default.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
app.use('/todo', _router.default);

const startServer = db => {
  return new Promise(resolve => app.listen(port, () => resolve(db)));
};

const connectDB = () => {
  return new Promise((resolve, reject) => {
    _mongodb.MongoClient.connect('mongodb://localhost:27017/', {
      useUnifiedTopology: true
    }, (error, db) => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });
};

const exportDB = db => (0, _dbutil.setDB)(db);

console.log('Starting server');
connectDB().then(startServer).then(exportDB).then(() => console.log('Server started')).catch(console.log);