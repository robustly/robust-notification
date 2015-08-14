/**
 * @module myModule
 * @summary: This module's purpose is to:
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-07-13.
 * @license Apache-2.0
 */

"use strict";

// load environment variables from the local ".env" file.
require('dotenv').load();
var path = require('path');

module.exports = {
  emailAccount: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailReceiver: process.env.EMAIL_TO,
  emailReceiver2: process.env.EMAIL_TO2,

  templateDir: path.resolve(__dirname, 'templates')
};