import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      return userAccount ? this.login({ email, password }) : null;
    } catch (error) {
      console.error("AuthService :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("AuthService :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.warn("AuthService :: getCurrentUser :: No active session", error.message);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("AuthService :: logout :: User logged out successfully");
    } catch (error) {
      console.error("AuthService :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
