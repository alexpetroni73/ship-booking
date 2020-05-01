<template>
  <v-dialog v-model="dialog" persistent max-width="450px">
    <template v-slot:activator="{ on }">
      <v-btn
      small
      color="primary"
      v-on="on"
      title="Choose from already saved itineraries"
      >
        Select itinerary
      </v-btn>
    </template>

    <v-card>
      <!-- <v-card-title>
        <span class="headline">Itineraries</span>
      </v-card-title> -->
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
              :items="itineraries"
              item-text="name"
              item-value="id"
              v-model="itinerary"
              label="Itineraries"
              />
            </v-col>
            <v-col class="text-center">
              <transition name="fade">
                <v-progress-circular
                :indeterminate="true"
                v-show="$apollo.queries.itineraries.loading"
                :value="20"></v-progress-circular>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" :disabled="!itinerary" text @click="onItinerarySelect">Select</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import SearchItineraries from '@/graphql/itinerary/SearchItineraries.gql'

export default {
  apollo: {
    itineraries: {
      query: SearchItineraries,
      update (data) {
        return data.searchItineraries
      }
    },
  },

  data () {
    return {
      dialog: false,
      itinerary: null,
      itineraries: [],
    }
  },

  methods: {
    onItinerarySelect () {
      this.$emit('change', this.itinerary)
      this.closeDialog()
    },

    closeDialog () {
      this.dialog = false
      this.itinerary = null
    },

  },
}
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
