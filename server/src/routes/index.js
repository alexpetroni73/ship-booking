// var multipart = require('connect-multiparty')
//
// var multipartMiddleware = multipart()
//
// const {
//   uploadFilesToCloudinary,
// } = require('./../cloudinary')
//
// const {
//   Attachment,
// } = require('./../mongo/models')
//
//
// async function registerAttachmetsToDB (req, res, next) {
//   if(!req.cloudinaryUploads) next()
//   return await Promise.all(req.cloudinaryUploads.map(e => Attachment.create( e )))
//   .then((result) => {
//     res.uploadedFiles = result
//     next()
//   })
//   .catch(next)
// }
//
// function uploadResponse (req, res, next) {
//   res.send(res.uploadedFiles)
// }

function wireRoutes (app) {
  // app.post('/upload',
  //   // upload.array('attachments'),
  //   multipartMiddleware,
  //   uploadFilesToCloudinary,
  //   registerAttachmetsToDB,
  //   uploadResponse
  // )
  //
  // app.get('/test', function(req, res){
  //   res.send("Hello test")
  // })

  return app
}

module.exports = {
  wireRoutes,
}
