<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

  <v-alert v-if="error" type="error">{{ error }}</v-alert>

  <v-data-iterator
    :items="items"
    :server-items-length="totalItems"
    :search="search"
  >
  <template v-slot:header>

    <v-toolbar
    flat
    color="transparent"
    >
    <v-spacer />
    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      v-model="searchTerm"
      style="max-width: 350px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <v-spacer />
      <AddNewBtn @click="addNew"/>
    </v-toolbar>

  </template>
  <template v-slot:default="props">
    <v-row
      v-if="hasItems"
    >
      <v-col
       v-for="item in props.items"
       :key="item.id"
       cols="12"
       sm="4"
       md="3"
       lg="3"
       >
        <base-material-card
          color="transparent"
          hover-reveal
          image
        >
          <template v-slot:image>
            <v-img :src="imgUrl(item.image, [{ar:4-3},{w:400}])" class="imgKit" />
          </template>

          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  class="mx-1"
                  v-bind="attrs"
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-view-split-vertical</v-icon>
                </v-btn>
              </template>

              <span>View</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="success"
                  light
                  icon
                  v-on="on"
                  @click="editItem(item.id)"
                >
                  <v-icon class="success--text">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  class="mx-1"
                  color="error"
                  light
                  icon
                  v-on="on"
                  @click="deleteItem(item.id)"
                >
                  <v-icon class="error--text">
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>

              <span>Remove</span>
            </v-tooltip>
          </template>

          <v-card-title class="justify-center font-weight-light">
            {{ item.name }}
          </v-card-title>

          <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
            {{ item.excerpt }}
          </v-card-text>

          <template v-slot:actions>
            <div class="display-2 font-weight-light grey--text">
              $459/night
            </div>

            <v-spacer />

            <span class="caption grey--text font-weight-light">
              <v-icon small>mdi-map-marker</v-icon>

              Milan, Italy
            </span>
          </template>
        </base-material-card>

      </v-col>
    </v-row>
  </template>

</v-data-iterator>

    <ConfirmationDialog
      v-model="dialog"
      :message="dialogMsg"
      @confirm="onConfirm"
    />

  </v-container>
</template>

<script>
import FormPagListMixin from '@common/mixins/FormPagListMixin'
import AddNewBtn from '@common/components/btn/AddNewBtn'
// import EditBtn from '@common/components/btn/EditBtn'
// import DeleteBtn from '@common/components/btn/DeleteBtn'
import ConfirmationDialog from '@common/components/ConfirmationDialog'
// import BulkActionSelector from '@common/components/BulkActionSelector'
import { parseDate } from '@common/utils'

export default {

  mixins: [ FormPagListMixin ],

  components: {
    AddNewBtn,
    // EditBtn,
    // DeleteBtn,
    ConfirmationDialog,
    // BulkActionSelector,
  },

  data () {
    return {

    }
  },

  methods: {
    formatDate (date) {
      return parseDate(date)
    },
  },
}
</script>
