import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcryptjs';

export class CreateAdmin1625783931436 implements MigrationInterface {
  ADMIN = {
    name: 'admin',
    login: 'admin',
    password: bcrypt.hashSync('admin', 10),
  };

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public."user"("name", login, "password")VALUES('${this.ADMIN.name}', '${this.ADMIN.login}', '${this.ADMIN.password}');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
