const { ApolloError } = require("apollo-server-errors");

exports = class Error extends ApolloError {
  constructor(message: string) {
    super(message, "MY_ERROR_CODE");

    Object.defineProperty(this, "name", { value: "MyError" });
  }
};
