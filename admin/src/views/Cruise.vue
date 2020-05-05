<template>
    <CruiseEditor
    :id="id"
    v-on="onEditorEvents"
    />
</template>

<script>
import CruiseEditor from '@/components/editors/CruiseEditor'

export default {
  components: {
    CruiseEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      return {
        'new-item': this.onAddNewItem,
        'item-created': this.onItemCreated,
        'item-updated': this.onItemUpdated,
        'item-deleted': this.onItemDeleted,
        'cancel': this.onCancel,
      }
    },
  },

  methods: {
    onAddNewItem () {
      this.$router.push({ name: 'cruise-edit' })
    },

    onItemCreated () {
      this.$router.push({ name: 'cruises' })
    },

    onItemUpdated () {
      this.$router.push({ name: 'cruises' })
    },

    onItemDeleted () {
      this.$router.push({ name: 'cruises' })
    },

    onCancel () {
      this.$router.push({ name: 'cruises' })
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
