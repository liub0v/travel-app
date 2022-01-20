const { ApolloServer } = require("apollo-server");
const { schema } = require("./schema"); // We imported this

const config = require("config");

const start = async () => {
  const apollo = new ApolloServer({
    schema,
    playground: config.get("ENV") === "development",
    // subscriptions: {
    //   path: "/subscriptions/",
    // },
    // dataSources: () => ({
    //   CBE_API: new CBE_API(),
    // }),
    // context: ({ req }) => ({
    //   token: req.headers.authorization,
    // }),
  });
  const { url, subscriptionsUrl } = await apollo.listen({
    port: config.get("GQL_PORT"),
  });

  console.log(`🚀 GQL server ready at ${url} on ${config.get("ENV")}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
};

start();
