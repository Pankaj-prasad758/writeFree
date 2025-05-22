import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../../config/config.js";
import { ReactReduxContext } from "react-redux";

export class DatabasesServices {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpointURL)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite :: createPost :: error", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite :: updatedPost :: error", erro);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug){
    try {
         return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )

    } catch (error) {
        console.log("Appwrite :: getPost :: error", error);
        return false
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("Appwrite :: getPosts :: error", error);
        return false
        
    }
  }

  // file upload service

  async uploadFile(file){
    try {
        return await this.storage.updateFile(
            config.appwriteBucketId,
            ID,unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite :: uploadFile :: error", error);
        return false
    }
  }

  async deleteFile (fileId){
    try {
        return await this.storage.deleteFile(
            config.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite :: deleteFile :: error", error);
        
    }
  }

  getFilePreview(fileId){
    return this.storage.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
  }
}

const databasesServices = new DatabasesServices();

export default databasesServices;
