import config from "../../config/config";
import { Client, Account, ID } from "appwrite";

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
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new Error("createAccount error", error);
    }
  }

  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userLogin;
    } catch (error) {
      console.log("userLogin error", error);
    }
  }

  async getUserAccount() {
    try {
      const getUser = await this.account.get();
      return getUser;
    } catch (error) {
      console.log("getUserAccount error", error);
    }
    return null;
  }

  async logout() {
    try {
      const userLogout = await this.account.deleteSessions();
      return userLogout;
    } catch (error) {
      console.log("logout error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
