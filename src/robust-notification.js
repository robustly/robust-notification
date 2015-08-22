/**
 * @module robust-notification
 * @summary: This is an implemenation of robust-notification.
 *
 * @description:
 *
 * Author: justin
 * Created On: 2015-06-21.
 * @license Apache-2.0
 */

'use strict';

var p = require('bluebird');
var _ = require('lodash');

module.exports = function construct(config, log, deps) {
  var m = {};
  config = config ? config : {};
  config = _.defaults(config, {});

  deps = deps || {}
  var emailTemplatesAsync = p.promisify(require('email-templates'));

  function sendTemplatedEmail(type, params) {
    var deferred = p.defer();
    emailTemplatesAsync(config.templateDir)
      .then(function(template) {
        var emailSendingActions = [],
          totalEmailsSendingCount = _.isArray(params.recipients) ? params.recipients.length : 1;
        var Render = function (locals) {
          if (params.locals) {
            this.locals = _.extend({}, params.locals, locals);
          } else {
            this.locals = locals;
          }

          this.send = function (err, html, text) {
            params.html = html;
            params.text = text;
            params.recipients = locals.email || locals.recipients;
            log.debug('Sending email', params.recipients);
            if (err) {
              log.error(err);
            } else {
              emailSendingActions.push(m.sendEmail(params)
                .catch(function (err) {
                  log.error(err);
                  // TODO: queue the email if the error was an intermittent issue.
                  throw err;
                }));
              if (totalEmailsSendingCount <= emailSendingActions.length) {
                return p.all(emailSendingActions).then(function (result) {
                  return deferred.resolve(result);
                }, function (err) {
                  return deferred.reject(err);
                });
              }
            }
          };
          this.batch = function (batch) {
            console.log('STUFF', this.locals, config.templateDir, this.send);
            batch(this.locals, config.templateDir, this.send);
          };
        };

        // Load the template and send the emails
        template(params.template || type, true, function (err, batch) {
          if (err) {
            console.log('Error Loading Template', err);
            return deferred.reject(err);
          }

          console.log('Template loaded', batch);

          if (_.isArray(params.recipients)) {
            for (var user in params.recipients) {
              var render = new Render(params.recipients[user]);
              render.batch(batch);
            }
          } else if (_.isString(params.recipients)) {
            var render = new Render(params);
            render.batch(batch);
          } else {
            throw 'Unknown recipients.';
          }
        });
      })
      .catch(function(err) {
        return deferred.reject(err);
      });

    return deferred.promise;
  }

  if (config.mediums.email) {
    var nodemailer = deps.nodemailer || require('nodemailer');
    var transport = nodemailer.createTransport(config.mediums.email);

    if (!deps.nodemailer) {
      transport = p.promisifyAll(transport);
    }

    /**
     * sendEmail
     *
     * @param params
     * @returns {*}
     */
    m.sendEmail = function(params) {
      log.debug('sendEmail(params)', params);
      return transport.sendMailAsync({
        from: params.from,
        to: formatRecipients(params.recipients),
        subject: params.subject,
        html: params.html || params.body,
        text: params.text
        //// generateTextFromHTML: true,
        //text: text
      });
    };
  }

  m.send = function(type, params) {
    params = reconcileConfigurationWithLocalParams(config, type, params);

    if (m.sendEmail) {
      params.recipients = formatRecipients(params.recipients);
      return sendTemplatedEmail(type, params);
    } else {
      throw 'sendEmail is not defined.';
    }

    // TODO: add robust fallbacks
    // TODO: add local-storage-fallbacks
  };

  function reconcileConfigurationWithLocalParams(config, type, params) {
    if (config.notificationTypes && config.notificationTypes[type]) {
      params.recipients = params.recipients || config.notificationTypes[type].defaultRecipients;
      params.template = params.template || config.notificationTypes[type].defaultTemplate;
    }
    return params;
  }

  function formatRecipients(recipients) {
    if (_.isArray(recipients)) {
      return _.map(recipients, function(recipient) {
        return recipient.email;
      }).join(',');
    } else if (_.isObject(recipients)){
      return recipients.email;
    }
    else return recipients;
  }

  return m;
};

