<template>
  <div class="home">
    <v-container>
      <v-row class="py-12">
      <v-col cols="12">
          <v-row
          justify="center"
          align="center"
          >
            <v-col cols="12" class="display-4 text-center white--text">
              Small Ship Cruises
            </v-col>
            <v-col cols="12" class="display-2 text-center white--text">
              Compare & Book 520 Small Ships with 36790 Cruises easily online
            </v-col>

            <v-col cols="12">
              <v-card flat>
                <v-row justify="center">
                  <v-col md="3">
                    <v-select
                    :items="locations"
                    v-model="destination"
                    label="Select location"
                  ></v-select>
                  </v-col>
                  <v-col md="2">
                    <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Upcoming departures"
                                prepend-icon="mdi-event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" type="month" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false" >Cancel</v-btn>
                              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                  </v-col>
                  <v-col md="2">
                    <v-btn large color="warning" @click="onSearch">Search</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

    </v-col>
  </v-row>
    </v-container>
  </div>
</template>

<script>

import locations from '@common/assets/locations'

export default {
  name: 'Home',

  data () {
    return {
      locations: locations,
      date: new Date().toISOString().substr(0, 7),
      menu: false,
    }
  },

  components: {

  },

  methods: {
    onSearch () {
      let destination = this.destination || 'all'
      let departure = this.date
      this.$router.push({path: `/search/${destination}/${departure}`})
    }
  }
}
</script>

<style scoped>
.home {
  background: no-repeat center/100% url("./../assets/b2.jpg");
}
</style>
