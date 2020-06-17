<template>
  <v-card v-if="ship" flat color="transparent" class="pa-0">
    <v-container>
      <v-row dense>
        <v-col md="4"><v-img :src="imgUrl(ship.image, [{ar:4-3},{w:360}])" class="imgKit mr-2" /></v-col>
        <v-col md="8">

          <v-row dense>
            <v-col md="8"><router-link :to="cruisePath" class="display-2 ship-name"> {{ ship.name }} </router-link></v-col> <v-col sm="4" class="text-right start-price-txt display-1">start from $<span class="start-price  display-2">{{ startFrom }}</span>/day</v-col>
            <v-col sm="8">
              <div style="display: inline-block;"><v-rating dense :value="ratingOfFive" half-increments color="warning" ></v-rating></div><span class="rating-value"> {{ rating.toFixed(1) }}</span><span class="rating-text"></span> <br />
              <div class="ship-features">some ship features</div>
            </v-col>
            <v-col sm="4" class="text-right"><v-btn primary color="accent" @click="onSelect">Select</v-btn></v-col>
            <v-col sm="12">{{ ship.excerpt }}</v-col>
          </v-row>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>


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
    ship: {
      type: Object,
    },

    destination: {
      type: String,
      default: 'all'
    },

    departure: {
      type: String,
    },
  },

  data () {
    return {

    }
  },

  computed: {
    cruisePath () {
      let path =  `/cruise/${this.ship.slug}/${this.destination}`
      if(this.departure) {
        path +=`/${this.departure}`
      }
      return path
    },

    startFrom () {
      return '455'
    },

    rating () {
      return 7 + 3 * Math.random()
    },

    ratingOfFive () {
      return this.rating / 2
    },
  },

  watch: {

  },

  methods: {
    onSelect () {
      //this.$emit('selected', this.ship.slug)
      this.$router.push({path: this.cruisePath })
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ship-name {
  text-decoration: none;
}

.start-price-txt {

}
.start-price {
font-weight: 700;
}

.rating-value {
  font-weight: 700;
}
</style>
