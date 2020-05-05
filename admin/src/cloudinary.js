import Vue from 'vue';
import Cloudinary, { CldImage,CldTransformation,CldVideo,CldContext }  from 'cloudinary-vue';

Vue.use(Cloudinary, {
    configuration: {
      cloudName: 'shipbooking',
      "api_key": "499564865319961"
    },
    components: [ CldImage,CldTransformation,CldVideo,CldContext ]
})
