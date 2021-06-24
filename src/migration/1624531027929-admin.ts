import bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

const ADMIN = {
  name: 'admin',
  login: 'admin',
  password: bcrypt.hashSync('admin', 10),
};

export class admin1624531027933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public."user"("name", login, "password")VALUES('${ADMIN.name}', '${ADMIN.login}', '${ADMIN.password}');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public."user" WHERE login='admin'`);
  }
}
