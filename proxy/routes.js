function setup(app, handlers) {
  app.get('/register', handlers.registry.register);
}

exports.setup = setup;