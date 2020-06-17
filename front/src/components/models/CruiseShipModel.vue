<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import ShipBy from '@common/graphql/ship/ShipBy.gql'
export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return {}
    },

    async loadItem (key) {
      let { data: { shipBy } } = await this.$apollo.query({
        query: ShipBy,
        variables: {field: 'slug', value: key.id},
      })
      console.log('shipBy %o',shipBy )
      return shipBy
    },

    parseLoadResult (result) {
      return result
    }
  },
}
</script>
