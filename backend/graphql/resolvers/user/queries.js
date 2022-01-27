const { ApolloError } = require("apollo-server");
const userQueries = {
  login: async (_, { input }, { dataSources }) => {
    try {
      return dataSources.api.login(input);
    } catch (e) {
      throw new ApolloError();
    }
  },
};

exports.userQueries = userQueries;
