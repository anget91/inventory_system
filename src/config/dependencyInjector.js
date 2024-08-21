import { ProductController } from "../adapters/controller/productController.js";
import { ProductRepository } from "../adapters/repository/productRepository.js";
import { productRoutes } from "../adapters/routes/productRoutes.js";
import { ProductUseCase } from "../useCase/productUseCase.js";

export const configureDependencies = (app) => {
  const productRepository = new ProductRepository();
  const productUseCase = new ProductUseCase({ repository: productRepository });
  const productController = new ProductController({ useCase: productUseCase });

  app.use(productRoutes({ controller: productController }));
};
