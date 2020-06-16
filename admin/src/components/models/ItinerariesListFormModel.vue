<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedItineraries from '@common/graphql/itinerary/PaginatedItineraries.gql'
import DeleteItinerary from '@common/graphql/itinerary/DeleteItinerary.gql'
import DeleteItineraries from '@common/graphql/itinerary/DeleteItineraries.gql'

export default {
  extends: BasePagListFormModel,

  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      console.log('%o', queryVars)
      try{
        let { data:{paginatedItineraries} } = await this.$apollo.query({
          query: PaginatedItineraries,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedItineraries.items,
          total: paginatedItineraries.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteItinerary,
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
          mutation: DeleteItineraries,
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
