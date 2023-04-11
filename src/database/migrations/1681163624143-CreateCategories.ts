import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCategories1681163624143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('categories');
        if (!tableExists) {
            await queryRunner.createTable(
                new Table(
                    {
                        name: "categories",
                        columns: [
                            {
                                name: "id",
                                type: "uuid",
                                isPrimary: true
                            },
                            {
                                name: "name",
                                type: "varchar",
                            },
                            {
                                name: "description",
                                type: "varchar",
                            },
                            {
                                name: "created_at",
                                type: "timestamp",
                                default: "now()"
                            }
                        ]
                    }
                )
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
    }

}
