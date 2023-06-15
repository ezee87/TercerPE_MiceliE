import * as service from "../services/products.services.js";

/* export const getAllProductsCtr = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getAllProductsService(page, limit);
    // res.json(response);
    const nextPage = response.hasNextPage
      ? `http://localhost:8080/products?page=${response.nextPage}`
      : null;
    const prevPage = response.hasPrevPage
      ? `http://localhost:8080/products?page=${response.prevPage}`
      : null;
    res.json({
      results: response.docs,
      info: {
        count: response.totalDocs,
        pages: response.totalPages,
        next: nextPage,
        prev: prevPage,
      },
    });
  } catch (error) {
    next(error);
  }
};
 */

export const getAllProductsCtr = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getAllProductsService(page, limit);
    const products = response.docs; // Obtener los productos de la respuesta

    return products; // Devolver los productos en lugar de enviar una respuesta JSON
  } catch (error) {
    next(error);
  }
};

export const addProductToCartCtr = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;
    const newProduct = await service.addProductToCartService(cartId, prodId);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getByIdProduct(id);
    if (!item) throw new Error("Pet not found!");

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createProductCtr = async (req, res, next) => {
  try {
    const prod = { ...req.body };
    const newProduct = await service.createProductService(prod);
    if (!newProduct) throw new Error("Validation error");
    else res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProductCtr = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    const { name, description, price, stock } = req.body;
    await service.getProductByIdService(prodId);
    const docUpd = await service.updateProductService(prodId, {
      name,
      description,
      price,
      stock,
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};
export const deleteProductCtr = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    await service.deleteProductService(prodId);
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const delProductCartController = async (req, res, next) => {
  try {
    const { cartId, prodId } = req.params;
    const product = await service.deleteProductCartService(cartId, prodId);
    if (product) {
      res.status(201).send({
        status: "success",
        mensaje: "Product successfully deleted to cart!",
        payload: product,
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje:
          "The product or cart you are searching for could not be found!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const filtrarPorCategorias = async (req, res, next) => {
  try {
    const { category } = req.query
    const response = await service.filtrarPorCategorias(category);
    res.json(response);
  } catch (error) {
    next(error)
  }
}

export const ordenarPorPrecios = async (req, res, next) => {
  try {
    const response = await service.ordenarPorPrecios();
    res.json(response);
  } catch (error) {
    next(error)
  }
}