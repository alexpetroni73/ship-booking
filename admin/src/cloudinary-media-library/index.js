const mediaLibraryAdmin = window.cloudinary.createMediaLibrary({
 cloud_name: 'shipbooking',
 api_key: '499564865319961',
 username: 'alexpetroni73@gmail.com',
}, {
   insertHandler: function (data) {
     data.assets.forEach(asset => {
       console.log("Inserted asset:", JSON.stringify(asset, null, 2))
     })
     }
  })

const mediaSelect = comp => window.cloudinary.createMediaLibrary({
 cloud_name: 'shipbooking',
 api_key: '499564865319961',
 username: 'alexpetroni73@gmail.com',
}, {
   insertHandler: function (data) {
     // data.assets.forEach(asset => { console.log("Inserted asset:",
     // JSON.stringify(asset, null, 2)) })
      comp.$emit('insert-media', data.assets)
     }
  })

export {
  mediaLibraryAdmin,
  mediaSelect,
}
