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
    const filePath = exports.dataDir + id + '.txt';
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
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  //Be carefull not to throw errors when you can gracefully handle i.e. console.log instead of throw. Per Mo - when you're not in controll of the err you don't want the err to stop the whole program
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
