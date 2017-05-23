'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = function(defaults) {
  const app = new GlimmerApp(defaults, {
    fingerprint: {
      enabled: false
    },
    rollup: {
      useStrict: false,
      plugins: [
        resolve({ jsnext: true, main: true, module: true, browser: true }),
        commonjs({
          namedExports: {
            'node_modules/date-fns/index.js': ['distanceInWordsToNow']
          }
        })
      ]
    }
  });

  return app.toTree();
};
