<script>
import allDestinations from '@common/assets/destinations'

export default {
  data () {
    return {
      items: allDestinations,
      error: null,
    }
  },

  render() {
      return this.$scopedSlots.default({items:this.items, error: this.error})
  }


}
</script>
