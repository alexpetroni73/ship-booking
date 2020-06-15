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
      btnTitle="Add New Cruise"
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
             >
             <div class="subheading font-weight-bold link">
             {{ cruiseName(item) }}
           </div>
             <div class="body-1 link">
               {{ cruiseInterval(item) }}
            </div>
           </v-card-title>

           <v-card-text class="text-center">

             <ImgKit
               v-if="item.itinerary.image"
               :path="item.itinerary.image"
               :transformation="[{w:imgWidth}, {c:'maintain_ratio'}]"
             />

           </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:no-data>
      <NoData
      title="No cruises yet."
      />
    </template>
  </v-data-iterator>
  </div>
</template>

<script>
import SearchCruises from '@common/graphql/cruise/SearchCruises.gql'
import ListEditorHeader from '@common/components/ListEditorHeader'
import NoData from '@common/components/NoData'
import ImgKit from '@common/components/img/ImgKit'

import { parseDate } from '@common/utils'

export default {
  name: 'CruisesListEditor',

  components: {
    ListEditorHeader,
    NoData,
    ImgKit,
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
      query: SearchCruises,
      fetchPolicy: 'network-only',
      update (data) {
        console.log('data %o', data)
        return data.searchCruises
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
      this.$router.push({name: 'cruise-edit'})
    },

    editItinerary (id) {
      this.$router.push({name: 'cruise-edit', params: {id: id}})
    },

    cruiseName (item) {
      return `${item.ship.name} ${item.itinerary.location}`
    },

    cruiseInterval (item) {
      return `from ${parseDate(item.startDate)} to ${parseDate(item.endDate)}`
    }
  },


}
</script>
