export class ProductController {
  constructor({ useCase }) {
    this.useCase = useCase;
  }

  getProducts = async (req, res) => {
    try {
      const products = await this.useCase.getProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.log("Error in getProducts controller:", error);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  };

  getProduct = async (req, res) => {
    try {
      const product = await this.useCase.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.log("Error in getProduct controller:", error);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  };

  saveProduct = async (req, res) => {
    try {
      const product = await this.useCase.saveProduct({ product: req.body });
      return res.status(201).json(product); 
    } catch (error) {
      console.log("Error in saveProduct controller:", error);
      return res.status(400).json({ message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const product = await this.useCase.updateProduct({
        id: req.params.id,
        changes: req.body,
      });
      return res.status(200).json(product);
    } catch (error) {
      console.log("Error in updateProduct controller:", error);
      return res.status(400).json({ message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const result = await this.useCase.deleteProduct(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      console.log("Error in deleteProduct controller:", error);
      return res.status(404).json({ message: "Failed to delete product" });
    }
  };
}
