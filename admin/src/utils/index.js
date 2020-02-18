import Vue from 'vue'
import moment from 'moment'

const bus = new Vue()

const EditState = {
  NEW: 'new',
  EDIT: 'edit',
}

const isEditState = (val) => {
  return val == EditState.EDIT
}

const isAddNewState = (val) => {
  return val == EditState.NEW
}


const jsonCopy = (val) => {
    return JSON.parse(JSON.stringify(val))
}

// filter an object properties based on predicate function
const filterObject = (obj, predicate) => {
  if(!obj.__proto__ || obj.__proto__.constructor.name !== 'Object'){
    throw new Error("The obj provided should be an Object")
  }

  let newObj = {}
  for(let prop in obj){
    if(Object.prototype.hasOwnProperty.call(obj, prop) && predicate(obj[prop], prop, obj)){
      newObj[prop] = obj[prop]
    }
  }

  return newObj
}

// get category tree with nested items in children array [ {name, id,..., children:[{name, id, children: [...]}]}]
const categoriesTreeAssamble = (categories, item = {}) => {
  item.children = categoryChildren(categories, item)

  if(item.children.length){
    item.children.map(e => {
      e.level = item.level ? item.level : 0
      categoriesTreeAssamble(categories, e)
    })
  }

  return item
}

// filter & sort category children
const categoryChildren = (categories, cat = {}) => {
  let catArr = categories.filter(e => e.parent == cat.id)
  catArr.sort((a, b) => a.order - b.order)
  return catArr
}

const deleteObjField = (obj, field, deep = true) => {
  if(!field || !obj) return obj
  if(!(obj.__proto__ && obj.__proto__.constructor.name === 'Object') && !Array.isArray(obj)){ // if not obj or array, return it
    return obj
  }

  if(Array.isArray(obj)){
    return obj.map(e => deleteObjField(e, field, deep))
  }

  let newObj = {}
  for(let prop in obj){
    if(Object.prototype.hasOwnProperty.call(obj, prop) && field != prop){
      newObj[prop] = deep ? deleteObjField(obj[prop], field, deep) : obj[prop]
    }
  }

  return newObj
}

const parseDate = (date, dateFormat = "YYYY-MM-DD") => {
  return date && moment(date).isValid() ? moment(date).format(dateFormat) : null
}

const parseObjPropAsDate = (obj, fieldsArr, dateFormat) => {
  if(!fieldsArr || !Array.isArray(fieldsArr)){
    return obj
  }
  fieldsArr.map(e => {
    if(obj[e]){
      obj[e] = parseDate(obj[e], dateFormat)
    }
  })

  return obj
}

const safeParseFloat = (val) => {
  return Number.isNaN(val) ? null : +val
}

// for array containing primitive values
const sameArrayContent = function (a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length == b.length ? a.every((item, i) => { return item == b[i] }) : false
}

const isAnObject = (obj) => {
  return obj && obj.__proto__ &&  obj.__proto__.constructor.name === 'Object'
}

// return the single property of an object, null otherwise
const objectSingleProperty = (obj) => {
  if(!isAnObject(obj)) return
  let keys = Object.keys(obj)
  if(keys.length != 1) {
    console.log("Error: The Object provided should have a single property")
    return
  }
  return obj[keys[0]]
}


export {
  bus,
  EditState,
  isEditState,
  isAddNewState,
  jsonCopy,
  filterObject,
  categoriesTreeAssamble,
  deleteObjField,
  parseDate,
  parseObjPropAsDate,
  safeParseFloat,
  sameArrayContent,
  isAnObject,
  objectSingleProperty,
}
