<script>
import BaseItemFormModel from '@/components/models/BaseItemFormModel'
import ShipQuery from '@/graphql/ship/Ship.gql'
import CreateShip from '@/graphql/ship/CreateShip.gql'
import UpdateShip from '@/graphql/ship/UpdateShip.gql'
import DeleteShip from '@/graphql/ship/DeleteShip.gql'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        excerpt: '',
        description: '',
        image: '',
        gallery: [],
        shipFeatures: [],
        shipFeaturesText: '',
        foodAndDrinksFeatures: [],
        foodAndDrinksFeaturesText: '',
        divingFeatures: [],
        divingFeaturesText: '',
        gearRental: '',
        gearRentalText: '',
        shipLayout: '',
        shipLayoutText: '',
        shipSpecifications: {
          length: null,
          beam: null,
          topSpeed: null,
          cruisingSpeed: null,
          engines: '',
          maxGuests: null,
          bathrooms: null,
          tenders: '',
          waterCapacity: null,
          fuelCapacity: null,
          freshwaterMaker: false
        },
        shipSpecificationsText: '',
        navSafteyFeatures: [],
        navSafteyFeaturesText: '',
        cabins: [],
        cabinsText: '',
      }
    },

    async createItem (item) {
      // console.log('createItem key %o, item %o', key, item)
      let { data: { createShip: ship } } = await this.$apollo.mutate({
        mutation: CreateShip,
        variables: {input: item},
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },

    async loadItem (key) {
      // console.log('loadItem key %o', key)
      let { data: { ship: ship } } = await this.$apollo.query({
        query: ShipQuery,
        variables: key,
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },

    async updateItem (item, key) {
      // console.log('updateItem key %o, item %o', key, item)
      let { data: { updateShip: ship } } = await this.$apollo.mutate({
        mutation: UpdateShip,
        variables: {input:item, ... key},
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },

    async deleteItem (key) {
      // console.log('updateItem key %o', key)
      let { data: { deleteShip: ship } } = await this.$apollo.mutate({
        mutation: DeleteShip,
        variables: key,
      })
      // console.log('%o', result.data.ship)
      // console.log('ship %o', ship)
      return ship
    },

  },
}
</script>
