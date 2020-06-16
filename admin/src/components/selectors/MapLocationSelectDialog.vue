<template>
  <v-dialog v-model="dialog"
  persistent
  max-width="400"
  transition="dialog-bottom-transition">
     <template v-slot:activator="{ on }">
       <v-btn color="primary" dark v-on="on">{{ selectBtnText }}</v-btn>
     </template>
     <v-card
     >
       <v-system-bar
       color="primary darken-2"
       dark
     >
       <v-spacer></v-spacer>

       <v-btn icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
     </v-system-bar>
     <MapLocationSelector
     v-model="location"
     />

     <v-container>
       <v-row>
         <v-col cols="12">
           <v-text-field label="Longitude" :value="location.lng"/>
         </v-col>
         <v-col cols="12">
           <v-text-field label="Latitude" :value="location.lat"/>
         </v-col>
       </v-row>
    </v-container>
     <v-card-actions>
       <v-spacer />
       <v-btn outlined @click="onLocationSelect">Select</v-btn>
       <v-spacer />
       <v-btn outlined @click="closeDialog">Cancel</v-btn>
       <v-spacer />
     </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import { pipeUp, jsonCopy } from '@common/utils'
import MapLocationSelector from '@/components/selectors/MapLocationSelector'

export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },

    selectSingleBtnText: {
      type: String,
      default: "Choose Location"
    },

    selectMultipleBtnText: {
      type: String,
      default: "Choose Locations"
    },

    value: {
      type: Object,
      default: () => {
        return {
          lng: undefined,
          lat: undefined,
        }
      }
    },
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  components: {
    MapLocationSelector,
  },

  data () {
    return {
      dialog: false,
      location: {},
    }
  },

  computed: {
    selectBtnText () {
      return this.multiple ? this.selectMultipleBtnText : this.selectSingleBtnText
    }
  },

  methods: {
    pipeUp (...events) {
      return pipeUp(this, events)
    },

    closeDialog () {
      this.dialog = false
    },

    onLocationSelect () {
      this.$emit('change', this.location)
      this.closeDialog()
    },
  },

  watch: {
    value: {
      handler: function (val) {
        this.location = jsonCopy(val)
      },
      immediate: true,
    }
  },
}
</script>
