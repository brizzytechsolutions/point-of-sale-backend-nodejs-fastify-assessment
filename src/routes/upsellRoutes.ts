import { FastifyInstance } from 'fastify';
import { addUpsell, getAllUpsells, getUpsellById, getUpsellProducts, removeUpsell, updateUpsell } from '../controllers/upsellController';

export default async function upsellRoutes(fastify: FastifyInstance) {
    fastify.post('/', addUpsell);
    fastify.get('/', getAllUpsells);
    fastify.get('/by-id/:id', getUpsellById);
    fastify.get('/product/:productId', getUpsellProducts);
    fastify.put('/:id', updateUpsell);
    fastify.delete('/:id', removeUpsell);
}
