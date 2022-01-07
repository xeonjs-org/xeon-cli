/**
 * Copyright (c) 2021-present, ChatCord, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var Transform = require('stream').Transform;

function replaceStream(needle, replacer) {
  var ts = new Transform();
  var chunks = [], len = 0, pos = 0;

  ts._transform = function _transform(chunk, enc, cb) {

    chunks.push(chunk);
    len += chunk.length;

    if (pos === 1) {
      var data = Buffer.concat(chunks, len)
        .toString()
        .replace(needle, replacer);

      // TODO: examine and profile garbage
      chunks = [];
      len = 0;

      this.push(data);
    }

    pos = 1 ^ pos;
    cb(null);
  };

  ts._flush = function _flush(cb) {
    if (chunks.length) {
      this.push(Buffer.concat(chunks, len)
        .toString()
        .replace(needle, replacer))
    }

    cb(null);
  }

  return ts;
}

module.exports = replaceStream;