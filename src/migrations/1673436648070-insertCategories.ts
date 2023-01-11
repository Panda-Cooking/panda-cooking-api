import { MigrationInterface, QueryRunner } from "typeorm";

export class insertCategories1673436648070 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO categories ("name") VALUES ('bolos'), ('carnes'), ('aves'), ('peixes'), ('sobremesas'), ('massas'), ('saladas'), ('lanches'), ('sopas'), ('bebidas');`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
