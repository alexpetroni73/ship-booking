<template>
  <v-card v-if="item" flat outlined class="pa-0 mt-0">
    <v-container>
      <v-row dense>
        <v-col md="4"><ImgTransf :path="item.ship.image" :transformation="[{ar:4-3},{w:360}]" class="mr-2" /></v-col>
        <v-col md="8">

          <v-row dense>
            <v-col md="8"><router-link :to="cruisePath" class="display-2 ship-name"> {{ item.ship.name }} </router-link></v-col> <v-col sm="4" class="text-right start-price-txt display-1">start from $<span class="start-price  display-2">{{ startFrom }}</span>/day</v-col>
            <v-col sm="8">
              <div style="display: inline-block;"><v-rating dense :value="ratingOfFive" half-increments color="warning" ></v-rating></div><span class="rating-value"> {{ rating.toFixed(1) }}</span><span class="rating-text"></span> <br />
              <div class="ship-features">some ship features</div>
            </v-col>
            <v-col sm="4" class="text-right"><v-btn primary color="accent" @click="onSelect">Select</v-btn></v-col>
            <v-col sm="12">{{ item.ship.excerpt }}</v-col>
          </v-row>

        </v-col>

        <v-col cols="12">
          <v-row v-for="(c, index) in item.cruises" class="cruise-list" :key="index">
            <v-col md="3" class="departure-date">{{departureDate(c.startDate)}}</v-col>
            <v-col md="3" class="location"> {{ c.location }} </v-col>
            <v-col md="3" class="availability"> available </v-col>
            <v-col md="3" class="duartion"> {{ c.length }} </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-container>
  </v-card>
</template>

<script>
import ImgTransf from '@common/components/img/ImgTransf'
import { parseDate } from '@common/utils'

export default {
  name: '',

  components: {
    ImgTransf,
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
    item: {
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
      let path =  `/cruise/${this.item.ship.slug}/${this.destination}`
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
      //this.$emit('selected', this.item.ship.slug)
      this.$router.push({path: this.cruisePath })
    },

    departureDate (date) {
      return parseDate(date, 'Do MMMM YYYY')
    },

    duration (cruise) {

      return cruise && cruise.length ? cruise.length : ''
    },
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

.cruise-list {
  background-color: #F8F9FA;
  border-top: 1px solid #d8d9dA;
}

.departure-date {
  font-weight: 700;
}

.availability {
  color:  #8DC63F;
}
</style>
