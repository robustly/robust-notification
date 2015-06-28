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

var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '..', 'templates')
  , emailTemplates = require('email-templates')
  , nodemailer     = require('nodemailer');

emailTemplates(templatesDir, function(err, template) {
  if (err) {
    console.log(err);
  } else {
    // ## Send a single email
    // Prepare nodemailer transport object
    var transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: '',
        pass: ''
      }
    });

    // ## Send a batch of emails and only load the template once

    // An example users object
    var users = [
      {
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
      }
    ];

    var Render = function(locals) {
      this.locals = locals;
      this.send = function(err, html, text) {
        if (err) {
          console.log(err);
        } else {
          transport.sendMail({
            from: 'Spicy Meatball <spicy.meatball@spaghetti.com>',
            to: locals.email,
            subject: 'Mangia gli spaghetti con polpette!',
            html: html,
            // generateTextFromHTML: true,
            text: text
          }, function(err, responseStatus) {
            if (err) {
              console.log(err);
            } else {
              console.log(responseStatus.message);
            }
          });
        }
      };
      this.batch = function(batch) {
        batch(this.locals, templatesDir, this.send);
      };
    };

    // Load the template and send the emails
    template('test-welcome', true, function(err, batch) {
      if (err) {
        console.error(err);
      }
      for(var user in users) {
        var render = new Render(users[user]);
        render.batch(batch);
      }
    });
  }
});