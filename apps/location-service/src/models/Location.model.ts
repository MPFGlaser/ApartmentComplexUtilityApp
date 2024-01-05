import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  Validate,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Location extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Validate({ notEmpty: true })
  @Column
  owner: string;

  @Validate({ notEmpty: true })
  @Column
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt?: Date;
}
