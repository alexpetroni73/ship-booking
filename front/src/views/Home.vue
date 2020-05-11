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
              <base-material-stats-card
                color="primary"
                icon="mdi-poll"
                title="Website Visits"
                value="75.521"
                sub-icon="mdi-tag"
                sub-text="Tracked from Google Analytics"
              />
            </v-col>
          </v-row>

    </v-col>
  </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {

  }
}
</script>

<style scoped>
.home {
  background: no-repeat center/100% url("./../assets/b2.jpg");
}
</style>
