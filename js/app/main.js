require(["jquery", "underscore", "backbone", "app/app"], function($, _, Backbone, App) {
  var app = new App();
  app.render();
  $("body").append(app.el);
});