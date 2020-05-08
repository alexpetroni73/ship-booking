<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import FeatureSetBy from '@common/graphql/feature-set/FeatureSetBy.gql'
import UpdateFeatureSet from '@common/graphql/feature-set/UpdateFeatureSet.gql'
import DeleteFeatureSet from '@common/graphql/feature-set/DeleteFeatureSet.gql'
import { deleteObjField } from '@common/utils'

export default {
  extends: BaseItemFormModel,

  props: {
    name: {
      type: String,
    },
  },

  methods: {
    getDefaultItem () {
      return {
        name: this.name,
        slug: this.id,
        items: [],
      }
    },

    itemKey () {
      return { field: 'slug', value: this.id }
    },

    async loadItem (key) {
      let { data: { featureSetBy } } = await this.$apollo.query({
        query: FeatureSetBy,
        variables: key,
      })
      return featureSetBy ? featureSetBy : this.getDefaultItem()
    },

    async updateItem (item) {
      const input = deleteObjField(item, '__typename')
      const variables = {slug: this.id, input}
      let { data: { updateFeatureSet } } = await this.$apollo.mutate({
        mutation: UpdateFeatureSet,
        variables,
      })
      return updateFeatureSet
    },

    async deleteItem (key) {
      let { data: { deleteFeatureSet } } = await this.$apollo.mutate({
        mutation: DeleteFeatureSet,
        variables: key,
      })
      return deleteFeatureSet
    },
  },
}
</script>
