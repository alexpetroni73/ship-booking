<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedShips from '@common/graphql/ship/PaginatedShips.gql'
import DeleteShip from '@common/graphql/ship/DeleteShip.gql'
import DeleteShips from '@common/graphql/ship/DeleteShips.gql'

export default {
  extends: BasePagListFormModel,
  
  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      try{
        let { data:{paginatedShips} } = await this.$apollo.query({
          query: PaginatedShips,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedShips.items,
          total: paginatedShips.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteShip,
          variables: { id }
        })
        return id
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItems (idArr) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteShips,
          variables: { idArr }
        })
        return idArr
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
</script>
