'use strict';

// define mongodb url.
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/doit';

module.exports = {
  MongoDB: {
    url: MONGODB_URI,
  },
};
