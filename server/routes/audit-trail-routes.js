module.exports = {
  // @todo change route to api and make sure protected from public
  type: 'admin', // other type available: content-api.
  routes: [
    {
      method: 'GET',
      path: '/flush',
      handler: 'logController.flush',
      config: {
        policies: [],
        auth: false,
      },
    },
  ]
};


