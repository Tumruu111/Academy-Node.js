import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose, { model } from "mongoose";
import { typeDefs, resolvers } from "./apolloServer.ts";
import jwt from "jsonwebtoken";
import { Users } from "./movies/db/models.ts";

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
  user?: {
    name: String;
    id: String;
  };
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer<IContext>(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return {};

    try {
      const decoded = jwt.verify(authHeader, SECRET_KEY) as { email: string };

      const userData = await Users.findOne({ email: decoded.email });

      if (!userData) return {};

      return {
        user: {
          name: userData.name,
          id: userData._id.toString(),
        },
      };
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  },
});
console.log(`🚀  Server ready at: ${url}`);
