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
      }
    },
  },

  methods: {
    onAddNewItem () {
      console.log('ship onAddNewItem')
      this.$router.push({ name: 'ship' })
    },

    onItemCreated (id) {
      console.log('ship onItemCreated')
      this.$router.push({ name: 'ship', params: {id} })
    },

    onItemDeleted () {
      this.$router.push({ name: 'ships' })
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
