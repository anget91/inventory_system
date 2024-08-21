import { Router } from "express";

export const productRoutes = ({ controller }) => {
  const BASE_URL = "/api/products";

  const router = Router();

  router.get(BASE_URL, controller.getProducts);
  router.get(`${BASE_URL}/:id`, controller.getProduct);
  router.post(BASE_URL,controller.saveProduct);
  router.patch(`${BASE_URL}/:id`, controller.updateProduct);
  router.delete(`${BASE_URL}/:id`, controller.deleteProduct);


  return router;
};
