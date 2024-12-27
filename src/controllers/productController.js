const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Product
exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, userId: req.user.id },
  });
  res.json(product);
};

// Read Products
exports.getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, description, price },
  });
  res.json(product);
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id: Number(id) } });
  res.json({ message: "Product deleted" });
};
