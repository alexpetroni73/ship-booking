<template>
  <div>
    <ListEditorHeader
    @add-new-item="onAddNewItem"
    >
    </ListEditorHeader>
    {{ items }}
  </div>
</template>

<script>
import SearchShips from '@/graphql/ship/SearchShips.gql'
import ListEditorHeader from '@/components/shared/ListEditorHeader'

export default {
  name: 'ShipsListEditor',

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
    }
  },

  apollo: {
    items: {
      query: SearchShips,
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

  },

  watch: {

  },

  methods: {
    onAddNewItem () {
      console.log('add new')
      this.$router.push({name: 'ship'})
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
