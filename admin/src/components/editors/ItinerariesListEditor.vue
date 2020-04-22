<template>
  <div>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :hide-default-footer="areLessThan20"
      :search="search"
    >
    <template v-slot:header>
      <ListEditorHeader
      @add-new-item="onAddNewItem"
      v-model="search"
      btnTitle="Add New Itinerary"
      >
      </ListEditorHeader>
    </template>
    <template v-slot:default="props">
      <v-row>
        <v-col
         v-for="item in props.items"
         :key="item.id"
         cols="12"
         sm="6"
         md="4"
         lg="3"
         >
           <v-card>
            <v-card-title
             @click="editItinerary(item.id)"
             class="subheading font-weight-bold"
             >
             {{ item.name }}
           </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
  </div>
</template>

<script>
import SearchItineraries from '@/graphql/itinerary/SearchItineraries.gql'
import ListEditorHeader from '@/components/shared/ListEditorHeader'

export default {
  name: 'ItinerariesListEditor',

  components: {
    ListEditorHeader,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: {

  },

  model: {

  },

  props: {

  },

  data () {
    return {
      items: [],
      itemsPerPage: 20,
      search: null,
    }
  },

  apollo: {
    items: {
      query: SearchItineraries,
      fetchPolicy: 'network-only',
      update (data) {
        console.log('data %o', data)
        return data.searchItineraries
      },
      error (error) {
        console.log('error %o', error)
      }
    }
  },

  computed: {
    areLessThan20 () {
      return this.items.length < 20
    },
  },

  methods: {
    onAddNewItem () {
      console.log('add new')
      this.$router.push({name: 'itinerary-edit'})
    },

    editItinerary (id) {
      this.$router.push({name: 'itinerary-edit', params: {id: id}})
    },
  },


}
</script>
