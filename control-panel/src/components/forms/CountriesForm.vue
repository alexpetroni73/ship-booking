<template>
  <v-card
  max-width="600px"
  class="mx-auto"
  >
  <v-card-title>
    Countries
  </v-card-title>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row
          justify="center"
          align="center"
          >
            <v-col>
              <RlAllCountries
              v-slot="{items}"
              >
              <v-autocomplete
                :items="items"
                item-text="name"
                item-value="code"
                label="Select"
                v-model="selectedToAdd"
                clearable
                return-object
                ></v-autocomplete>
              </RlAllCountries>
            </v-col>
            <v-col>
              <v-btn
                @click="addCountry"
                :disabled="disableAddBtn"
                color="primary"
               >
               Add
             </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      </v-container>
  </v-card-text>
  </v-card>

</template>

<script>
import RlAllCountries from '@/components/forms/inner-components/RlAllCountries'

export default {
  name: '',

  components: {
    RlAllCountries,
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

  },

  data () {
    return {
      selectedToAdd: null,
    }

  },

  computed: {
    disableAddBtn () {
      return !this.selectedToAdd
    }
  },

  watch: {

  },

  methods: {

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
