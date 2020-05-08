<template>
  <div>
    <TableEditorHeader
    v-model="search"
    title="Ships"
    @addNewItem="addNewItem"
    >

    </TableEditorHeader>
    <v-data-table
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      must-sort
      :server-items-length="total"
      item-key="id"
      :search="search"
      show-select
      :page.sync="page"
      :itemsPerPage.sync="itemsPerPage"
      :sortBy.sync="sortBy"
      :sortDesc.sync="sortDesc"
      :loading="isLoading"
      :footer-props="footerProps"
      class="elevation-1"
    >

    <template v-slot:item.id="{ item }">
      <v-btn icon @click="editItem(item.id)"><v-icon small>mdi-pencil</v-icon></v-btn>
    </template>

    <template v-slot:item.logo="{ item }">
      <cld-image
      v-if="item.logo"
      cloudName="kilohertz" :publicId="item.logo" secure="true">
        <cld-transformation width="75" crop="scale" />
      </cld-image>
    </template>

    <template v-slot:item.updatedAt="{ item }">
      {{ item.updatedAt | parseDate }}
    </template>

    </v-data-table>

    <v-container fluid>
      <v-row>
        <v-col
        xs="12"
        sm="6"
        md="4"
        >
        <BulkActionSelector
        :disabled="disableBulkActions"
        @bulkAction="onBulkAction"
        >
        </BulkActionSelector>
      </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchShips from '@common/graphql/ship/SearchShips.gql'
import DeleteShips from '@common/graphql/ship/DeleteShips.gql'
import TableEditorMixin from '@common/mixins/TableEditorMixin'

import TableEditorHeader from '@common/components/TableEditorHeader'
import BulkActionSelector from '@common/components/BulkActionSelector'

export default {

  components: {
    TableEditorHeader,
    BulkActionSelector,
  },

  mixins: [TableEditorMixin],

  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Slug', value: 'slug' },
        { text: 'Logo', value: 'logo', sortable: false },
        { text: 'Updated At', value: 'updatedAt' },
        { text: 'Edit', value: 'id', sortable: false },
      ],
    }
  },

  methods: {
    getPaginatedQuery () {
      return SearchShips
    },

    listenBusEventsFor () {
      return 'ship'
    },

    deleteItems () {
      this.deleteSelectedItems(DeleteShips)
    },

    onBulkAction (val) {
      if(val == 'delete'){
        this.deleteItems()
      }
    }
  },
}
</script>
