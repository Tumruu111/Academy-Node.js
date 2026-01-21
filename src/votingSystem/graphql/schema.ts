export const pollTypeDefs = `
scalar Date

  type Poll {
    _id: ID
    options: [String]
    createdAt: Date
    updatedAt: Date
  }

  type User {
    name: String
    email: String 
    password: String
    role: Int
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
    role: Int
  }

  input createPollInput {
    poll: String
    options: [String]
  }

  input voteInput {
    answer: String
    poll_id: String
    user_id: String
  }
  
  input adminLogin {
    email: String
    password: String  
  }

  type Votes {
    answer: String
    count: Int
  }
`;

export const userMutationTypeDefs = `
    signup(input: signupInput): User
    login(input: loginInput): String
    adminLogin(input: adminLogin): String

`;

export const pollMutationTypeDefs = `
    createPoll(input: createPollInput): Poll
`;
export const voteMutationsTypeDefs = `
    userVote(input: voteInput): Vote
`;
export const pollQueriesTypeDefs = `
    allPolls: [Poll]
    votes(pollId:String): [Votes]
`;
