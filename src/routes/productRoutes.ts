import { FastifyInstance } from 'fastify';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController';

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/', createProduct);
  fastify.get('/', getAllProducts);
  fastify.get('/:id', getProductById); 
  fastify.put('/:id', updateProduct);
  fastify.delete('/:id', deleteProduct);
}
