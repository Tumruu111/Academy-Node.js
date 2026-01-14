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

  input createPollInput {
    poll: String
    options: [String]
  }

  input voteInput {
    answer: String
    poll_id: String
    user_id: String
  }
`;

export const userMutationTypeDefs = `
    signup(input: signupInput): User
    login(input: loginInput): String
`;

export const pollMutationTypeDefs = `
    createPoll(input: createPollInput): Poll
`;
export const voteMutationsTypeDefs = `
    userVote(input: voteInput): Vote
`;
export const pollQueriesTypeDefs = `
    allPolls(user_id): Poll
`;
