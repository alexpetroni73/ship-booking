/* EditStateMixin - keep the edit state for an item into editor  */

import { EditState, isAddNewState, isEditState } from '@/utils'

const mix = {
  data: function () {
    return {
      editState: EditState.NEW,
    }
  },

  methods: {
    setAddNewState () {
      this.editState = EditState.NEW
    },

    setEditState () {
      this.editState = EditState.EDIT
    },
  },

  computed: {
    isAddNewState () {
      return isAddNewState(this.editState)
    },

    isEditState () {
      return isEditState(this.editState)
    },
  }
}

export default mix
