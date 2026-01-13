import {
  pollTypeDefs,
  userMutationTypedefs,
} from "./votingSystem/graphql/schema.ts";
import {
  userMutations,
  voteMutations,
} from "./votingSystem/graphql/mutations.ts";
import { gql } from "graphql-tag";

export const typeDefs = gql`
  ${pollTypeDefs}

 type Query {
    user: String
 }

  type Mutation {
    ${userMutationTypedefs}
  }
`;

export const resolvers = {
  Mutation: {
    ...userMutations,
  },
  Query: {
    user: async () => {
      return "user";
    },
  },
};
