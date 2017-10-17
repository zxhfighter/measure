'use strict';

const path = require('path');
const tsconfigPath = path.join(__dirname, 'tools/gulp/tsconfig.json');

require('ts-node').register({
    project: tsconfigPath
});

require('./tools/gulp/gulpfile');
