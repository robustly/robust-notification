## Synopsis

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)

## Code Example

var notificationConfig = {
   mediums: {
      email: {

      },
      sms: {  // not implemented

      }
   },
   useSQS: true, // probably scrapping this in favor of just passing in a queue implementation.
   awsCredentials: { key: 'xxx', secret: 'xxx' },
   templateDir: 'path/to/templates',
   defaultSender: [{name: 'noreply', email: 'xxx@noreply.com', sms: '5192222222'}],
   notificationTypes: [
      { type: 'password-reset', defaultRecipients: [], defaultSender: [], defaultTypes: ['email'] }
   ]
};

var notification = require('robust-notification')(notificationConfig);
notification.send('registration-message', {
    locals: details,
    recipients: [{name: 'John', email: 'xxx@x.com', sms: '5195445321'}, {}, ...],  // name is available in the locals for batch emails.
    sender: [{name: 'John', email: 'xxx@x.com', sms: '5195445321'}],
    subject: 'Hello!',
    body: 'body',
    mediums: [ 'email', 'sms' ]  // the types of notifications to send
  });

## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)