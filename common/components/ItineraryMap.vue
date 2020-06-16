<template>
  <div id="itineraryMap" >
  </div>
</template>

<script>
import { createMap, createMarker } from '@common/components/map'

export default {
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      map: null,
      markers: [],
    }
  },

  methods: {
    initializeMap () {
      let {lng, lat} = this.locations && this.locations[0] || {}
      this.map = createMap('itineraryMap', lng, lat)
      this.addMarkers()
    },

    addMarkers () {
      if(!this.map) return
      this.clearMarkers()
      this.locations.forEach(e => {
        let {lng, lat} = e
        if(lng != null && lat != null){
          this.markers.push(createMarker(lng, lat).addTo(this.map))
        }
      })
    },

    clearMarkers () {
      if(this.markers && this.markers.length) {
        this.markers.map(e => e.remove())
        this.markers = []
      }
    },
  },

  watch: {
    locations: function () {
      this.addMarkers()
    },
  },

  mounted () {
    this.map || this.initializeMap()
  },
}
</script>
