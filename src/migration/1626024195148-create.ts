import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcryptjs';

export class create1626024195148 implements MigrationInterface {
  name = 'create1626024195148';
  ADMIN = {
    name: 'admin',
    login: 'admin',
    password: bcrypt.hashSync('admin', 10),
  };

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text, "login" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "boardColumns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" integer NOT NULL, "title" text NOT NULL, "boardIdId" uuid, CONSTRAINT "PK_16bfee3c7205bbd8fb8103c6022" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "boardId" uuid, "order" integer NOT NULL, "description" text NOT NULL, "userId" uuid, "columnId" text, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "boardColumns" ADD CONSTRAINT "FK_f43a8b1147d375455ec2114ef0c" FOREIGN KEY ("boardIdId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `INSERT INTO public."user"("name", login, "password")VALUES('${this.ADMIN.name}', '${this.ADMIN.login}', '${this.ADMIN.password}');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`
    );
    await queryRunner.query(
      `ALTER TABLE "boardColumns" DROP CONSTRAINT "FK_f43a8b1147d375455ec2114ef0c"`
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "boardColumns"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
