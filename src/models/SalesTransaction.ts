import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/database';

class SalesTransaction extends Model {
  declare id: number;
  declare details: any;
  declare totalAmount: number;
}

SalesTransaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'SalesTransaction',
  }
);

export default SalesTransaction;
