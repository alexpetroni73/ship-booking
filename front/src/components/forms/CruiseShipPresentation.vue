<template>
  <v-card v-if="ship" flat color="transparent" class="pa-0">
    <v-container>

      <v-row dense>
        <v-col md="8"><router-link :to="cruisePath" class="display-2 ship-name"> {{ ship.name }} </router-link></v-col> <v-col sm="4" class="text-right start-price-txt display-1">start from $<span class="start-price  display-2">{{ startFrom }}</span>/day</v-col>
        <v-col sm="8">
          <div style="display: inline-block;"><v-rating dense :value="ratingOfFive" half-increments color="warning" ></v-rating></div><span class="rating-value"> {{ rating.toFixed(1) }}</span><span class="rating-text"></span> <br />
          <div class="ship-features">some ship features</div>
        </v-col>
        <v-col sm="4" class="text-right"><v-btn primary color="accent" @click="onSelect">Book now</v-btn></v-col>
      </v-row>

      <v-row>
        <v-col sm="12"><ImgTransf :path="ship.image" :transformations="[{ar:4-3},{w:800}]" class="imgKit mr-2" /></v-col>

        <v-col sm="12">
          {{ ship.description }}
        </v-col>

        <v-col sm="12" v-for="(f, index) in featuresSections" :key="index" >
          <div class="headline">{{ f.title }}</div>
          <v-row v-if="f.features">
            <v-col md="3" v-for="(e, index) in f.features" :key="index">
              <v-icon small color="success">mdi-check</v-icon> {{ e }}
            </v-col>
          </v-row>
          <div class="display-1">{{f.text}}</div>
          <v-divider class="mb-12 mt-4"/>
        </v-col>

        <v-col sm="12">
        </v-col>

        <v-col sm="12">
        </v-col>

      </v-row>


    </v-container>
  </v-card>
</template>

<script>
import ImgTransf from '@common/components/img/ImgTransf'

export default {
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

  components: {
    ImgTransf,
  },

  data () {
    return {
      sections: [
        {title: "Boat features", fArr: 'shipFeatures', fTxt: 'shipFeaturesText'},
        {title: "Food & Drinks", fArr: 'foodAndDrinksFeatures', fTxt: 'foodAndDrinksFeaturesText'},

        {title: "Diving", fArr: 'divingFeatures', fTxt: 'divingFeaturesText'},
        {title: "Gear Rental", fArr: 'gearRental', fTxt: 'gearRentalText'},

        {title: "Boat Navigation and Safety", fArr: 'navSafteyFeatures', fTxt: 'navSafteyFeaturesText'},
      ]
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

    featuresSections () {
      let sec = []
      this.sections.map(e => {
        if(this.ship[e.fTxt] || (this.ship[e.fArr] && this.ship[e.fArr].length)){
          sec.push({title: e.title, text: this.ship[e.fTxt], features: this.ship[e.fArr]})
        }
      })

      return sec
    }
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
