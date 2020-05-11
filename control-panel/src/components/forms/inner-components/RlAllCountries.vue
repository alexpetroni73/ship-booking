<script>
import allCountries from '@common/assets/countries'

export default {
  data () {
    return {
      items: allCountries,
      error: null,
    }
  },

  render() {
      return this.$scopedSlots.default({items:this.items, error: this.error})
  }


}
</script>
