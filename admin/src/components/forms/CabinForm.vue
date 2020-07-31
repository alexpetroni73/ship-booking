<template>
  <base-material-card class="py-3">
    <template v-slot:heading>
      <FormTopBar
        addNewTitle="Add New Cabin"
        v-bind="modelState"
        v-on="formEvents"
        :name="item.name"
      />
    </template>

      <v-container>
        <ValidationObserver ref="formValidator">
        <v-form>
       <v-row>
         <v-col
         sm="12"
         md="4"
         >
         <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
           <v-text-field v-model="editedItem.name" label="Name of Cabin*">
           </v-text-field>
           <span class="formError">{{ errors[0] }}</span>
         </ValidationProvider>
         </v-col>

         <v-col
         sm="6"
         md="2"
         >
         <v-radio-group v-model="editedItem.type" class="mt-0" @change="onTypeChanged">
           <template v-slot:label>
            Type of Cabin
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
         <ValidationProvider rules="required" v-slot="{ errors }">
           <v-select v-model.number="editedItem.capacity" label="No of pax*" :items="paxItems"></v-select>
           <span class="formError">{{ errors[0] }}</span>
         </ValidationProvider>
         </v-col>

         <v-col
         sm="3"
         md="2"
         >
         <ValidationProvider name="Size of Cabin" rules="required|floatNum" v-slot="{ errors }">
           <v-text-field
           v-model.number="editedItem.surface"
           label="Size of Cabin* (sqm)"
           persistent-hint
           type="number"
           :hint="areaMetersToFeet(editedItem.surface)"
           />
           <span class="formError">{{ errors[0] }}</span>
         </ValidationProvider>
         </v-col>

         <v-col
         sm="6"
         md="2"
         >
           <v-checkbox v-model="editedItem.balcony" label="Balcony" />
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

       <v-col sm="4" md="3">
         <ValidationProvider name="Bed Type" rules="required" v-slot="{ errors }">
         <v-select
         v-model="editedItem.bedding"
         label="Bed*"
         :items="bedsTypesList"
         item-text="name"
         item-value="code"
         ></v-select>
         <span class="formError">{{ errors[0] }}</span>
       </ValidationProvider>
       </v-col>


       <v-col sm="4" md="3">
         <ValidationProvider name="Pullman bed" rules="required" v-slot="{ errors }">
         <v-select
         v-model="editedItem.pullmanBedding"
         label="Pullman bed*"
         :items="pullmanBedsTypesList"
         item-text="name"
         item-value="code"
         ></v-select>
         <span class="formError">{{ errors[0] }}</span>
       </ValidationProvider>
       </v-col>

     <v-col sm="4" md="2">
       <v-checkbox
       v-model="editedItem.shower"
       label="Shower"
       ></v-checkbox>
     </v-col>

     <v-col sm="4" md="2">
       <v-checkbox
       v-model="editedItem.bathub"
       label="Bathub"
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
             persistent-hint
             hint="Enter a short description for the cabin you have just created"
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
     </v-form>
    </ValidationObserver>

     </v-container>

    <FormSubmitButtons
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    />
  </base-material-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import AttachmentSelector from '@/components/selectors/AttachmentSelector'
import { mapState } from 'vuex'

import { areaMetersToFeet } from '@common/utils'


const cabinTypeCapacities = {
  standard: {min: 1, max: 2},
  shared: {min: 3, max: 8},
  superior: {min: 1, max: 4},
}

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
    },

    cabinCapacity () {
      return cabinTypeCapacities[this.editedItem.type] ? cabinTypeCapacities[this.editedItem.type] : cabinTypeCapacities.standard
    },

    paxItems () {
      let {min, max} = this.cabinCapacity
      let arr = []
      for(let i = min; i <= max; i++){
        arr.push({text: i + ' pax', value: i})
      }
      return arr
    },
  },

  methods: {
    async validateForm () {
      return await this.$refs.formValidator.validate()
    },

    showList () {
      this.$emit('show-list')
    },

    areaMetersToFeet (val) {
      return areaMetersToFeet(val)
    },

    onTypeChanged () {
      console.log('ch')
      this.editedItem.capacity = null
    }
  },

  watch: {
    cabinFeatures: function (val) {
      console.log('watch cabinFeatures %o', val)
    },
  },
}
</script>
