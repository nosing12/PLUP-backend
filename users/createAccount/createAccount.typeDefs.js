import { gql } from "apollo-server-express";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): createAccountResult
  }
`;
