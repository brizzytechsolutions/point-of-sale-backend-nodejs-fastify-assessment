import { FastifyReply, FastifyRequest } from 'fastify';
import Upsell from '../models/Upsell';
import Product from '../models/Product';

const addUpsell = async (request: FastifyRequest, reply: FastifyReply) => {
  const { productId, upsellProductId } = request.body as { productId: number; upsellProductId: number };

  try {
    const product = await Product.findByPk(productId);
    const upsellProduct = await Product.findByPk(upsellProductId);
    if (!product || !upsellProduct) {
      return reply.code(404).send({ error: 'One or both products not found' });
    }
    const upsell = await Upsell.create({ productId, upsellProductId });
    return reply.code(201).send(upsell);
  } catch (error) {
    console.error('Error adding upsell:', error);
    return reply.code(500).send({ error: 'Error adding upsell' });
  }
};

const getUpsellProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const { productId } = request.params as { productId: string };

  try {
    const upsells = await Upsell.findAll({ where: { productId } });
    return reply.send(upsells);
  } catch (error) {
    console.error('Error retrieving upsell products:', error);
    return reply.code(500).send({ error: 'Error retrieving upsell products' });
  }
};

const removeUpsell = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const upsell = await Upsell.findByPk(id);
    if (!upsell) {
      return reply.code(404).send({ error: 'Upsell record not found' });
    }
    await upsell.destroy();
    return reply.send({ message: 'Upsell removed successfully' });
  } catch (error) {
    console.error('Error removing upsell:', error);
    return reply.code(500).send({ error: 'Error removing upsell' });
  }
};

const updateUpsell = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { productId, upsellProductId } = request.body as {
    productId?: number;
    upsellProductId?: number;
  };

  try {
    const upsell = await Upsell.findByPk(id);
    if (!upsell) {
      return reply.code(404).send({ error: 'Upsell not found' });
    }

    if (productId !== undefined) upsell.productId = productId;
    if (upsellProductId !== undefined) upsell.upsellProductId = upsellProductId;

    await upsell.save();
    return reply.send(upsell);
  } catch (error) {
    console.error('Error updating upsell:', error);
    return reply.code(500).send({ error: 'Error updating upsell record' });
  }
};
  
const getAllUpsells = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const upsells = await Upsell.findAll();
      return reply.send(upsells);
    } catch (error) {
      console.error('Error fetching upsell records:', error);
      return reply.code(500).send({ error: 'Error fetching upsell records' });
    }
  };
  
const getUpsellById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
  
    try {
      const upsell = await Upsell.findByPk(id);
      if (!upsell) {
        return reply.code(404).send({ error: 'Upsell not found' });
      }
      return reply.send(upsell);
    } catch (error) {
      console.error('Error fetching upsell by ID:', error);
      return reply.code(500).send({ error: 'Error fetching upsell record' });
    }
  };  

export { addUpsell, getUpsellProducts, removeUpsell, updateUpsell, getUpsellById, getAllUpsells };