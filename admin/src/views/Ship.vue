<template>
    <ShipEditor
    :id="id"
    v-on="onEditorEvents"
    />
</template>

<script>
import ShipEditor from '@/components/editors/ShipEditor'

export default {
  components: {
    ShipEditor,
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
      console.log('new-item')
      this.$router.push({ path: '/ship-edit' })
    },

    onItemCreated (item) {
      this.$router.push({ path:`ship-edit/${item.id}` })
    },

    onItemDeleted () {
      this.$router.push({ path: '/ships' })
    },

    onCancel () {
      this.$router.push({ path: '/ships' })
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
