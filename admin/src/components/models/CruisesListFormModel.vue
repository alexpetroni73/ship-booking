<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedCruises from '@common/graphql/cruise/PaginatedCruises.gql'
import DeleteCruise from '@common/graphql/cruise/DeleteCruise.gql'
import DeleteCruises from '@common/graphql/cruise/DeleteCruises.gql'

export default {
  extends: BasePagListFormModel,
  
  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      try{
        let { data:{paginatedCruises} } = await this.$apollo.query({
          query: PaginatedCruises,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedCruises.items,
          total: paginatedCruises.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteCruise,
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
          mutation: DeleteCruises,
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
