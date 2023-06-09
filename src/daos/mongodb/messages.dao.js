import { MessagesModel } from "./models/messages.model.js";

export default class MessagesDaoMongoDB {
  async getAllMessages() {
    try {
      const response = await MessagesModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getMessageById(id) {
    try {
      const response = await MessagesModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(obj) {
    try {
      const response = await MessagesModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateMessage(id, obj) {
    try {
      await MessagesModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMessage(id) {
    try {
      const response = await MessagesModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}