<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Option from '@common/graphql/option/Option.gql'
import CreateOption from '@common/graphql/option/CreateOption.gql'
import UpdateOption from '@common/graphql/option/UpdateOption.gql'
import DeleteOption from '@common/graphql/option/DeleteOption.gql'

import { isAnObject } from '@common/utils'

export default {
  extends: BaseItemFormModel,

  props: {
  },

  data () {
    return {
    }
  },

  methods: {
    itemKey () {
      return {name: this.id}
    },

    getDefaultItem () {
      return {
        value: ''
      }
    },

    stringifyIfNeeded (value) {
      return isAnObject(value) || Array.isArray(value) ? JSON.stringify(value) : value
    },

    async createItem (item, key) {
      let value = this.stringifyIfNeeded(item.value)
      let { data: { createOption } } = await this.$apollo.mutate({
        mutation: CreateOption,
        variables: {...key, value},
      })
      return createOption
    },

    async loadItem (key) {
      let { data: { option } } = await this.$apollo.query({
        query: Option,
        variables: key,
      })
      // prevent giving null for non-existent options
      return option ? option : { name: key.name, value: null }
    },

    async updateItem (item, key) {
      let value = JSON.stringify(item.value)
      let { data: { updateOption } } = await this.$apollo.mutate({
        mutation: UpdateOption,
        variables: {...key, value},
      })
      return updateOption
    },

    async deleteItem (key) {
      let { data: { deleteOption } } = await this.$apollo.mutate({
        mutation: DeleteOption,
        variables: key,
      })
      return deleteOption
    },

  },
}
</script>
