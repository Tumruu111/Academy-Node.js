import {
  movieTypeDefs,
  movieQueryTypeDefs,
  movieMutationTypeDefs,
  userQueryTypeDefs,
  userMutationTypedefs,
  commentQueryTypeDefs,
  commentMutationTypeDefs,
} from "./movies/graphql/schema.ts";
import { movieQueries } from "./movies/graphql/queries.ts";
import {
  movieMutations,
  userMutations,
  commentMutations,
} from "./movies/graphql/mutations.ts";

export const typeDefs = `
  ${movieTypeDefs}

  type Query {
    ${movieQueryTypeDefs}
    ${userQueryTypeDefs}
    ${commentQueryTypeDefs}
  }

  type Mutation {
    ${movieMutationTypeDefs}
    ${userMutationTypedefs}
    ${commentMutationTypeDefs}
  }
`;

export const resolvers = {
  Query: { ...movieQueries },
  Mutation: {
    ...movieMutations,
    ...userMutations,
    ...commentMutations,
  },
};
