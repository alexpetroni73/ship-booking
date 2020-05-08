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

  data () {
    return {
      cabinFeatures: [
        { name: 'a', slug: 'a' },
        { name: 'b', slug: 'b' },
        { name: 'c', slug: 'c' },
        { name: 'd', slug: 'd' },
      ],
    }
  },

  // apollo: {
  //   cabinFeatures: {
  //     query: FeatureSetFeatures,
  //     update: (data) => data.cabinFeatures,
  //   }
  // },

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
      let res = featureSetBy ? featureSetBy : this.getDefaultItem()
      console.log('loadItem  %o', res)
      return featureSetBy ? featureSetBy : this.getDefaultItem()
    },

    async updateItem (item, key) {
      console.log('updateItem item %o', item)
      console.log('updateItem key %o', key)
      const input = deleteObjField(item, '__typename')
      const variables = {slug: this.id, input}
      console.log('variables  %o', variables)
      let { data: { updateFeatureSet } } = await this.$apollo.mutate({
        mutation: UpdateFeatureSet,
        variables,
      })
      console.log('updateFeatureSet  %o', updateFeatureSet)
      return updateFeatureSet
    },

    async deleteItem (key) {
      let { data: { deleteFeatureSet } } = await this.$apollo.mutate({
        mutation: DeleteFeatureSet,
        variables: key,
      })
      return deleteFeatureSet
    },

    extraSlotParams () {
      return {cabinFeatures: this.cabinFeatures}
    }

  },
}
</script>
