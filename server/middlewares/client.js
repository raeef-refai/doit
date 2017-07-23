'use strict';

const path = require('path');

module.exports = () => {
  return (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  };
};
