import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionsTable1663979916485
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "userId",
            type: "uuid",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "value",
            type: "numeric",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "transactionDate",
            type: "date",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
