<template>
  <base-material-card class="px-5 py-3">
    <template v-slot:heading>
  <FormTopBar
    v-if="!cruiseEmbeded"
    addNewTitle="Add New Itinerary"
    v-bind="modelState"
    v-on="formEvents"
    :name="item.name"
  />
      </template>
      <div>
    <v-card-text>
      <ItineraryFormBase
      :item="editedItem"
      :cruiseEmbeded="cruiseEmbeded"
      />
   </v-card-text>

    <FormSubmitButtons
    v-if="!cruiseEmbeded"
    :disabled="submitDisabled"
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    />
  </div>
  </base-material-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
// import MediaSelect from '@common/components/MediaSelect'
// import StopoversEditor from '@/components/editors/StopoversEditor'
import ItineraryFormBase from '@/components/forms/inner-components/ItineraryFormBase'

export default {
  mixins: [ FormItemMixin ],

  props: {
    cruiseEmbeded: {
      type: Boolean,
      default: false,
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
