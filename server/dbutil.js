let mongodb;

const setDB = db => mongodb = db;

const getDB = () => mongodb;

export {
  setDB,
  getDB,
};