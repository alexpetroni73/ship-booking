<template>
  <v-card
  flat
  >
  <FormTopBar
    v-if="!cruiseEmbeded"
    addNewTitle="Add New Itinerary"
    v-bind="modelState"
    v-on="formEvents"
    :name="item.name"
  />

    <v-card-text>
      <ItineraryFormBase
      :item="editedItem"
      :cruiseEmbeded="cruiseEmbeded"
      :locations="locations"
      />
   </v-card-text>

    <FormSubmitButtons
    v-if="!cruiseEmbeded"
    :disabled="submitDisabled"
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    />
  </v-card>
</template>

<script>
import FormMixin from '@common/mixins/FormMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
// import MediaSelect from '@common/components/MediaSelect'
// import StopoversEditor from '@/components/editors/StopoversEditor'
import ItineraryFormBase from '@/components/forms/inner-components/ItineraryFormBase'

export default {
  mixins: [ FormMixin ],

  props: {
    cruiseEmbeded: {
      type: Boolean,
      default: false,
    },

    locations: {
      type: Array,
      default: () => [
        {text: "Indonesia", value: "Indonesia"},
        {text: "Maldives", value: "Maldives"},
        {text: "Philippines", value: "Philippines"},
        {text: "Thailand", value: "Thailand"},
      ]
    },


  },

  components: {
    FormTopBar,
    FormSubmitButtons,
    // MediaSelect,
    // StopoversEditor,
    ItineraryFormBase,
  },

  computed: {
    // mdCruiseEmbeded () {
    //   return this.cruiseEmbeded ? 6 : 4
    // },

    submitDisabled () {
      return !this.editedItem.name || !this.editedItem.location
    },
  },

  methods: {
    showList () {
      this.$emit('show-list')
    },
  }
}
</script>
