<template>
  <v-card>

    <v-toolbar
    color="white elevation-1"
     >
     <v-spacer></v-spacer>
     <v-toolbar-title>{{ listTitle }}</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-btn
        fab
        small
        dark
        color="primary"
        @click="addNewCabin"
      >
      <v-icon small>mdi-plus</v-icon>
    </v-btn>
   </v-toolbar>


    <template v-if="hasCabins">
      <v-list
      three-line
      >
        <draggable v-model="editedItem" handle=".handle">

        <v-list-item
          v-for="item in editedItem"
          :key="item.id"
        >
        <v-list-item-avatar size="75">
          <cld-image
          v-if="item.image"
          :publicId="item.image" secure="true">
            <cld-transformation width="150" crop="scale" />
          </cld-image>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
              <v-list-item-title>
                <v-btn
                icon
                title="Edit Cabin"
                @click="editItem(item.id)"
                >
                    <v-icon small title="Edit Cabin">mdi-pencil</v-icon>
                </v-btn>
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-html="item.excerpt"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn
          v-if="isReordable"
          icon
          title="Drag to reorder"
          class="handle">
            <v-icon>mdi-drag-vertical</v-icon>
          </v-btn>
        </v-list-item-icon>
        </v-list-item>
        </draggable>
      </v-list>
    </template>

    <template v-else>
      <NoData
        title="No cabins yet."
      />
    </template>

    <FormSubmitButtons
    v-if="!isEmptyList"
    :formState="formState"
    @update-item="updateItem"
    />
  </v-card>
</template>

<script>
import FormMixin from '@/mixins/FormMixin'
import FormSubmitButtons from '@/components/shared/FormSubmitButtons'
import NoData from '@/components/shared/NoData'
import draggable from 'vuedraggable'

export default {
  mixins: [ FormMixin ],

  components: {
    FormSubmitButtons,
    NoData,
    draggable,
  },

  data () {
    return {
      listTitle: "Cabins List",
    }
  },

  computed: {
    isEmptyList () {
      return !this.editedItem.length
    },

    hasCabins () {
      return this.editedItem && this.editedItem.length
    },

    isReordable () {
      return this.hasCabins && this.editedItem.length > 1
    },
  },

  methods: {
    addNewCabin () {
      this.$emit('edit-item', null)
    },

    editItem (val) {
      this.$emit('edit-item', val)
    },
  },
}
</script>

<style scoped>
.empty-cabins-list{
  min-height: 300px;
}
</style>
