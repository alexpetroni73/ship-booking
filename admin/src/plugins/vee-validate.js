import Vue from 'vue'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'
import {
  email,
  max,
  min,
  numeric,
  required,
} from 'vee-validate/dist/rules'

const regExFloatNum = /^((\d+\.?\d*)|(\.\d+))$/
const regExInteger = /^[1-9]\d*$/
const regExIntegerOrZero = /^\d+$/

setInteractionMode('lazy')

extend('email', email)
extend('max', max)
extend('min', min)
extend('numeric', numeric)
extend('required', required)

extend('floatNum', {
  validate: value => {
    return regExFloatNum.test(value)
  },
  message: "A number is required"
  }
)

extend('integer', {
  validate: value => {
    return regExInteger.test(value)
  },
  message: "An positive number is required"
  }
)

extend('integerOrZero', {
  validate: value => {
    return regExIntegerOrZero.test(value)
  },
  message: "An number is required"
  }
)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
