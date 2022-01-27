const { hotelMutations } = require("./hotel/mutations");
const { hotelQueries } = require("./hotel/queries");
const { userQueries } = require("./user/queries");

const resolvers = {
  Query: {
    ...hotelQueries,
    ...userQueries,
  },
  Mutation: {
    ...hotelMutations,
  },
};

exports.resolvers = resolvers;
