import {
  pollMutationTypeDefs,
  pollQueriesTypeDefs,
  pollTypeDefs,
  userMutationTypeDefs,
  voteMutationsTypeDefs,
} from "./votingSystem/graphql/schema.ts";
import {
  userMutations,
  pollMutations,
  voteMutations,
} from "./votingSystem/graphql/mutations.ts";
import { gql } from "graphql-tag";
import { pollQueries } from "./votingSystem/graphql/queries.ts";

export const typeDefs = gql`
    ${pollTypeDefs}

 type Query {
    ${pollQueriesTypeDefs}
 }

  type Mutation {
    ${userMutationTypeDefs}
    ${pollMutationTypeDefs}
    ${voteMutationsTypeDefs}
  }
`;

export const resolvers = {
  Mutation: {
    ...userMutations,
    ...pollMutations,
    ...voteMutations,
  },
  Query: {
    ...pollQueries,
  },
};
