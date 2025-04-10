import { FastifyInstance } from 'fastify';
import { createSale, deleteSale, getAllSales, getSaleById, updateSale } from '../controllers/salesController';

export default async function salesRoutes(fastify: FastifyInstance) {
  fastify.post('/', createSale);
  fastify.get('/', getAllSales);
  fastify.get('/:id', getSaleById);
  fastify.put('/:id', updateSale);
  fastify.delete('/:id', deleteSale);
}
