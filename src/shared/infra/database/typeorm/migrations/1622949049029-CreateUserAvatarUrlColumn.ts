import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateUserAvatarUrlColumn1622949049029
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar_url');
  }
}
