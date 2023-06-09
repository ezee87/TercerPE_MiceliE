import fs from "fs";

export default class MessageManager {
    constructor() {
        this.pathFile = 'products.json';
      }
    

  async createmessage(obj) {
    try {
      const message = {
        id: (await this.#getMaxId()) + 1,
        ...obj,
      };
      const messageFile = await this.getAllmessage();
      messageFile.push(message);
      await fs.promises.writeFile(this.pathFile, JSON.stringify(messageFile));
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const messages = await this.getAllmessage();
    messages.map((message) => {
      if (message.id > maxId) maxId = message.id;
    });
    return maxId;
  }

  async getAllmessage() {
    try {
      if (fs.existsSync(this.pathFile)) {
        const messages = await fs.promises.readFile(this.pathFile, "utf8");
        const messagesJS = JSON.parse(messages);
        return messagesJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getmessageById(id) {
    const messagesFile = await this.getAllmessage();
    const message = messagesFile.find((sms) => sms.id === id);
    if (message) {
      return message;
    }
    return false;
  }

  async updatemessage(obj, id) {
    try {
      const messagesFile = await this.getAllmessage();
      const index = messagesFile.findIndex((message) => message.id === id);
      if (index === -1) {
        throw new Error(`Id ${id} not found`);
      } else {
        messagesFile[index] = { ...obj, id };
      }
      await fs.promises.writeFile(this.pathFile, JSON.stringify(messagesFile));
    } catch (error) {
      console.log(error);
    }
  }

  async deletemessage(id) {
    const messagesFile = await this.getAllmessage();
    if (messagesFile.length > 0) {
      const newArray = messagesFile.filter((m) => m.id !== id);
      await fs.promises.writeFile(this.pathFile, JSON.stringify(newArray));
    } else {
      throw new Error(`message not found`);
    }
  }

  async deletemessages() {
    if (fs.existsSync(this.pathFile)) {
      await fs.promises.unlink(this.pathFile);
    }
  }
}