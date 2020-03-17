<template>
  <div id="cld-media-library"></div>
</template>

<script>
// import { mediaLibraryAdmin } from '@/cloudinary-media-library'

export default {
  name: '',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {

  },

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {

  },

  mounted () {
    const mediaLibraryAdmin = window.cloudinary.createMediaLibrary({
     cloud_name: 'shipbooking',
     api_key: '499564865319961',
     username: 'alexpetroni73@gmail.com',
     inline_container: '#cld-media-library',
     remove_header: true, 
    }, {
       insertHandler: function (data) {
         data.assets.forEach(asset => { console.log("Inserted asset:",
         JSON.stringify(asset, null, 2)) })
         }
      },
    )

    mediaLibraryAdmin.show()
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cld-media-library{
  height: 1000px;
}

.cld-main-bar {
  display: none;
}
</style>
