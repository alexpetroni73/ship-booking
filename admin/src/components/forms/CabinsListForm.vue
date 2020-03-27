<template>
  <v-card
    max-width="600"
    class="mx-auto"
    flat
    >

    <v-card-text>
      <v-container>
        <!-- <v-row wrap>
          <v-row>
            <v-col
            sm="12"
            md="3"
            >

            </v-col>

            <v-col
            sm="12"
            >
              <v-textarea
                v-model="editedItem.cabinsText"
                label="Cabins text"
                hint="Text on cabins page"
                outlined
              ></v-textarea>
           </v-col>
         </v-row>
       </v-row> -->

       <v-row>
         <v-col
         cols="12"
         class="text-right"
         >
          <v-btn
          fab
          small
          color="primary"
          dark
          @click="addNewCabin">
          <v-icon small dark>mdi-plus</v-icon>
        </v-btn>
         </v-col>

         <v-col
         cols="12"
         >
         <template v-if="isEmptyList">
           <div class="text-center headline empty-cabins-list">No cabins yet. Click on "+" button to add a cabin.</div>
         </template>

         <template v-else>
           Cabins list
           <v-list>
     <v-list-item
       v-for="item in editedItem"
       :key="item.id"
     >
       <v-list-item-icon>
         <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>
       </v-list-item-icon>

       <v-list-item-content>
         <v-list-item-title>{{ item.id }} {{ item.name}}</v-list-item-title>
       </v-list-item-content>

       <v-list-item-avatar>
         <v-img :src="item.avatar"></v-img>
       </v-list-item-avatar>

       <v-list-item-action>
        <v-btn icon @click="editItem(item.id)">
          <v-icon small color="grey lighten-1" title="Edit Cabin">mdi-pencil</v-icon>
        </v-btn>
        </v-list-item-action>
     </v-list-item>
   </v-list>
         </template>
        </v-col>
       </v-row>
     </v-container>
   </v-card-text>

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

export default {
  mixins: [ FormMixin ],

  components: {
    FormSubmitButtons,
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
</style>
