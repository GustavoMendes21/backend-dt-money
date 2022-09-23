import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnPasswordResetTokenAndPasswordResetExpires1660845708066
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "passwordResetToken",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "passwordResetExpires",
        type: "timestamp",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", [
      "passwordResetToken",
      "passwordResetExpires",
    ]);
  }
}
