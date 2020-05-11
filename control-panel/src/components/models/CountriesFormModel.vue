<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import PublishedCountries from '@common/graphql/country/PublishedCountries.gql'
import UpdateCountry from '@common/graphql/country/UpdateCountry.gql'
import DeleteCountry from '@common/graphql/country/DeleteCountry.gql'
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
      let { data: { publishedCountries } } = await this.$apollo.query({
        query: PublishedCountries,
      })
      return publishedCountries ? publishedCountries : this.getDefaultItem()
    },

    async updateItem (item) {
      const input = deleteObjField(item, '__typename')
      const variables = {slug: this.id, input}
      let { data: { updateCountry } } = await this.$apollo.mutate({
        mutation: UpdateCountry,
        variables,
      })
      return updateCountry
    },

    async deleteItem (key) {
      let { data: { deleteCountry } } = await this.$apollo.mutate({
        mutation: DeleteCountry,
        variables: key,
      })
      return deleteCountry
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
