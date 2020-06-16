<template>
  <ItinerariesListEditor
  v-on="onEditorEvents"
  />
</template>

<script>
import ItinerariesListEditor from '@/components/editors/ItinerariesListEditor'

export default {
  components: {
    ItinerariesListEditor,
  },

  computed: {
    onEditorEvents () {
      return {
        'new-item': this.onNewItem,
        'edit-item': this.onEditItem,
      }
    },
  },

  methods: {
    onNewItem () {
      this.$router.push({path: 'itinerary-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `itinerary-edit/${id}`})
    },
  },
}
</script>
