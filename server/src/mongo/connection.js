const mongoose = require('mongoose')
const mongodbUri = process.env.DB_URI

const connect = function () {
  mongoose.connect(mongodbUri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  })
  mongoose.set('useCreateIndex', true)
  const db = mongoose.connection
  db.on("error", console.error.bind(console, "mongoose connection error"))
  db.once("open", function(callback){
    console.log("DB Connection Succeeded")
  })
}

module.exports = {
  connect
}
