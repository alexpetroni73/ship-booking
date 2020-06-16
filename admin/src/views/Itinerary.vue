<template>
    <ItineraryEditor
    :id="id"
    v-on="onEditorEvents"
    />
</template>

<script>
import ItineraryEditor from '@/components/editors/ItineraryEditor'

export default {
  components: {
    ItineraryEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      return {
        'new-item': this.onAddNewItem,
        'item-created': this.onItemCreated,
        'item-deleted': this.onItemDeleted,
        'cancel': this.onCancel,
      }
    },
  },

  methods: {
    onAddNewItem () {
      this.$router.push({ path: `/itinerary-edit` })
    },

    onItemCreated (item) {
      this.$router.push({ path: `/itinerary-edit/${item.id}` })
    },

    onItemDeleted () {
      this.$router.push({ path: 'itineraries' })
    },

    onCancel () {
      this.$router.push({ path: 'itineraries' })
    },
  },

  watch: {
    '$route.params.id': {
      handler: function (val) {
        this.id = val
      },
      immediate: true
    },
  },
}
</script>
