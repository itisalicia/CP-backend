import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import CountryResolver from "./resolvers/CountryResolver";

async function startServer() {
    await dataSource.initialize();
    const schema = await buildSchema({
        resolvers: [CountryResolver]
    });

    const apolloServer = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: 4000 },
    });

    console.log(" 🚀 🎉 Server started on " + url );
}

startServer();