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
      }
    },
  },

  methods: {
    onAddNewItem () {
      this.$router.push({ name: 'itinerary-edit' })
    },

    onItemCreated (item) {
      this.$router.push({ name: 'itinerary-edit', params: {id: item.id} })
    },

    onItemDeleted () {
      this.$router.push({ name: 'itineraries' })
    },
  },

  watch: {
    '$route.params.id': {
      handler: function (val) {
        this.id = val
      },
      immediate: true
    },

    'id': function (val) {
      console.log('id changed in View %s', val)
    }
  },
}
</script>
