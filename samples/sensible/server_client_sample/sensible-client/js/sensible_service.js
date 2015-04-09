/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

/* Copyright (C) 2015 KDDI Technology, MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* global $, Client */

'use strict';

var SensibleService = (function() {

  function init() {
  }

  function getProperties(param, callback) {
    Client.request(param, function onComplete(status, response) {
      if (callback) {
        callback(status, response);
      }
    });
  }

  function setProperty(param, callback) {
    Client.request(param, function onComplete(status, response) {
      if (callback) {
        callback(status, response);
      }
    });
  }

  function discoveryService(callback) {

    var name = '_sensible._tcp.local';
    var mdns = new sensible.MDNS(new sensible.fxos.Strategy());

    mdns.start(function(inError) {
      mdns.resolveService(name,
        function(inService) {
          if (callback) {
            callback(inService);
          }
          // console.log('added ' + inService.name + '.' + inService.type + ' at ' +
          //   inService.host + ':' + inService.port + ' (' + inService.text + ')');
        },
        function(inService) {
          if (callback) {
            callback(inService);
          }
          console.log('removed ' + inService.name + '.' + inService.type + ' at ' +
              inService.host + ':' + inService.port + ' (' + inService.text + ')');
        });
    });
  }

  return {
    init: init,
    getProperties: getProperties,
    setProperty: setProperty,
    discoveryService: discoveryService
  };

}());

