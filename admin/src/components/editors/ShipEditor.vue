<template>
  <ItemEditorWrapper
  :editState="editState"
  :error="error"
  v-on="onEvents"
  >

    <v-container>
      <v-row wrap>
        <v-col cols="12">
          <v-text-field v-model="editedItem.name" label="Ship name"></v-text-field>
        </v-col>
        <v-col v-if="isEditState" cols="12">
          <v-text-field v-model="editedItem.slug" label="Slug"></v-text-field>
        </v-col>

        <v-col cols="12">
          <!-- <SingleImageEditor
          v-model="editedItem.logo"
          >
          </SingleImageEditor> -->
        </v-col>
      </v-row>
    </v-container>

  </ItemEditorWrapper>
</template>

<script>
import Ship from '@/graphql/ship/Ship.gql'
import CreateShip from '@/graphql/ship/CreateShip.gql'
import UpdateShip from '@/graphql/ship/UpdateShip.gql'
import DeleteShip from '@/graphql/ship/DeleteShip.gql'

import ItemEditorMixin from '@/mixins/ItemEditorMixin'
import ItemEditorWrapper from '@/components/shared/ItemEditorWrapper'

export default {
  name: 'ShipEditor',

  mixins: [ItemEditorMixin],

  components: {
    ItemEditorWrapper,
  },

  data: function () {
    return {
      gqlQueries: {
        create: CreateShip,
        read: Ship,
        update: UpdateShip,
        delete: DeleteShip,
      }
    }
  },

  computed: {
    onEvents () {
      return {
        'add-new-item': this.addNewItem,
        'create-item': this.createItem,
        'update-item': this.updateItem,
        'delete-item': this.deleteItem,
        'reload-item': this.reloadItem,
      }
    }
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
      }
    },
  }
}

</script>
