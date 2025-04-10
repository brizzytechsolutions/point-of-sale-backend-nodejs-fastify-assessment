import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database';

class Product extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare description: string;
  declare quantity: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

export default Product;
