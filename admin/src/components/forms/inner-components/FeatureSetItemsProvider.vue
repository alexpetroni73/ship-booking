<script>
import FeatureSetBySlug from '@common/graphql/feature-set/FeatureSetBySlug.gql'

export default {
  props: {
    featureSet: {
      type: String
    },
  },

  data () {
    return {
      items: [],
      error: null,
    }
  },

  apollo: {
    items: {
      query: FeatureSetBySlug,
      variables () {
        return {slug: this.featureSet}
      },
      update: (data) => data.featureSetBySlug && data.featureSetBySlug.items ? data.featureSetBySlug.items : [],
      error (error) {
        this.error = error.message
      },
      skip () {
        return !this.featureSet
      }
    }
  },

  render() {
      return this.$scopedSlots.default({items:this.items, error: this.error})
  }
}
</script>
