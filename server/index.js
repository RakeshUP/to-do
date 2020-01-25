import express from 'express';
import { MongoClient } from 'mongodb';
import router from './router';
import { setDB } from './dbutil';

const app = express();
const port = 5000;

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
app.use('/todo', router);

const startServer = db => {
  return new Promise((resolve) => app.listen(port, () => resolve(db)));
};

const connectDB = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true }, (error, db) => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });
};

const exportDB = db => setDB(db);

console.log('Starting server');

connectDB()
  .then(startServer)
  .then(exportDB)
  .then(() => console.log('Server started'))
  .catch(console.log);
