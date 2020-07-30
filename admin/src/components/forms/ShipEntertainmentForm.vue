<template>
  <v-card flat>
    <v-card-text>
  <v-container>
    <ValidationObserver ref="formValidator">
    <v-form
      ref="form"
      v-model="valid"
    >
    <!-- =============================== TENDERS =============================== -->
    <v-row>
      <v-col
      sm="12"
      md="2"
      >
      <v-checkbox
       v-model="editedItem.shipEntertainment.gsm"
       label="3G/4G on board"
      ></v-checkbox>
      </v-col>

      <v-col
      sm="12"
      md="2"
      >
      <v-checkbox
       v-model="editedItem.shipEntertainment.satelliteCommunication"
       label="Satellite communication"
       @change="updateNo($event, 'satelliteCommunicationType')"
      ></v-checkbox>
      </v-col>



      <v-col
      v-if="editedItem.shipEntertainment.satelliteCommunication"
      sm="12"
      md="2"
      >
      <ValidationProvider name="Communication Type" :rules="{ required: editedItem.shipEntertainment.satelliteCommunication }" v-slot="{ errors }">
      <v-select
       label="Select type"
       :items="satelliteCommunicationsTypesList"
       v-model="editedItem.shipEntertainment.satelliteCommunicationType"
       item-text="name"
       item-value="code"
      ></v-select>
      <span class="formError">{{ errors[0] }}</span>
    </ValidationProvider>
      </v-col>
      <v-col sm="12" dense>
        <v-divider />
      </v-col>
    </v-row>

      <!-- =============================== TENDERS =============================== -->
      <v-row>
        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="hasTenders"
         label="Tender(s)"
        ></v-checkbox>
        </v-col>

        <v-col
        v-if="hasTenders"
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="tendersNo"
         label="Tenders No."
         type="number"
         required
        ></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="hasTenders">
        <v-col
        cols="12"
        sm="12"
        md="8"
        v-for="(t, index) in editedItem.shipEntertainment.tenders"
        :key="index">
          <TenderForm
          :item="t"
          :itemNo="index+1"
          />
        </v-col>
        </v-row>

        <!-- =============================== WaveRunners =============================== -->
        <v-row>
          <v-col
          sm="12"
          md="2"
          >
          <v-checkbox
           v-model="hasWaveRunners"
           label="WaveRunner(s)"
          ></v-checkbox>
          </v-col>

          <v-col
          v-if="hasWaveRunners"
          sm="12"
          md="2"
          >
          <v-text-field
           v-model.number="waveRunnersNo"
           label="Wave Runners No."
           type="number"
           required
          ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="hasWaveRunners">
          <v-col
          cols="12"
          sm="12"
          md="8"
          v-for="(t, index) in editedItem.shipEntertainment.waveRunners"
          :key="index">
            <WaveRunnerForm
            :item="t"
            :itemNo="index+1"
            />
          </v-col>
          </v-row>

          <!-- =============================== Paddle boards,  =============================== -->
        <v-row>
        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.paddleBoards"
         label="Paddle boards (SUP)"
         @change="updateNo($event, 'paddleBoardsNo')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Paddle boards No." :rules="{ required: editedItem.shipEntertainment.paddleBoards, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.paddleBoardsNo"
         label="Paddle boards No.*"
         v-show="editedItem.shipEntertainment.paddleBoards"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
      </ValidationProvider>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.seabobs"
         label="Seabobs"
         @change="updateNo($event, 'seabobsNo')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Seabobs No." :rules="{ required: editedItem.shipEntertainment.paddleBoards, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.seabobsNo"
         label="Seabobs No.*"
         v-show="editedItem.shipEntertainment.seabobs"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
      </ValidationProvider>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.waterSkis"
         label="Water Skis"
         @change="updateNo($event, 'waterSkisNo')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Water Skis No." :rules="{ required: editedItem.shipEntertainment.waterSkis, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.waterSkisNo"
         label="Water Skis No.*"
         v-show="editedItem.shipEntertainment.waterSkis"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
      </ValidationProvider>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.waveboards"
         label="Waveboards"
         @change="updateNo($event, 'waveboardsNo')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Waveboards No." :rules="{ required: editedItem.shipEntertainment.waveboards, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.waveboardsNo"
         label="Waveboards No.*"
         v-show="editedItem.shipEntertainment.waveboards"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
      </ValidationProvider>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.waterSlide"
         label="Waterslide"
         @change="updateNo($event, 'waterSlideLength')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Length" :rules="{ required: editedItem.shipEntertainment.waterSlide, floatNum: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.waterSlideLength"
         label="Waterslide Length* (m)"
         v-show="editedItem.shipEntertainment.waterSlide"
         type="number"
         persistent-hint
         :hint="metersToFeet(editedItem.shipEntertainment.waterSlideLength)"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
      </ValidationProvider>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.bananas"
         label="Bananas"
         @change="updateNo($event, 'bananasNo')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Bananas No." :rules="{ required: editedItem.shipEntertainment.bananas, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.bananasNo"
         label="Bananas No.*"
         v-show="editedItem.shipEntertainment.bananas"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.surfboards"
         label="Surfboards"
         @change="updateNo($event, 'surfboardsNo')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Surfboards No." :rules="{ required: editedItem.shipEntertainment.surfboards, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.surfboardsNo"
         label="Surfboards No.*"
         v-show="editedItem.shipEntertainment.surfboards"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
        </v-col>


        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.kayacs"
         label="Kayacs"
         @change="updateNo($event, 'kayacsNo')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Kayacs No." :rules="{ required: editedItem.shipEntertainment.kayacs, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.kayacsNo"
         label="Kayacs No.*"
         v-show="editedItem.shipEntertainment.kayacs"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.sailingDinghies"
         label="Sailing Dinghies"
         @change="updateNo($event, 'sailingDinghiesType')"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="Sailing Dinghies Type" :rules="{ required: editedItem.shipEntertainment.sailingDinghies }" v-slot="{ errors }">
        <v-text-field
         v-model="editedItem.shipEntertainment.sailingDinghiesType"
         label="Sailing Dinghies Type*"
         v-show="editedItem.shipEntertainment.sailingDinghies"
         ></v-text-field>
         <span class="formError">{{ errors[0] }}</span>
         </ValidationProvider>
         </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.oceanPool"
         label="Ocean Pool"
        ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.snorkelingEquipment"
         label="Snorkeling Equipment"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="No. of snorkeling sets" :rules="{ required: editedItem.shipEntertainment.snorkelingEquipment, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.snorkelingEquipmentNo"
         label="No. of snorkeling sets*"
         v-show="editedItem.shipEntertainment.snorkelingEquipment"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="editedItem.shipEntertainment.divingEquipment"
         label="Diving Equipment"
        ></v-checkbox>
        </v-col>

        <v-col
        sm="12"
        md="2"
        >
        <ValidationProvider name="No. of diving sets" :rules="{ required: editedItem.shipEntertainment.divingEquipment, integer: true }" v-slot="{ errors }">
        <v-text-field
         v-model.number="editedItem.shipEntertainment.divingEquipmentNo"
         label="No. of diving sets*"
         v-show="editedItem.shipEntertainment.divingEquipment"
         type="number"
         min="1"
        ></v-text-field>
        <span class="formError">{{ errors[0] }}</span>
        </ValidationProvider>
        </v-col>

      </v-row>


      <!-- =============================== Air compresors =============================== -->
      <v-row>
        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="hasAirCompressors"
         label="Air Compressor(s)"
        ></v-checkbox>
        </v-col>

        <v-col
        v-if="hasAirCompressors"
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="airCompressorsNo"
         label="Air Compressors No."
         type="number"
         required
        ></v-text-field>
        </v-col>

        <template v-if="hasAirCompressors">
        <v-col
        cols="12"
        md="4"
        v-for="(t, index) in editedItem.shipEntertainment.airCompressors"
        :key="index">
          <AirCompressorForm
          :item="t"
          :itemNo="index+1"
          />
        </v-col>
      </template>
      </v-row>

      <!-- =============================== Nitrox on board =============================== -->
      <v-row>
        <v-col
        sm="12"
        md="2"
        >
        <v-checkbox
         v-model="hasNitroxOnBoard"
         label="Nitrox On Board"
        ></v-checkbox>
        </v-col>

        <v-col
        v-if="hasNitroxOnBoard"
        sm="12"
        md="2"
        >
        <v-text-field
         v-model.number="nitroxOnBoardNo"
         label="Nitrox On Board No."
         type="number"
         required
        ></v-text-field>
        </v-col>

        <template v-if="hasNitroxOnBoard">
        <v-col
        cols="12"
        md="4"
        v-for="(t, index) in editedItem.shipEntertainment.nitroxOnBoard"
        :key="index">
          <NitroxOnBoardForm
          :item="t"
          :itemNo="index+1"
          />
        </v-col>

        <v-col
        sm="12"
        >
          <v-textarea
            v-model="editedItem.shipEntertainment.description"
            label="Description"
            persistent-hint
            hint="Add any other equipment that your craft is fitted with and has not been captured above"
            outlined
          ></v-textarea>
       </v-col>
      </template>
    </v-row>

  </v-form>
  </ValidationObserver>
  </v-container>
  </v-card-text>
  <FormSubmitButtons
  :disabled="!valid"
  :formState="formState"
  @create-item="createItem"
  @update-item="updateItem"
  />
  </v-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import TenderForm from '@/components/forms/inner-components/TenderForm'
