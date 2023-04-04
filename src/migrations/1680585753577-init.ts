import { MigrationInterface, QueryRunner } from "typeorm";

export class init1680585753577 implements MigrationInterface {
    name = 'init1680585753577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "frecuencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "frecuency" character varying NOT NULL, CONSTRAINT "PK_358a22463a5419438a0743fc15c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "unit" character varying NOT NULL, CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "resource" character varying NOT NULL, "derivative" character varying, "unit_id" uuid, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emisions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "emision" character varying NOT NULL, CONSTRAINT "PK_5f89fd2c6a3933a9512a638ff41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consumption" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "date" character varying NOT NULL, "amount" integer NOT NULL, "activity_id" uuid, CONSTRAINT "PK_90c8f17309014e5d0f244767367" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "activity_description" character varying NOT NULL, "resource_id" uuid, "frecuency_id" uuid, "emision_id" uuid, "category_id" uuid, CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resources" ADD CONSTRAINT "FK_697429a5b1fe1c12917691a5ab4" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption" ADD CONSTRAINT "FK_4407b6b95fbca4564650c25241c" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_c1d782d3994a1d638f19285ecee" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_c2c7931ab96178291f66562b38a" FOREIGN KEY ("frecuency_id") REFERENCES "frecuencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_22d99b3c407493c7b27e05da18e" FOREIGN KEY ("emision_id") REFERENCES "emisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_cf4a8062ad267056ddd5f867ac1" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_cf4a8062ad267056ddd5f867ac1"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_22d99b3c407493c7b27e05da18e"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_c2c7931ab96178291f66562b38a"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_c1d782d3994a1d638f19285ecee"`);
        await queryRunner.query(`ALTER TABLE "consumption" DROP CONSTRAINT "FK_4407b6b95fbca4564650c25241c"`);
        await queryRunner.query(`ALTER TABLE "resources" DROP CONSTRAINT "FK_697429a5b1fe1c12917691a5ab4"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "consumption"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "emisions"`);
        await queryRunner.query(`DROP TABLE "resources"`);
        await queryRunner.query(`DROP TABLE "units"`);
        await queryRunner.query(`DROP TABLE "frecuencies"`);
    }

}
