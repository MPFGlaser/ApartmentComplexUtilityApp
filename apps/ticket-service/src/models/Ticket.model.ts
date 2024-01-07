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
export class Ticket extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Validate({ notEmpty: true })
  @Column
  creator: string;

  @Validate({ notEmpty: true })
  @Column
  location: string;

  @Validate({ notEmpty: true })
  @Column
  title: string;

  @Validate({ notEmpty: true })
  @Column
  description: string;

  @Validate({ notEmpty: true })
  @Column({
    type: DataType.ENUM(
      'open',
      'pending',
      'inprogress',
      'completed',
      'wontfix'
    ),
    defaultValue: 'open',
  })
  status: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt?: Date;
}
