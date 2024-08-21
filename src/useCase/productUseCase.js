import { ProductEntity } from "../entity/productEntity.js";

export class ProductUseCase {
  constructor({ repository }) {
    this.repository = repository;
  }
  async getProducts() {
    const products = await this.repository.getProducts();
    return products;
  }

  async getProduct(id) {
    const product = await this.repository.getProduct(id);
    return product;
  }
  async saveProduct({ product }) {
    const { name, description, price, quantity } = product;
    if (price < 0 || quantity < 0) {
      throw new Error("Price and quantity must be non-negative");
    }
    const newProduct = new ProductEntity(name, description, price, quantity);
    const result = await this.repository.saveProduct(newProduct);
    return result;
  }
  async updateProduct({ id, changes }) {
    if (changes.price < 0 || changes.quantity < 0) {
      throw new Error("Price and quantity must be non-negative");
    }
    const product = await this.repository.updateProduct(id, changes);
    return product;
  }
  async deleteProduct(id) {
    const result = await this.repository.deleteProduct(id);
    return result;
  }
}
