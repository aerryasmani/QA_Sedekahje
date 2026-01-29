// helpers/apiHelpers.js
class ApiHelpers {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://api.example.com';
  }

  async getUser(userId) {
    return await this.request.get(`${this.baseURL}/users/${userId}`);
  }

  async createUser(userData) {
    return await this.request.post(`${this.baseURL}/users`, {
      data: userData
    });
  }
}

module.exports = { ApiHelpers };