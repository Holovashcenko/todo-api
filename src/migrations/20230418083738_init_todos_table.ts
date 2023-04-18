import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("name").notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("todos", function (table) {
    table.increments("id");
    table.string("title").notNullable();
    table.boolean("isComplete").notNullable().defaultTo(false);
    table.boolean("isArchive").notNullable().defaultTo(false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("todos");
  await knex.schema.dropTable("users");
}
