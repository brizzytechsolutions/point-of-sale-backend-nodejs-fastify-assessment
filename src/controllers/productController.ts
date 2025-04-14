import { FastifyReply, FastifyRequest } from 'fastify';
import Product from '../models/Product';

const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, price, description, quantity } = request.body as {
    name: string;
    price: number;
    description?: string;
    quantity?: number;
  };

  try {
    const product = await Product.create({
      name,
      price,
      description,
      quantity: quantity ?? 0,
    });
    return reply.code(201).send(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return reply.code(500).send({ error: 'Error creating product' });
  }
};

const getAllProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const products = await Product.findAll();
    return reply.send(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    return reply.code(500).send({ error: 'Error retrieving products' });
  }
};

  const getProductById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
  
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return reply.code(404).send({ error: 'Product not found' });
      }
      return reply.send(product);
    } catch (error) {
      console.error('Error retrieving product:', error);
      return reply.code(500).send({ 
        error: 'Error retrieving product',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  };
  
const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { name, price, description, quantity } = request.body as {
    name?: string;
    price?: number;
    description?: string;
    quantity?: number;
  };

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (quantity !== undefined) product.quantity = quantity;

    await product.save();
    return reply.send(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return reply.code(500).send({ error: 'Error updating product' });
  }
};

const deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }
    await product.destroy();
    return reply.send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return reply.code(500).send({ error: 'Error deleting product' });
  }
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };