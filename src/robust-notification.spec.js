'use strict';

/* global describe, it, before, beforeEach, after, afterEach */

describe('robust-notification', function() {
  var Module = require('./robust-notification')
    ,config;

  beforeEach(function() {
    config = {
      mediums: {
        email: {
          service: 'Gmail',
          auth: {
            user: 'sher',
            pass: 'sherpass'
          }
        }
      },
      templateDir: path.resolve(__dirname, '..', 'templates')
    };
  });

  describe('configuration', function() {
    describe('config.mediums', function() {
      it('correctly passes the config to nodemailer.', function(){
        var nodemailerMock = {
          createTransport: sinon.stub().returns({sendMail: _.empty})
        };
        Module(config, {
          nodemailer: nodemailerMock
        });

        expect(nodemailerMock.createTransport).to.have.been.calledWith({
          service: 'Gmail',
          auth: {
            user: 'sher',
            pass: 'sherpass'
          }
        });
      });
    });
  });

  describe('notification.send(type, params)', function() {
    it('overrides default "from" parameter when specified in params', function() {
      var transportMock = {sendMailAsync: sinon.stub().resolves(true)};
      var nodemailerMock = {
        createTransport: sinon.stub().returns(transportMock)
      };
      var m = Module(config, {
        nodemailer: nodemailerMock
      });

      return m.send('test-welcome', {
        recipients: 'joe@google.com,josh@google.com,john@google.com',
        from: 'marie<marie@google.com>',
        locals: {name: {first: 'testfirst'}}
      }).then(function(result) {
        expect(transportMock.sendMailAsync).to.have.been.calledWith(sinon.match({
          from: 'marie<marie@google.com>'
        }));
      },function(err) {
        console.log('Failed: ', err);
      });
    });
  });
});