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
      btnTitle="Add New Ship"
      >
      </ListEditorHeader>
    </template>
    <template v-slot:default="props">
      <v-row
        v-if="hasItems"
      >
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

             @click="editShip(item.id)"
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
      title="No ships yet."
      />
    </template>

  </v-data-iterator>

  </div>
</template>

<script>
import SearchShips from '@common/graphql/ship/SearchShips.gql'
import ListEditorHeader from '@common/components/ListEditorHeader'
import NoData from '@common/components/NoData'

export default {
  name: 'ShipsListEditor',

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
      query: SearchShips,
      fetchPolicy: 'network-only',
      update (data) {
        console.log('data %o', data)
        return data.searchShips
      },
      error (error) {
        console.log('error %o', error)
      }
    }
  },

  computed: {
    hasItems () {
      return this.items && this.items.length
    },

    areLessThan20 () {
      return this.items.length < 20
    }
  },

  watch: {

  },

  methods: {
    onAddNewItem () {
      console.log('add new')
      this.$router.push({name: 'ship-edit'})
    },

    editShip (id) {
      this.$router.push({name: 'ship-edit', params: {id: id}})
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
