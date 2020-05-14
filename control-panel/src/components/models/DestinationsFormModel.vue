<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import PublishedDestinations from '@common/graphql/destination/PublishedDestinations.gql'
import UpdateDestination from '@common/graphql/destination/UpdateDestination.gql'
import DeleteDestination from '@common/graphql/destination/DeleteDestination.gql'
import { deleteObjField } from '@common/utils'

export default {
  extends: BaseItemFormModel,
  props: {

  },

  data () {
    return {

    }

  },

  computed: {

  },

  watch: {

  },

  methods: {
    getDefaultItem () {
      return []
    },

    async loadItem () {
      let { data: { publishedDestinations } } = await this.$apollo.query({
        query: PublishedDestinations,
      })
      return publishedDestinations ? publishedDestinations : this.getDefaultItem()
    },

    async updateItem (item) {
      const input = deleteObjField(item, '__typename')
      const variables = {slug: this.id, input}
      let { data: { updateDestination } } = await this.$apollo.mutate({
        mutation: UpdateDestination,
        variables,
      })
      return updateDestination
    },

    async deleteItem (key) {
      let { data: { deleteDestination } } = await this.$apollo.mutate({
        mutation: DeleteDestination,
        variables: key,
      })
      return deleteDestination
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
