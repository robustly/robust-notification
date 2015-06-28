/**
 * @module myModule
 * @summary: This module's purpose is to:
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-06-26.
 * @license Apache-2.0
 */

"use strict";

var path = require('path');

require('dotenv').load();

var notification = require('../')({
  mediums: {
    email: {
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }
  },
  credentials: { key: 'xxx', secret: 'xxx' },
  templateDir: path.resolve(__dirname, '..', 'templates')
  // TODO:
  //defaultSender: [{name: 'noreply', email: 'xxx@noreply.com', sms: '5192222222'}],
  // TODO:
  //notificationTypes: [
  //  { type: 'password-reset', defaultRecipients: [], defaultSender: [], defaultMediums: ['email'] }
  //]
});

notification.send('test-welcome', {
  locals: {},
  recipients: [{
    email: 'justin@webinverters.com',
    name: {
      first: 'Pappa',
      last: 'Pizza'
    }
  },
  {
    email: 'mrjustinmooser@gmail.com',
    name: {
      first: 'Mister',
      last: 'Geppetto'
    }
  }],  // name is available in the locals for batch emails.
  subject: 'Hello!'
  //sender: [{name: 'John', email: 'xxx@x.com', sms: '5195445321'}],
  //body: 'body',
  //mediums: [ 'email', 'sms' ]  // the types of notifications to send
});