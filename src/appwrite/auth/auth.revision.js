import { Client, Account, ID } from "appwrite";
import config from "../../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpointURL)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const createUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (createUser) {
        return this.login({ email, password });
      } else {
        return createUser;
      }
    } catch (error) {
      console.error("createAccount error", error);
      throw error;
    }
  }

  async login() {
    try {
      const userLogin = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userLogin;
    } catch (error) {
      console.error("user login error", error);
      throw error;
    }
  }

  async getUserStatus() {
    try {
      const getUser = await this.account.get();
      return getUser;
    } catch (error) {
      console.error("getUserStatus error", error);
    }
    return null;
  }

  async logout() {
    try {
      const userLogout = await this.account.deleteSessions();
      return userLogout;
    } catch (error) {
      console.error("user Logout error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
