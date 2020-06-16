<template>
  <CruisesListEditor
    v-on="onEditorEvents"
  />
</template>

<script>
import CruisesListEditor from '@/components/editors/CruisesListEditor'

export default {
  components: {
    CruisesListEditor,
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
      this.$router.push({path: 'cruise-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `cruise-edit/${id}`})
    },
  },
}
</script>
