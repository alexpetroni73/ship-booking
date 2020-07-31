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
          v-for="(item, index) in editedItem"
          :key="item.id"
        >
        <v-list-item-avatar size="75">
          <ImgTransf
            v-if="item.image"
            :path="item.image"
            :transformation="[{ar:1-1},{w:150}]"
          />
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

                {{ cabinExcerpt(item, index) }}
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
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import NoData from '@common/components/NoData'
import draggable from 'vuedraggable'
import ImgTransf from '@common/components/img/ImgTransf'
import cabinsTypesList from '@common/assets/cabins-types-list'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
    NoData,
    draggable,
    ImgTransf,
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

    cabinExcerpt (item, index) {
      let type = this.cabinTypeName(item.type)
      return  `${index + 1}     ${item.name}, ${type}, ${item.capacity} pax, ${item.surface} sqm `
    },

    cabinTypeName (code) {
      let type = cabinsTypesList.find(e => e.code == code)
      return type ? type.name : ''
    },
  },
}
</script>

<style scoped>
.empty-cabins-list{
  min-height: 300px;
}
</style>
