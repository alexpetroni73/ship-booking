<template>
  <div>
  <v-file-input
    v-model="files"
    color="primary"
    counter
    label="File input"
    :multiple="multiple"
    placeholder="Upload your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
    @change="uploadFiles"
    :loading = loading
    ref="fileInput"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="primary"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>

  <div v-if="errors.length" class="caption" color="error">
    <ul>
      <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
    </ul>
  </div>

  <div v-if="loading"> ...remaining {{ counter }}</div>
</div>
</template>

<script>
import imagekit from '@common/imagekit'

export default {
  props: {
    multiple: {
      type: Boolean,
    }
  },

  data () {
    return {
      files: [],
      errors: [],
      counter: 0,
      loading: false,
      uploadResults: [],
    }
  },

  methods: {
    async uploadFiles(files) {
      if(files && files.length){
        this.prepareFilesUpload(files.length)
        files.forEach(e => {
          imagekit.upload({
            file: e,
            fileName : e.name,
          },
          this.onFileUploadComplete // callback
        )
      })
      }
    },

    prepareFilesUpload (counter = 0) {
      this.errors = []
      this.counter = counter
      this.loading = true
      this.uploadResults = []
    },

    resetToInitialState () {
      this.files = []
      this.errors = []
      this.counter = 0
      this.loading = false
      this.uploadResults = []
    },

    onFileUploadComplete (error, result) {
      if(error){
        this.errors.push(error.message)
      } else {
        this.uploadResults.push(result)
      }
      this.decreaseCounter()
    },

    decreaseCounter () {
      this.counter -= 1
      if(this.counter <= 0 ){
        this.uploadCompleted()
      }
    },

    uploadCompleted () {
      this.$emit('files-uploaded', {files: this.uploadResults, errors: this.errors})
      this.resetToInitialState()
      this.$refs.fileInput.blur()
    },
  },
}
</script>
