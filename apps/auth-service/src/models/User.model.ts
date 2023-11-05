import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
    Validate,
} from 'sequelize-typescript';

@Table({
    timestamps: true,
    paranoid: true,
})
export class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Validate({
        notEmpty: true,
    })
    @Column
    firstName: string;

    @Validate({
        notEmpty: true,
    })
    @Column
    lastName: string;

    @Unique
    @Validate({
        isEmail: true,
    })
    @Column
    email: string;

    @Validate({
        notEmpty: true,
    })
    @Column
    password: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt?: Date;
}