import WaveRunnerForm from '@/components/forms/inner-components/WaveRunnerForm'
import AirCompressorForm from '@/components/forms/inner-components/AirCompressorForm'
import NitroxOnBoardForm from '@/components/forms/inner-components/NitroxOnBoardForm'

import { mapState } from 'vuex'

import { metersToFeet } from '@common/utils'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
    TenderForm,
    WaveRunnerForm,
    AirCompressorForm,
    NitroxOnBoardForm,
  },

  data () {
    return {
      valid: true,



      // validation rules

    }
  },

  computed: {
        ...mapState(['satelliteCommunicationsTypesList']),

    hasTenders: {
      get () {
        return !!this.editedItem.shipEntertainment.tenders && this.editedItem.shipEntertainment.tenders.length > 0
      },

      set (val) {
        if(val) {
          if(this.editedItem.shipEntertainment.tenders.length == 0){
            this.editedItem.shipEntertainment.tenders.push(this.getDefaultTender())
          }
        } else {
          this.editedItem.shipEntertainment.tenders = []

        }
      }
    },

    tendersNo: {
      get () {
        return this.editedItem.shipEntertainment && this.editedItem.shipEntertainment.tenders ? this.editedItem.shipEntertainment.tenders.length : 0
      },

      set (val) {
        if(val < 0 || isNaN(val)) val = 0
        if(!this.editedItem.shipEntertainment.tenders) this.editedItem.shipEntertainment.tenders = []
        if(val > this.editedItem.shipEntertainment.tenders.length){
          const diff = val - this.editedItem.shipEntertainment.tenders.length
          let missing = Array(diff).fill(this.getDefaultTender())
          this.editedItem.shipEntertainment.tenders = [...this.editedItem.shipEntertainment.tenders, ...missing]
        }
        if(val < this.editedItem.shipEntertainment.tenders.length){
          this.editedItem.shipEntertainment.tenders.splice(val)
        }
      }
    },

    hasWaveRunners: {
      get () {
        return !!this.editedItem.shipEntertainment.waveRunners && this.editedItem.shipEntertainment.waveRunners.length > 0
      },

      set (val) {
        if(val) {
          if(this.editedItem.shipEntertainment.waveRunners.length == 0){
            this.editedItem.shipEntertainment.waveRunners.push(this.getDefaultWaveRunner())
          }
        } else {
          this.editedItem.shipEntertainment.waveRunners = []

        }
      }
    },

    waveRunnersNo: {
      get () {
        return this.editedItem.shipEntertainment && this.editedItem.shipEntertainment.waveRunners ? this.editedItem.shipEntertainment.waveRunners.length : 0
      },

      set (val) {
        if(val < 0 || isNaN(val)) val = 0
        if(!this.editedItem.shipEntertainment.waveRunners) this.editedItem.shipEntertainment.waveRunners = []
        if(val > this.editedItem.shipEntertainment.waveRunners.length){
          const diff = val - this.editedItem.shipEntertainment.waveRunners.length
          let missing = Array(diff).fill(this.getDefaultWaveRunner())
          this.editedItem.shipEntertainment.waveRunners = [...this.editedItem.shipEntertainment.waveRunners, ...missing]
        }
        if(val < this.editedItem.shipEntertainment.waveRunners.length){
          this.editedItem.shipEntertainment.waveRunners.splice(val)
        }
      }
    },


    hasAirCompressors: {
      get () {
        return !!this.editedItem.shipEntertainment.airCompressors && this.editedItem.shipEntertainment.airCompressors.length > 0
      },

      set (val) {
        if(val) {
          if(this.editedItem.shipEntertainment.airCompressors.length == 0){
            this.editedItem.shipEntertainment.airCompressors.push(this.getDefaultAirCompressor())
          }
        } else {
          this.editedItem.shipEntertainment.airCompressors = []

        }
      }
    },

    airCompressorsNo: {
      get () {
        return this.editedItem.shipEntertainment && this.editedItem.shipEntertainment.airCompressors ? this.editedItem.shipEntertainment.airCompressors.length : 0
      },

      set (val) {
        if(val < 0 || isNaN(val)) val = 0
        if(!this.editedItem.shipEntertainment.airCompressors) this.editedItem.shipEntertainment.airCompressors = []
        if(val > this.editedItem.shipEntertainment.airCompressors.length){
          const diff = val - this.editedItem.shipEntertainment.airCompressors.length
          let missing = Array(diff).fill(this.getDefaultAirCompressor())
          this.editedItem.shipEntertainment.airCompressors = [...this.editedItem.shipEntertainment.airCompressors, ...missing]
        }
        if(val < this.editedItem.shipEntertainment.airCompressors.length){
          this.editedItem.shipEntertainment.airCompressors.splice(val)
        }
      }
    },


    hasNitroxOnBoard: {
      get () {
        return !!this.editedItem.shipEntertainment.nitroxOnBoard && this.editedItem.shipEntertainment.nitroxOnBoard.length > 0
      },

      set (val) {
        if(val) {
          if(this.editedItem.shipEntertainment.nitroxOnBoard.length == 0){
            this.editedItem.shipEntertainment.nitroxOnBoard.push(this.getDefaultNitroxOnBoard())
          }
        } else {
          this.editedItem.shipEntertainment.nitroxOnBoard = []

        }
      }
    },

    nitroxOnBoardNo: {
      get () {
        return this.editedItem.shipEntertainment && this.editedItem.shipEntertainment.nitroxOnBoard ? this.editedItem.shipEntertainment.nitroxOnBoard.length : 0
      },

      set (val) {
        if(val < 0 || isNaN(val)) val = 0
        if(!this.editedItem.shipEntertainment.nitroxOnBoard) this.editedItem.shipEntertainment.nitroxOnBoard = []
        if(val > this.editedItem.shipEntertainment.nitroxOnBoard.length){
          const diff = val - this.editedItem.shipEntertainment.nitroxOnBoard.length
          let missing = Array(diff).fill(this.getDefaultNitroxOnBoard())
          this.editedItem.shipEntertainment.nitroxOnBoard = [...this.editedItem.shipEntertainment.nitroxOnBoard, ...missing]
        }
        if(val < this.editedItem.shipEntertainment.nitroxOnBoard.length){
          this.editedItem.shipEntertainment.nitroxOnBoard.splice(val)
        }
      }
    },
  },

  methods: {
    async validateForm () {
      return await this.$refs.formValidator.validate()
    },

    getDefaultTender () {
      return { type: '', length: null }
    },

    getDefaultWaveRunner () {
      return { maker: '', type: '', length: null }
    },

    getDefaultAirCompressor () {
      return { capacity: null }
    },

    getDefaultNitroxOnBoard () {
      return { type: '' }
    },

    updateNo (val, field) {
      if(!val && this.editedItem.shipEntertainment[field]) {
        this.editedItem.shipEntertainment[field] = null
      }
    },

    metersToFeet (val) {
      return metersToFeet(val)
    },
  },
}
</script>
