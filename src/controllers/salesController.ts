import { FastifyReply, FastifyRequest } from 'fastify';
import SalesTransaction from '../models/SalesTransaction';

const createSale = async (request: FastifyRequest, reply: FastifyReply) => {
  const { details, totalAmount } = request.body as { details: any; totalAmount: number };

  try {
    const sale = await SalesTransaction.create({ details, totalAmount });
    return reply.code(201).send(sale);
  } catch (error) {
    console.error('Error creating sale transaction:', error);
    return reply.code(500).send({ error: 'Error creating sale transaction' });
  }
};

const getSaleById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const sale = await SalesTransaction.findByPk(id);
    if (!sale) {
      return reply.code(404).send({ error: 'Sale transaction not found' });
    }
    return reply.send(sale);
  } catch (error) {
    console.error('Error retrieving sale transaction:', error);
    return reply.code(500).send({ error: 'Error retrieving sale transaction' });
  }
};

const updateSale = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const { details, totalAmount } = request.body as { 
      details: any; 
      totalAmount: number 
    };
  
    try {
      const sale = await SalesTransaction.findByPk(id);
      if (!sale) {
        return reply.code(404).send({ error: 'Sale transaction not found' });
      }
  
      sale.details = details;
      sale.totalAmount = totalAmount;
      await sale.save();
  
      return reply.send(sale);
    } catch (error) {
      console.error('Error updating sale transaction:', error);
      return reply.code(500).send({ error: 'Error updating sale transaction' });
    }
  };
  
  const getAllSales = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const sales = await SalesTransaction.findAll({
        order: [['createdAt', 'DESC']]
      });
      return reply.send(sales);
    } catch (error) {
      console.error('Error retrieving all sales:', error);
      return reply.code(500).send({ error: 'Error retrieving all sales' });
    }
  };
  
  const deleteSale = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
  
    try {
      const sale = await SalesTransaction.findByPk(id);
      if (!sale) {
        return reply.code(404).send({ error: 'Sale transaction not found' });
      }
  
      await sale.destroy();
      return reply.send({ message: 'Sale transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting sale transaction:', error);
      return reply.code(500).send({ error: 'Error deleting sale transaction' });
    }
  };

  export { deleteSale, getAllSales, updateSale, getSaleById, createSale };