// Generated by CoffeeScript 1.4.0
(function() {
  var Base, SIOServer, io,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = require('./Base').Base;

  io = require('socket.io');

  SIOServer = (function(_super) {

    __extends(SIOServer, _super);

    function SIOServer(options) {
      var _base, _ref;
      this.options = options != null ? options : {};
      this.onClientMessage = __bind(this.onClientMessage, this);

      this.onClientError = __bind(this.onClientError, this);

      this.onClientClose = __bind(this.onClientClose, this);

      this.onClientOpen = __bind(this.onClientOpen, this);

      this.onClientConnect = __bind(this.onClientConnect, this);

      this.onSIOServerError = __bind(this.onSIOServerError, this);

      this.onSIOServerConnection = __bind(this.onSIOServerConnection, this);

      this.onSIOServerListening = __bind(this.onSIOServerListening, this);

      this.end = __bind(this.end, this);

      this.send = __bind(this.send, this);

      this.start = __bind(this.start, this);

      if ((_ref = (_base = this.options).port) == null) {
        _base.port = this.options.localPort;
      }
      return this;
    }

    SIOServer.prototype.start = function() {
      this.io = io.listen(this.options.port);
      this.io.sockets.on('listening', this.onSIOServerListening);
      this.io.sockets.on('connection', this.onSIOServerConnection);
      return this.io.sockets.on('error', this.onSIOServerError);
    };

    SIOServer.prototype.send = function(d) {
      this.log('send', d);
      return this.ws.send(d);
    };

    SIOServer.prototype.end = function() {
      this.log('end');
      return this.ws.close();
    };

    SIOServer.prototype.onSIOServerListening = function() {
      this.log('onSIOServerListening');
      return this.emit('listening');
    };

    SIOServer.prototype.onSIOServerConnection = function(ws) {
      this.log('onSIOServerConnection');
      this.emit('connection');
      this.ws = ws;
      this.ws.on('open', this.onClientOpen);
      this.ws.on('close', this.onClientClose);
      this.ws.on('error', this.onClientError);
      this.ws.on('message', this.onClientMessage);
      return this.ws.on('connect', this.onClientConnect);
    };

    SIOServer.prototype.onSIOServerError = function(err) {
      this.log('onSIOServerError', err);
      return this.emit('error', err);
    };

    SIOServer.prototype.onClientConnect = function() {
      this.log('onClientConnect');
      return this.emit('connect');
    };

    SIOServer.prototype.onClientOpen = function() {
      this.log('onClientOpen');
      return this.emit('open');
    };

    SIOServer.prototype.onClientClose = function() {
      this.log('onClientClose');
      return this.emit('close');
    };

    SIOServer.prototype.onClientError = function(err) {
      this.log('onClientError', err);
      return this.emit('error', err);
    };

    SIOServer.prototype.onClientMessage = function(msg) {
      this.log('onClientMessage', msg);
      return this.emit('message', msg);
    };

    return SIOServer;

  })(Base);

  module.exports = {
    SIOServer: SIOServer
  };

}).call(this);