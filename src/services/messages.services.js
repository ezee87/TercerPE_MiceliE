import MessagesDaoMongoDB from "../daos/mongodb/messages.dao.js";
const MessageDao = new MessagesDaoMongoDB();

export const getAllService = async () => {
    try {
        const docs = await MessageDao.getAllMessages();
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const getByIdService = async (id) => {
    try {
        const doc = await MessageDao.getMessageById(id);
        if (!doc) throw new Error("Message not found");
        else return doc;
    } catch (error) {
        console.log(error);
    }
};

export const createService = async (obj) => {
    try {
        const newProd = await MessageDao.createMessage(obj);
        if (!newProd) throw new Error("Validation Error!");
        else return newProd;
    } catch (error) {
        console.log(error);
    }
};

export const updateService = async (id, obj) => {
    try {
        const doc = await MessageDao.getMessageById(id);
        if (!doc) {
            throw new Error("Message not found");
        } else {
            const MessageUpd = await MessageDao.updateMessage(id, obj);
            return MessageUpd;
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteService = async (id) => {
    try {
        const MessageDel = await MessageDao.deleteMessage(id);
        return MessageDel;
    } catch (error) {
        console.log(error);
    }
};