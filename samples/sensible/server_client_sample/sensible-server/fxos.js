// called just before sensible.Application.start()
sensible.fxos.Application.prototype.onBeforeStart = function(inCallback) {
  inCallback();
};

// called just after sensible.Application.start()
sensible.fxos.Application.prototype.onAfterStart = function(inCallback) {
  inCallback();
};

// NON-STANDARD REST HANDLERS

sensible.fxos.Application.prototype.sample_api1 = function(inRequest, inCallback) {
  var response = new Object();
  response.type = "json";
  response.object = { hoge: "hoge"};
  inCallback (response);
};

sensible.fxos.Application.prototype.sample_api2 = function(inRequest, inCallback) {
  var response = new Object();
  response.type = "json";
  response.object = {
    name: 'text',
    hoge: 'hoge'
  };
  inCallback (response);
};

