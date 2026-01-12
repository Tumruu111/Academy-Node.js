import {
  movieTypeDefs,
  movieQueryTypeDefs,
  movieMutationTypeDefs,
  userMutationTypedefs,
  commentMutationTypeDefs,
} from "./movies/graphql/schema.ts";
import { movieQueries } from "./movies/graphql/queries.ts";
import {
  movieMutations,
  userMutations,
  commentMutations,
} from "./movies/graphql/mutations.ts";
import { gql } from "graphql-tag";

export const typeDefs = gql`
  ${movieTypeDefs}

  type Query
  type Mutation

  ${movieQueryTypeDefs}

  ${movieMutationTypeDefs}
  ${userMutationTypedefs}
  ${commentMutationTypeDefs}
`;

export const resolvers = {
  Query: { ...movieQueries },
  Mutation: {
    ...movieMutations,
    ...userMutations,
    ...commentMutations,
  },
};
