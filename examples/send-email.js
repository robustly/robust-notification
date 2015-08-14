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

var config = require('./config');

//var notification = require('../index')({
//  mediums: {
//    email: {
//      service: 'Gmail',
//      auth: {
//        user: config.emailAccount,
//        pass: config.emailPass
//      }
//    }
//  },
//  templateDir: config.templateDir
//});
//
//notification.send('test-welcome', {
//  locals: {},
//  recipients: [{
//    email: 'justin@webinverters.com',
//    name: {
//      first: 'Pappa',
//      last: 'Pizza'
//    }
//  },
//  {
//    email: 'mrjustinmooser@gmail.com',
//    name: {
//      first: 'Mister',
//      last: 'Geppetto'
//    }
//  }],  // name is available in the locals for batch emails.
//  subject: 'Hello!'
//  //sender: [{name: 'John', email: 'xxx@x.com', sms: '5195445321'}],
//  //body: 'body',
//  //mediums: [ 'email', 'sms' ]  // the types of notifications to send
//});

var recipe ={
  content: 'hello',
  title: 'whatever',
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
    }],
  mediums: {
    email: {
      service: 'Gmail',
      auth: {
        user: config.emailAccount,
        pass: config.emailPass
      }
    }
  }
};
console.debug = console.log;
var Notification = require('../index');
var notification = Notification(recipe, console);
notification.sendEmail({
  text: recipe.content,
  subject: recipe.title,
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
    }],
  from: recipe.mediums.email.auth.user
})