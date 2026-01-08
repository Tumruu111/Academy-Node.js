export const movieTypeDefs = `
  type Award {
     wins: Int
     nominations: Int
     text: String
  }

  type Movie {
    _id: ID
    title: String
    author: String
    awards: [Award]
   
  }
  type User {
    name: String
    email: String 
    password: String
  }

  input MovieInput {
    title: String
    directors: String
    year: Int
    fullplot: String
    poster: String
    runtime: Int
    plot: String
  }
  
  input loginInput {
    email: String 
    password: String
  }
  
  input signupInput {
  name: String 
  email: String
  password: String
  }
  input deleteMovieInput {
  title: String
  }

`;

export const movieQueryTypeDefs = `
  movie(_id: ID): Movie
  movies(title:String,page: Int!): [Movie]
`;

export const movieMutationTypeDefs = `
 addMovie(input: MovieInput): String
`;
export const userQueryTypeDefs = ``;
export const userMutationTypedefs = `
  signup(input: signupInput): User
  login(input: loginInput): String
  userAddMovie(input: MovieInput): String
  userDeleteMovie(input: deleteMovieInput): String
`;
