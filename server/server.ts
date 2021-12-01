import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { getBuiltMesh } from "./.mesh";
import { resolvers } from "@generated/type-graphql";
import { stitchSchemas } from "@graphql-tools/stitch";
import { buildSchemaSync } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/prisma";

const isProd = process.env.NODE_ENV === "production";
let apolloServer: ApolloServer;

interface Context {
  prisma: PrismaClient;
}

export default async function createApolloServer() {
  if (apolloServer) return apolloServer;

  const { schema } = await getBuiltMesh();

  const executableSchema = buildSchemaSync({
    resolvers,
    validate: false,
  });

  // build the combined schema
  const gatewaySchema = stitchSchemas({
    subschemas: [executableSchema, schema],
  });

  apolloServer = new ApolloServer({
    schema: gatewaySchema,
    introspection: !isProd,
    // playground: !isProd,
    context: (): Context => ({ prisma: prisma() }),
  });

  return apolloServer;
}
