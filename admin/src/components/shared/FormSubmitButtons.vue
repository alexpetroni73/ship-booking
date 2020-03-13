<template>
  <v-card
  flat
  >
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
    v-if="isEditForm"
    @click="onUpdate()"
    :color="btnColor"
    :disabled="disabled"
    >
      Update
    </v-btn>

    <v-btn
    v-else
    @click="onCreate()"
    :color="btnColor"
    :disabled="disabled"
    >
      Add
    </v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>
  </v-card>
</template>

<script>
import { FormState,  isEditForm } from '@/utils'

export default {
  props: {
    formState: {
      type: String,
      default: FormState.NEW
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    btnColor: {
      type: String,
      default: 'primary'
    },
  },

  data () {
    return {

    }
  },

  computed: {
    isEditForm () {
      return isEditForm(this.formState)
    },
  },

  watch: {

  },

  methods: {
    onCreate () {
      this.$emit('create-item')
    },

    onUpdate () {
      this.$emit('update-item')
    },
  },


}
</script>
