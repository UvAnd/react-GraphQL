import { gql } from '@apollo/client'

const GET_ALL_CHARACTERS = gql`
  query Character($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
        status
        species
        location {
          name
        }
      }
  }
}`

export { GET_ALL_CHARACTERS }
