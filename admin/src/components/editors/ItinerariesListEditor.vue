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
             class="subheading font-weight-bold link"
             >
             {{ item.name }}
           </v-card-title>

           <v-card-text class="text-center">
             <cld-image
             v-if="item.image"
             :publicId="item.image" secure="true" width="100%">
               <cld-transformation :width="imgWidth" :crop="crop" />
             </cld-image>
           </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:no-data>
      <NoData
      title="No itineraries yet."
      />
    </template>
  </v-data-iterator>
  </div>
</template>

<script>
import SearchItineraries from '@common/graphql/itinerary/SearchItineraries.gql'
import ListEditorHeader from '@common/components/ListEditorHeader'
import NoData from '@common/components/NoData'

export default {
  name: 'ItinerariesListEditor',

  components: {
    ListEditorHeader,
    NoData,
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
    imgWidth: {
      type: Number,
      default: 400,
    },

    crop: {
      type: String,
      default: 'scale'
    },
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
      return this.items && this.items.length < 20
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
