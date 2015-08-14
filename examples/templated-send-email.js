/**
 * @module templated-send-email
 * @summary: Demonstrates sending an email configured with a template.
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
  mediums: {
    email: {
      service: 'Gmail',
      auth: {
        user: config.emailAccount,
        pass: config.emailPass
      }
    }
  },
  templateDir: config.templateDir,
  notificationTypes: {
    "password-reset": {
      defaultRecipients: [{
        email: 'justin@webinverters.com',
        name: {
          first: 'Pappa',  /*  **NOTE**: The name property is available to the email template  */
          last: 'Pizza'
        }
      }],
      defaultSender: null,  // if not specified uses "defaultSender" if supported by your transport medium.
      defaultMediums: { 'email':{} },
      defaultTemplate: 'password-template'
    }
  }
});

notification.send('password-reset', {
  subject: 'Reset your password!'
  // **NOTE**: no need to specify body since the content of the email is specied in the template.
});