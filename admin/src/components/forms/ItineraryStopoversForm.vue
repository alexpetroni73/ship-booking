<template>
  <v-card>
    <v-toolbar
    flat
    >
      <v-toolbar-title>Stopovers</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-icon
        @click="onAddNew"
        color="primary"
        small
        >
        mdi-plus
      </v-icon>

    </v-toolbar>
    <v-container>
      <v-row>
        <v-col
        v-if="hasStopovers"
        cols="12"
        >
        list
        </v-col>

        <v-col
        v-else
        class="text-center pa-12"
        >
          No stopovers yet. Click on "+" button to add one.
        </v-col>

      </v-row>
    </v-container>
  </v-card>

</template>


<script>
export default {
  props: {
    stopovers: {
      type: Array,
      default: () => []
    },

    draggable: {
      type: Boolean,
      default: true,
    },
  },

  model: {
    prop: 'stopovers',
    event: 'change'
  },

  computed: {
    hasStopovers () {
      return !!this.stopovers.length
    }
  },

  methods: {
    onAddNew () {

    },
  },

}
</script>
