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

function $(id) {
  return document.getElementById(id);
}

function showResponse(msg, status) {
  if (status == 200) {
    window.alert(msg + '\n' + 'SUCCESS' + '\n' + 'status : ' + status);
  } else {
    window.alert(msg + '\n' + 'ERROR' + '\n' + 'status : ' + status);
  }
}

function setupAddress() {
  var ipAddress = $('ip_address').value;
  var port = $('port').value;
  Settings.setValue('ipAddress', ipAddress);
  Settings.setValue('port', port);
  window.alert('IP ADDRESS : ' + ipAddress + '\n' + 'PORT : ' + port);
}

function getAllProperties(callback) {
  SensibleService.getProperties({
      request: 'get',
      type: 'all'
    } , function onComplete(status, response) {
      $('all_properties').innerHTML = response;
      showResponse('Get All Properties', status);
    }
  );
}

function getProperty(callback) {

  var properlyName = {
    0: 'property-a',
    1: 'property-b'
  };

  var index = $('get_property_name').selectedIndex;

  SensibleService.getProperties({
      request: 'get',
      type: 'individual',
      name: properlyName[index]
    },
    function onComplete(status, response) {
      $('individual_properties').innerHTML = response;
      showResponse('Get Individual Properties', status);
    }
  );

}

function setProperty(callback) {

  var properlyName = {
    0: 'property-a',
    1: 'property-b'
  };

  var index = $('set_property_name').selectedIndex;
  var value = $('set_value').value;

  SensibleService.setProperty({
      request: 'set',
      name: properlyName[index],
      value: value
    },
    function onComplete(status, response) {
      $('individual_properties').innerHTML = response;
      showResponse('Get Individual Properties', status);
    }
  );

}

function discoveryService() {

  function addRow(item, value) {
    var tbl = $('tbl');
    var newRow = tbl.insertRow();
    for (var i = 0; i < tbl.rows[0].cells.length; i++) {
      var newCell = newRow.insertCell();
      var name = tbl.rows[0].cells[i].innerHTML;

      switch(name) {
        case 'name':
          newCell.innerHTML = item.name;
          break;
        case 'type':
          newCell.innerHTML = item.type;
          break;
        case 'host':
          newCell.innerHTML = item.host;
          break;
        case 'port':
          newCell.innerHTML = item.port;
          break;
        default:
          break;
      }
    }
  }

  SensibleService.discoveryService(
    function(inService) {
      addRow({
        name: inService.name,
        type: inService.type,
        host: inService.host,
        port: inService.port
      });
    },
    function(inService) {
    }
  );

  var msg = 'サービスの検索を開始しました。';
  window.alert(msg);
}

function init() {

  Client.init();
  Settings.init();
  SensibleService.init();

  $('btn_get_all_properties').addEventListener('click', function() {
    getAllProperties();
  });

  $('btn_get_individual_properties').addEventListener('click', function() {
    getProperty();
  });

  $('btn_set_individual_properties').addEventListener('click', function() {
    setProperty();
  });

  $('btn_discovery_service').addEventListener('click', function() {
    discoveryService();
  });

  $('btn_setup_ip_port').addEventListener('click', function() {
    setupAddress();
  });
}

window.onload = function() {
  init();
};

