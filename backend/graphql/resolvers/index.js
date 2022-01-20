const { hotelMutations } = require("./hotel/mutations");
const { hotelQueries } = require("./hotel/queries");

const resolvers = {
  Query: {
    ...hotelQueries,
  },
  Mutation: {
    ...hotelMutations,
  },
};

exports.resolvers = resolvers;
