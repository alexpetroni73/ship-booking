const typeDef = `

  extend type Query {
    paginatedSearchCruises(args: JSON): PaginatedSearchCruise!

  }


  type SearchCruiseResult {
    ship: ShipPreview
    cruises:[CruisePreview!]!
  }

  type PaginatedSearchCruise {
    total: Int
    items: [SearchCruiseResult!]!
  }

`
module.exports = typeDef
