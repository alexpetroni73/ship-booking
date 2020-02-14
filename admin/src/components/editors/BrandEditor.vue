<template>
  <ItemEditorWrapper
  :editState="editState"
  :error="error"
  v-on="onEvents"
  >

    <v-container>
      <v-row wrap>
        <v-col cols="12">
          <v-text-field v-model="editedItem.name" label="Brand name"></v-text-field>
        </v-col>
        <v-col v-if="isEditState" cols="12">
          <v-text-field v-model="editedItem.slug" label="Slug"></v-text-field>
        </v-col>

        <v-col cols="12">
          <SingleImageEditor
          v-model="editedItem.logo"
          >
          </SingleImageEditor>
        </v-col>
      </v-row>
    </v-container>

  </ItemEditorWrapper>
</template>

<script>
import editService from '@/services/brands'
import ItemEditorMixin from '@/mixins/ItemEditorMixin'
import ItemEditorWrapper from '@/components/shared/ItemEditorWrapper'
import SingleImageEditor from '@/components/shared/SingleImageEditor'

export default {
  name: 'brandEditor',

  mixins: [ItemEditorMixin],

  components: {
    ItemEditorWrapper,
    SingleImageEditor,
  },

  data: function () {
    return {
      service: editService,
    }
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        logo: null,
      }
    },

    getBusEventName () {
      return 'brand'
    },

  }
}

</script>
