import shipSpecifications from '@/data/ship-specifications'
import shipSafety from '@/data/ship-safety'
import shipEntertainment from '@/data/ship-entertainment'
// ship default values
export default {
  name: '',
  slug: '',
  excerpt: '',
  description: '',
  image: '',
  gallery: [],
  shipFeatures: [],
  shipFeaturesText: '',
  foodAndDrinksFeatures: [],
  foodAndDrinksFeaturesText: '',
  divingFeatures: [],
  divingFeaturesText: '',
  gearRental: '',
  gearRentalText: '',
  shipLayout: '',
  shipLayoutText: '',
  shipSpecifications: shipSpecifications,
  shipSafety: shipSafety,

  shipEntertainment: shipEntertainment,

  shipSpecificationsText: '',
  navSafetyFeatures: [],
  navSafetyFeaturesText: '',
  cabins: [],
  cabinsText: '',
}
