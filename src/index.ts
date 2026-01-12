import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
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
  introspection: true,
});
const { url } = await startStandaloneServer<IContext>(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";

    let context: any = {};

    try {
      const decoded: any = jwt.verify(authHeader, SECRET_KEY);

      const userData = await Users.findOne({ email: decoded.email });

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
