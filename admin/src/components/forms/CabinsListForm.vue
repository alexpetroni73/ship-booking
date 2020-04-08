<template>
  <v-card
    max-width="600"
    class="mx-auto"
    >

    <v-toolbar
     color="cyan"
     dark
   >

   <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Cabins list</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>

    </v-btn>
    <v-btn

    color="primary"
    dark
    title="Add New Cabin"
    @click="addNewCabin">
    <v-icon small dark>mdi-plus</v-icon>
  </v-btn>
    </v-toolbar>


    <template v-if="isEmptyList">
      <div class="text-center headline empty-cabins-list">No cabins yet. Click on "+" button to add a cabin.</div>
    </template>

    <template v-else>
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
                icon title="Edit Cabin"
                @click="editItem(item.id)"
                >
                    <v-icon small title="Edit Cabin">mdi-pencil</v-icon>
                </v-btn>
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-html="item.excerpt"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn icon class="handle">
            <v-icon>mdi-arrow-all</v-icon>
          </v-btn>
        </v-list-item-icon>
        </v-list-item>
        </draggable>
      </v-list>
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
import draggable from 'vuedraggable'

export default {
  mixins: [ FormMixin ],

  components: {
    FormSubmitButtons,
    draggable,
  },

  computed: {
    isEmptyList () {
      return !this.editedItem.length
    }
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

.handle {
  cursor: grabbing;
}

.none {

}
</style>
