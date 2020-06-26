<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import ShipQuery from '@common/graphql/ship/Ship.gql'
import CreateShip from '@common/graphql/ship/CreateShip.gql'
import UpdateShip from '@common/graphql/ship/UpdateShip.gql'
import DeleteShip from '@common/graphql/ship/DeleteShip.gql'

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
          yard: '',
          country: '',
          built: '',
          refit: '',
          flag: '',
          classed: '',
          length: '',
          breadth: '',
          maxDraft: '',
          height: '',
          grt: '',
          shipType: '',
          hullMaterial: '',
          bodyStructure: '', 
          superstructure: '',
          noOfDecks: null,
          noOfMasts: null,
          crewNo: null,
          noOfEngines: null,
          engine: '',
          power: '',
          cruisingSpeed: '',
          maximumSpeed: '',
          fuelCapacity: null,
          autonomy: null,
          hotWater: false,
          hotWaterType: '',
          airConditioning: false,
          airConditioningType: '',
          waterMaker: false,
          waterMakerCapacity: null,
          bowThruster: false,
          sternThruster: false,
          maxCapacity: null,
          maxCapacityCabins: null,
          dayTrips: null,
          atBerth: null,
          noOfCabins: null,
          operatingLicense: '',
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
