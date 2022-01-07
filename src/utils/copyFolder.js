/**
 * Copyright (c) 2021-present, ChatCord, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @imports
 */
const fs = require("fs");
const https = require("https");
const path = require("path");
const replaceStream = require("./streamReplace");

function copyFolder(dir, dest, appName) {
      var config;
      https.get(dir + "xeon-cli.config.json", async res => {
            res.setEncoding('utf8');
            res.on('data', chunk => {
                  config = JSON.parse(chunk);
                  config.files.forEach((item) => {
                        writeFile(dir, dest, item, appName);
                  });
            });
      });
};
function writeFile(dir, dest, item, appName) {
      fs.access(path.join(dest, item[0]).replace(item[0].split("/")[item[0].split("/").length - 1], ""), fs.constants.R_OK, err => {
            if (!err) {
                  let file = fs.createWriteStream(path.join(dest, item[0]));
                  https.get(dir + item[0], async res2 => {
                        if (item[1] === "string") {
                              res2.pipe(replaceStream(/{%name%}/g, appName)).pipe(file);
                        } else {
                              res2.pipe(file);
                        }
                        file.on('finish', function () {
                              file.close();
                        });
                  })
            } else {
                  fs.mkdirSync(path.join(dest, item[0]).replace(item[0].split("/")[item[0].split("/").length - 1], ""), { recursive: true });
                  writeFile(dir, dest, item, appName);
            }
      });
};
module.exports = copyFolder;
