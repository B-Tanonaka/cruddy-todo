const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};
// var fileNames = 00006;
// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // console.log('counter.getNextUniqueId(): ', counter.getNextUniqueId);
  var generateId = (err, id) => {
    const filePath = path.join(exports.dataDir, id + '.txt');
    fs.writeFile(filePath, text, (err, success) => {
      if (err) {
        console.log('uh oh!');
      } else {
        callback(null, { id, text });
      }
    });
  };
  counter.getNextUniqueId(generateId);
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var item = id;
  const filePath = path.join(exports.dataDir, id + '.txt');
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      callback();
    } else {
      // callback(null, id);
      callback(null, { id, text: fileData });
    }
  });
};

exports.update = (id, text, callback) => {
  var item = id;
  // console.log('id at item assign: ', id);
  const filePath = path.join(exports.dataDir, id + '.txt');
  var write = (err, item) => {
    // console.log('item inside write: ', item);
    fs.writeFile(filePath, text, (err, item) => {
      if (err) {
        callback();
        // callback(null, Todo.);
      } else {
        callback(null, { item, text });
      }
    });
  };
  // console.log('id before exports.readOne: ', id);
  exports.readAll(write);
};


exports.delete = (id, callback) => {
  var item = id;
  const filePath = path.join(exports.dataDir, id + '.txt');
  fs.unlink(filePath, (err, id) => {
    if (err) {
      callback();
    } else {
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
