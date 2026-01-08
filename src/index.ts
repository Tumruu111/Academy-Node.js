import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs, resolvers } from "./apolloServer.ts";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

mongoose
  .connect(
    "mongodb+srv://tumruu1999_db_user:lB9ey0anCeEPUjWE@cluster0.pk5bjjn.mongodb.net/sample_mflix"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

export interface IContext {
  user: {
    firstname: string;
  };
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return "authorization alga";
    }
    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      return "token aaa";
    }
    const SECRET_KEY = process.env.JWT_SECRET || "secret";

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return "Invalid token";

      console.log(decoded, "decoded");
      // req.user = decoded;
      return {
        token,
        user: {
          firstname: "bat",
        },
      };
    });
  },
});

console.log(`🚀  Server ready at: ${url}`);
