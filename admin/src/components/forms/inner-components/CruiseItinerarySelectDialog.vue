<template>
  <v-dialog v-model="dialog" persistent max-width="450px">
    <template v-slot:activator="{ on }">
      <v-btn
      small
      color="primary"
      v-on="on"
      title="Choose from already saved itineraries"
      >
        Add itinerary
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
              v-model="itineraryId"
              @change="onItinerarySelect"
              :loading="$apollo.queries.itineraries.loading"
              label="Itineraries"
              />
            </v-col>

            <v-col v-if="error" cols="12" sm="12" class="text-center">
              <v-alert type="error">
                {{ error }}
              </v-alert>
            </v-col>

            <v-col cols="12" sm="12" class="text-center">
              <v-progress-circular
              v-show="loading"
              :indeterminate="true"
              :value="20">
            </v-progress-circular>
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
import SearchItineraries from '@common/graphql/itinerary/SearchItineraries.gql'
import Itinerary from '@common/graphql/itinerary/Itinerary.gql'
import { deleteObjFields } from '@common/utils'

export default {
  props: {
    itinerary: {
      type: Object
    },
  },

  model: {
    prop: 'itinerary',
    event: 'change'
  },

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
      itineraryId: null,
      loading: false,
      error: null,
      itineraries: [],
    }
  },

  methods: {
    async onItinerarySelect (val) {
      if(!val) return
      this.loading = true
      try{
        let {data: {itinerary}} = await this.$apollo.query({
          query: Itinerary,
          variables: {id: val}
        })

        if(!itinerary){
          throw new Error("No itinerary found")
        }
        this.$emit('change', this.cleanCruiseItinerary(itinerary))
        this.closeDialog()
      }catch (error) {
        this.error = error.message
      }finally{
        this.loading = false
      }

    },

    closeDialog () {
      this.dialog = false
      this.error = null
      this.itineraryId = null
    },

    cleanCruiseItinerary (itinerary) {
      let copy = deleteObjFields(itinerary, ['__typename'])
      copy = deleteObjFields(copy, ['id', 'createdAt', 'updatedAt'])
      return copy
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
