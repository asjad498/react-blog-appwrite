import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const useAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (useAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return useAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser :: error", error);
      // throw error;
    }
    return null;
  }

  // async getCurrentUser() {
  //   try {
  //     return await this.account.get();
  //   } catch (error) {
  //     if (error.message.includes("missing scope (account)")) {
  //       // No logged-in user, return null
  //       return null;
  //     } else {
  //       console.log("Appwrite Service :: getCurrentUser :: error", error);
  //       throw error; // For other errors
  //     }
  //   }
  // }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service :: Logout :: error", error);
    }
  }
  // async logout() {
  //   try {
  //     const user = await this.getCurrentUser();
  //     if (user) {
  //       await this.account.deleteSessions();
  //       console.log("User logged out successfully.");
  //     } else {
  //       console.log("No active session to log out from.");
  //     }
  //   } catch (error) {
  //     console.log("Appwrite Service :: Logout :: error", error);
  //   }
  // }
}

const authService = new AuthService();

export default authService;
