import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database';
import Product from './Product';

class Upsell extends Model {
  declare id: number;
  declare productId: number;
  declare upsellProductId: number;
}

Upsell.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    upsellProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Upsell',
  }
);

export default Upsell;
