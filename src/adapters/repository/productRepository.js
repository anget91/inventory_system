import { ProductModel } from "../model/productModel.js";

export class ProductRepository {
  async getProducts() {
    try {
      const products = await ProductModel.findAll();
      return products;
    } catch (error) {
      console.log("Error fetching products:", error);
      throw new Error("Could not fecth products");
    }
  }

  async getProduct(id) {
    try {
      const product = await   ProductModel.findByPk(id);
      return product;
    } catch (error) {
      console.error("Error in getProduct:", error);
      throw new Error("Could not fetch product");
    }
  }

  async saveProduct(product) {
    try {
      const newProduct = ProductModel.create({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      });
      return newProduct;
    } catch (error) {
      console.error("Error saving product:", error);
      throw new Error("Could not save product");
    }
  }

  async updateProduct(id, changes) {
    try {
      const product = await ProductModel.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await product.update(changes);
      return product;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Could not update product");
    }
  }

  async deleteProduct(id) {
    try {
      const product = await ProductModel.findByPk(id);
      if (!product) {
        throw new Error("Product not found");
      }
      await product.destroy();
      return { message: "Product deleted" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Could not delete product");
    }
  }
}
