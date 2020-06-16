<template>
  <div class="map-container">
    <div id="selMap" >
    </div>
  </div>
</template>

<script>
import { createMap, createMarker } from '@common/components/map'

export default {
  props: {
    location: {
      type: Object,
      default: () => {
        return {
          lng: undefined,
          lat: undefined,
        }
      }
    }
  },

  model: {
    prop: 'location',
    event: 'input'
  },

  components: {

  },

  data () {
    return {
      map: null,
      marker: null,
    }
  },

  computed: {
    selectBtnText () {
      return this.multiple ? this.selectMultipleBtnText : this.selectSingleBtnText
    },
  },

  methods: {
    initializeMap () {
      let {lng, lat} = this.location
      this.map = createMap('selMap', lng, lat)
      this.map.on('click', this.onClick)
      this.addMarker()
    },

    addMarker () {
      if(!this.map) return
      let {lng, lat} = this.location
      if(lng != null && lat != null){
        if(this.marker) this.marker.remove()
        this.marker = createMarker(lng, lat).addTo(this.map)
      }
    },

    onClick (e) {
      this.$emit('input', e.lngLat)
    },
  },

  mounted () {
    this.map || this.initializeMap()
  },

  watch: {
    location () {
      this.addMarker()
    },
  }
}
</script>

<style>
.map-container {
  position: relative;
  display: block;
  width: 400px;
  height: 300px;
}

#selMap {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
