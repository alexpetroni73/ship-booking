<template>
    <ShipsListEditor
    v-on="onEditorEvents"
    />
</template>

<script>
import ShipsListEditor from '@/components/editors/ShipsListEditor'

export default {
  components: {
    ShipsListEditor,
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
      this.$router.push({path: 'ship-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `ship-edit/${id}`})
    },
  },
}
</script>
