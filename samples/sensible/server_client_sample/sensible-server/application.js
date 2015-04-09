window.onload = function init() {

  if (typeof sensible == "object") {
    sensible.ApplicationFactory.createApplication(function(inError) {
      if (inError) {
        console.error ("error during sensible application startup");
        console.error (inError);
      } else {
        console.log ("sensible application startup");
      }
    });
  }

}

