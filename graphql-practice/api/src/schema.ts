const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    createdAt: Date!
    username: String!
  }

  type Pet {
    id: ID!
    createdAt: Date!
    name: String!
    type: String!
    img: String!
    buddies: [Pet]
  }

  input PetInput {
    name: String
    type: String
  }

  type Query {
    pets(input: PetInput): [Pet]!
    pet(id: ID!): Pet
  }

  input UserInput {
    username: String!
  }

  type Mutation {
    addUser(input: UserInput!): User!
    addPet(input: PetInput!): Pet!
  }
`;

export default typeDefs;
