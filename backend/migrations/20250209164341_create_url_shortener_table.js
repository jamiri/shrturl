/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('url_shortener', function(table) {
    table.increments('id').primary();
    table.string('original_url').notNullable().unique();
    table.string('short_url').notNullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('url_shortener');
};