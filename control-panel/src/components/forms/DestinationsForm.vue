<template>
  <v-card
  max-width="600px"
  class="mx-auto"
  >
  <v-card-title>
    Destinations
  </v-card-title>
  <v-card-text>
    <v-card class="mx-auto" max-width="450" flat >
      <v-container>
      <v-row justify="center" no-gutters>
            <v-col md="9">
              <RlAllDestinations
              v-slot="{items}"
              >
              <v-autocomplete
                :items="items"
                item-text="name"
                item-value="code"
                label="Select"
                v-model="selectedToAdd"
                @keyup.enter="addDestination"
                clearable
                return-object
                ></v-autocomplete>
              </RlAllDestinations>
              </v-col>
              <v-col md="3">
              <v-btn
                @click="addDestination"
                :disabled="disableAddBtn"
                color="primary"
                class="ma-3"
               >
               Add
             </v-btn>
           </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
            <v-list>
              <v-list-item
               v-for="d in editedItem"
               :key="d.name"
               >
                  <v-list-item-content>
                    <v-list-item-title>{{d.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <FormSubmitButtons
            v-if="!hasItems"
            :formState="formState"
            @update-item="updateItem"
            @create-item="createItem"
            />
          </v-col>
          </v-row>
        </v-container>
        </v-card>
  </v-card-text>
  </v-card>

</template>

<script>
import RlAllDestinations from '@/components/forms/inner-components/RlAllDestinations'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  name: '',

  components: {
    RlAllDestinations,
    FormSubmitButtons,
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

    hasItems () {
      return this.editedItem && Array.isArray(this.editedItem) && this.editedItem.length
    }
  },

  watch: {

  },

  methods: {
    addDestination () {

    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
