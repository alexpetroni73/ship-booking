const imagekit = require('./../image-kit')

function wireRoutes (app) {
  app.get(process.env.SERVER_AUTH_PATH_IMGKIT, function(req, res){
    const auth = imagekit.getAuthenticationParameters()
    console.log('auth %o', auth)
    res.send(auth)
  })

  return app
}

module.exports = {
  wireRoutes,
}
