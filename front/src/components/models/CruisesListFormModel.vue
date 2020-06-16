<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedShips from '@common/graphql/ship/PaginatedShips.gql'
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
  },
}
</script>
