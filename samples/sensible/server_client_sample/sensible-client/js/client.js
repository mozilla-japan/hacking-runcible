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

'use strict';

var Client = (function() {

  var URI_SCHEME = 'http://';

  function init() {
  }

  function request(param, callback) {
    if (param.request == 'get') {
      switch (param.type) {
        case 'all':
          getAllProperties(param, callback);
          break;
        case 'individual':
          getProperty(param, callback);
          break;
        default:
          break;
      }
    } else if (param.request == 'set') {
      setProperty(param, callback);
    }
  }

  function getBaseUrl() {
    return URI_SCHEME + Settings.getValue('ipAddress') + ':' + Settings.getValue('port');
  }

  function getAllProperties(param, callback) {
    var url = getBaseUrl() + '/properties/get';
    httpRequest(url, 'json', function onComplete(status, response) {
      if (callback) {
        callback(status, response);
      }
    });
  }

  function getProperty(param, callback) {
    var url = getBaseUrl() + '/properties/get?name=' + param.name;
    httpRequest(url, 'json', function onComplete(status, response) {
      if (callback) {
        callback(status, response);
      }
    });
  }

  function setProperty(param, callback) {
    var url = getBaseUrl() + '/properties/set?' + param.name + '=' + param.value;
    httpRequest(url, 'json', function onComplete(status, response) {
      if (callback) {
        callback(status, response);
      }
    });
  }

  function httpRequest(url, responseType, callback) {

    var xhr = new XMLHttpRequest({ mozSystem: true });
    xhr.open('GET', url, true);

    xhr.ontimeout = function() {
      if (callback) {
        callback(xhr.status, 'timeout');
      }
    };

    xhr.onerror = function() {
      if (callback) {
        callback(xhr.status, 'error');
      }
    };

    xhr.onload = function(evt){
      if (xhr.readyState === 4) {
        if (callback) {
          callback(xhr.status, xhr.response);
        }
      }
    };

    xhr.timeout = 10 * 1000;
    xhr.send(null);
  }

  return {
    init: init,
    request: request
  };

}());

