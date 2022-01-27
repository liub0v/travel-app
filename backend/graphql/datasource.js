const { RESTDataSource } = require("apollo-datasource-rest");

module.exports = class TravelAppAPI extends RESTDataSource {
  baseURL = "http://localhost:3000/api";

  async didReceiveResponse(response, _request) {
    const defaultReturnValue = await super.didReceiveResponse(
      response,
      _request
    );

    if (_request.url.endsWith("/auth")) {
      return {
        user: defaultReturnValue,
        token: response.headers.get("x-auth-token"),
      };
    }
    return defaultReturnValue;
  }

  willSendRequest(request) {
    request.headers.set("x-auth-token", this.context.token);
  }

  async login({ email, password }) {
    return await this.post("/auth", {
      email,
      password,
    });
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get("movies", {
      per_page: limit,
      order_by: "most_viewed",
    });
    return data.results;
  }
};
