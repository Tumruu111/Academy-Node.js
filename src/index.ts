import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs, resolvers } from "./apolloServer.ts";
import jwt from "jsonwebtoken";
import { User } from "./votingSystem/db/models.ts";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

mongoose
  .connect(
    "mongodb+srv://tumruu1999_db_user:PEyXWQSACCdI8uB9@votingsystem.cfwkemc.mongodb.net/VotingSystem",
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

export interface IContext {
  user: {
    name: String;
    role: Number;
  };
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer<IContext>(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";

    let context: any = {};

    try {
      const decoded: any = jwt.verify(authHeader, SECRET_KEY);

      const userData = await User.findOne({
        email: decoded.email,
        role: decoded.role,
      });
      if (userData) {
        context.user = userData;
      }
    } catch (error) {
      return context;
    }
    return context;
  },
});
console.log(`🚀  Server ready at: ${url}`);
