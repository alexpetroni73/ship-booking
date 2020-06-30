<template>
  <base-material-card class="px-5 py-3">
    <template v-slot:heading>
      <FormTopBar
        addNewTitle="Add New Cabin"
        v-bind="modelState"
        v-on="formEvents"
        :name="item.name"
      />
    </template>

      <v-container>
       <v-row>
         <v-col
         sm="12"
         md="4"
         >
           <v-text-field v-model="editedItem.name" label="Cabin name"></v-text-field>
         </v-col>

         <v-col
         sm="6"
         md="2"
         >
         <v-radio-group v-model="editedItem.type" class="mt-0">
           <template v-slot:label>
            Cabin type
          </template>
          <v-radio
            v-for="t in cabinsTypesList"
            :key="t.code"
            :label="t.name"
            :value="t.code"
            :hint="t.explanation"
          >

          <template v-slot:label>
         <div>
          {{ t.name }}
           <v-tooltip bottom v-if="t.explanation">
             <template v-slot:activator="{ on }">
               <v-btn icon v-on="on" small><v-icon color="primary" small>mdi-help-circle</v-icon></v-btn>
             </template>
             {{ t.explanation }}
           </v-tooltip>
         </div>
       </template>
     </v-radio>
        </v-radio-group>
        </v-col>

         <v-col
         sm="3"
         md="2"
         >
           <v-select v-model.number="editedItem.capacity" label="No of pax" :items="paxItems"></v-select>
         </v-col>

         <v-col
         sm="6"
         md="2"
         >
           <v-checkbox v-model="editedItem.ensuite" label="Ensuite">
             <template v-slot:label>
            <div>
             Ensuite
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" small><v-icon color="primary" small>mdi-help-circle</v-icon></v-btn>
                </template>
                ”Ensuite” indicates that each cabin has its own toilet and comes with shower and/or a bath.
              </v-tooltip>
            </div>
          </template>
           </v-checkbox>
         </v-col>


      </v-row>


     <v-row>

       <v-col sm="4" md="2">
         <v-select
         v-model="editedItem.bedding"
         label="Bed"
         :items="bedsTypesList"
         item-text="name"
         item-value="code"
         ></v-select>
       </v-col>


       <v-col sm="4" md="2">
         <v-select
         v-model="editedItem.pullmanBedding"
         label="Pullman bed"
         :items="pullmanBedsTypesList"
         item-text="name"
         item-value="code"
         ></v-select>
       </v-col>

     <v-col sm="4" md="2">
       <v-checkbox
       v-model="editedItem.showerBathub"
       label="Shower Bathub"
       ></v-checkbox>
     </v-col>

     <v-col sm="4" md="2">
       <v-checkbox
       v-model="editedItem.seaView"
       label="Sea view"
       ></v-checkbox>
     </v-col>

     <v-col sm="4" md="2">
       <v-checkbox
       v-model="editedItem.airconditioning"
       label="Air Conditioning"
       ></v-checkbox>
     </v-col>

     <v-col sm="4" md="2">
       <v-checkbox
       v-model="editedItem.tv"
       label="TV"
       ></v-checkbox>
     </v-col>

         <!-- <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.excerpt"
             label="Excerpt"
             hint="Short text visible on cabins list"
             outlined
           ></v-textarea>
        </v-col> -->

         <v-col
         sm="12"
         >
           <v-textarea
             v-model="editedItem.description"
             label="Description"
             hint="Description visible on cabin presentation"
             outlined
           ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col
        cols="12"
        >

        <AttachmentSelector
         class="pb-8"
         title="Main image"
         :multiple="false"
         v-model="editedItem.image"
        />

        <AttachmentSelector
         title="Gallery"
         :multiple="true"
         v-model="editedItem.gallery"
         :imgWidth="150"
        />

      </v-col>
      </v-row>

      <!-- <v-row>
        <v-col
        sm="12"
        >
          <v-textarea
            v-model="editedItem.featuresText"
            label="Features text"
            hint="Cabin features text"
            outlined
          ></v-textarea>
       </v-col>

     <template v-for="item in cabinFeatures">
       <v-col
       :key="item.slug"
       sm="12"
       md="4"
       class="text-center py-0"
       >
       <v-checkbox
         :dense="true"
         :multiple="true"
         v-model="editedItem.features"
         :label="item.name"
         :value="item.slug"
       ></v-checkbox>
     </v-col>
     </template>
   </v-row> -->
     </v-container>

    <FormSubmitButtons
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    :disabled="!enableSubmit"
    />
  </base-material-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import AttachmentSelector from '@/components/selectors/AttachmentSelector'
import { mapState } from 'vuex'

export default {
  mixins: [ FormItemMixin ],

  props: {
    cabinFeatures: {
      type: Array,
      default: () => [],
    }
  },

  data () {
    return {
      paxItems: [{text: '1 pax', value: 1},{text: '2 pax', value: 2}]
    }
  },

  components: {
    FormTopBar,
    FormSubmitButtons,
    AttachmentSelector,
  },

  computed: {
    ...mapState([
      'cabinsTypesList',
      'bedsTypesList',
      'pullmanBedsTypesList',
    ]),
    enableSubmit () {
      return this.editedItem.name && this.editedItem.capacity
    }
  },

  methods: {
    showList () {
      this.$emit('show-list')
    },
  },

  watch: {
    cabinFeatures: function (val) {
      console.log('watch cabinFeatures %o', val)
    },
  },
}
</script>
