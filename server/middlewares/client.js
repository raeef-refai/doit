'use strict';

const path = require('path');

module.exports = () => {
  return (req, res, next) => {
    console.log('got here');
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  };
};
