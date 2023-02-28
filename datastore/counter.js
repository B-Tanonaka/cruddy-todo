const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;
// var counterFile = fs.writeFile('./data/counter.txt');
// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData)=> {
    if (err) {
      callback(null, 0);
    } else {
      // console.log(fileData);
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // call readCounter with callback that returns second parameter of readFile
  // if (err) {
  //   console.log('error calback hell');
  // } else {
    readCounter((err, data) => {
      counter = data;
      console.log('readCounter data: ', data);
      callback(null, counter);
    console.log('error calback hell');
    });
    var result = writeCounter(counter + 1, (err, data) => {
      console.log('data: ', data);
      callback(null, data);
    });
  // return result;
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
  // }
};




// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
