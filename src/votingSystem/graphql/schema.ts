export const pollTypeDefs = `
  type Poll {
    _id: ID
    question: String
  }
  type User {
    name: String
    email: String 
    password: String
  }
  type Vote {
    answer: String
    poll_id: String
    user_id: String
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
`;

export const movieQueryTypeDefs = `
 
    movie(_id: ID): Movie
    movies(title: String, page: Int!): [Movie]

`;

export const movieMutationTypeDefs = `

    addMovie(input: MovieInput): String

`;

export const userMutationTypedefs = `

    signup(input: signupInput): User
    login(input: loginInput): String
   

`;

export const commentMutationTypeDefs = `

 addComment(input: AddCommentInput): String
  removeComment(input: RemoveCommentInput): String

 
`;
