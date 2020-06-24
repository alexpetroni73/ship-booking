<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedSearchCruises from '@common/graphql/search/PaginatedSearchCruises.gql'
export default {
  extends: BasePagListFormModel,

  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      console.log('queryVars %o', queryVars)
      try{
        let { data:{paginatedSearchCruises } } = await this.$apollo.query({
          query: PaginatedSearchCruises,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedSearchCruises.items,
          total: paginatedSearchCruises.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
</script>
