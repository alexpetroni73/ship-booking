const { Option } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const option = async function (name) {
  return Option.find({name: name})
}

const options = async function (nameArr) {
  return Option.find({'name': { $in: nameArr }})
}


const createOption = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provnameed fields
  await utils.checkUniqueFieldValue(Option, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Option, 'slug', slugSeed)

  return Option.create(input)
}

const updateOption = async function (name, input) {
  // check for non-empty & unique field values if provnameed
  const uniqueFieldsProvnameed = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvnameed.length){
    await Promise.all(uniqueFieldsProvnameed.map(e => utils.checkUniqueFieldValue(Option, e, input[e], name)))
  }

  return Option.findByIdAndUpdate(name, input, {new: true})
}

const deleteOption = async function (name) {
  await Option.findByIdAndRemove(name)
  return name
}

const deleteOptions = async function (nameArr) {
  let attArr = await Option.find({ _name: {$in: nameArr }})
  await Option.deleteMany({ _name: {$in: nameArr }})
  return nameArr
}




module.exports = {
  option,
  options,

  createOption,
  updateOption,
  deleteOption,
  deleteOptions,

}
