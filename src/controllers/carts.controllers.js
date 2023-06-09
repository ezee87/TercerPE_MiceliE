import {
    getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService,
  } from "../services/carts.services.js";
  
  export const getAllController = async (req, res, next) => {
    try {
      const docs = await getAllService();
      res.json(docs);
    } catch (error) {
      next(error);
    }
  };
  
  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await getByIdService(id);
      res.json(doc);
    } catch (error) {
      next(error);
    }
  };
  
  export const createController = async (req, res, next) => {
    try {
      const { products} = req.body;
      const newDoc = await createService({
       products,
      });
      res.json(newDoc);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { product, cantidadProduct} = req.body;
      await getByIdService(id);
      const docUpd = await updateService(id, {
        product,
        cantidadProduct
      });
      res.json(docUpd);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteController = async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteService(id);
      res.json({ message: "Cart deleted successfully!" });
    } catch (error) {
      next(error);
    }
  };