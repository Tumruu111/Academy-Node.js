import {
  movieTypeDefs,
  movieQueryTypeDefs,
  movieMutationTypeDefs,
  userQueryTypeDefs,
  userMutationTypedefs,
} from "./movies/graphql/schema.ts";
import { movieQueries, userQueries } from "./movies/graphql/queries.ts";
import { movieMutations, userMutations } from "./movies/graphql/mutations.ts";

export const typeDefs = `
  ${movieTypeDefs}

  type Query {
    ${movieQueryTypeDefs}
    ${userQueryTypeDefs}
  }

  type Mutation {
    ${movieMutationTypeDefs}
    ${userMutationTypedefs}
  }
`;

export const resolvers = {
  Query: { ...movieQueries, ...userQueries },
  Mutation: {
    ...movieMutations,
    ...userMutations,
  },
};
