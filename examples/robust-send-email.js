/**
 * @module myModule
 * @summary: Demonstrates how to send an email using a preconfigured notification type at
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-07-13.
 * @license Apache-2.0
 */

"use strict";

var config = require('./config');

var notification = require('../index')({
  credentials: { key: config.apiKey, secret: config.apiSecret }
});

notification.send('Welcome-Message', {
  locals: {
    app: 'My Awesome App'
  },
  recipients: [{
    email: config.emailReceiver,
    name: {
      first: 'Pappa',
      last: 'Pizza'
    }  //  **NOTE**: The name property is available to the email template.
  }]
});
